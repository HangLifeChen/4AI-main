"use client";
import { useEffect, useRef } from 'react'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/blur-dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RichTextEditor, type RichTextEditorRef } from '@/components/common'
import { Input } from "@/components/ui/input";
import { createRequest } from '../request';
import { addToast } from '@heroui/react';
import { Button } from '@/components/ui/button';
import { request } from '@/utils';
import { useWriteAgentContract } from '@/hooks/useAgentContract';
import RollButton from '@/components/common/button/roll-btn';
import { Textarea } from '@/components/ui/textarea';
import { isMobile } from "@/utils";
import { useAppKitAccount } from '@reown/appkit/react';
import { useUser } from '@/stores';

const formSchema = z.object({
  title: z.string({
    required_error: "title is required",
  }).min(1, 'title cannot be empty').max(100, "title max length is 100"),
  content: z.string().optional(),
});

interface IProps {
  getNewList: (flag?: boolean) => Promise<void>,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
}

const FormDialog = ({ getNewList, isOpen, setIsOpen }: IProps) => {
  // const [isOpen, setIsOpen] = useState(false);
  const richTextEditorRef = useRef<RichTextEditorRef>(null)
  const { address } = useAppKitAccount();
  const { isWalletConnected } = useUser();

  const { createRequest: createOnchainRequest, isPending, errorMessage } = useWriteAgentContract();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const requestContent = await richTextEditorRef.current?.getEditorValue()
    const finalContent = isMobile() ? values.content : requestContent

    const res = await createRequest({
      title: values.title,
      content: finalContent,
      is_mobile: isMobile()
    })
    if (res.code == 0) {
      const { id, title } = res.data;
      const { isConfirmed } = await createOnchainRequest(id, title);
      if (isConfirmed) {
        addToast({ title: "Create request successfully", color: "success" });
        // const { code, data } = await request.get('/api/front/get/finaltest/verify_daily_task', {
        //   params: {
        //     address
        //   }
        // })
        // if (code == 0 && data.is_finish) {
        //   addToast({ title: data.message, color: "success" });
        // } else if (code !== 0) {
        //   addToast({ title: 'The quest failed. Please try again.', color: "success" });
        // }
        getNewList?.(true);
        setIsOpen(false);
      } else {
        addToast({ title: "create request failed" });
      }
    }
  }

  useEffect(() => {
    isWalletConnected();
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col w-[342px] lg:min-w-[960px] gap-[15px] lg:gap-6 px-3 py-6 lg:py-10 lg:px-[50px] bg-[linear-gradient(90deg,#212329_0%,#0E0F12_100%)] !rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-[17px] lg:text-xl font-bold">Create a new request</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[15px] lg:space-y-6 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Full Name</FormLabel> */}
                  <FormControl>
                    <Input placeholder="What is this request about in one brief sentence?" {...field} className="bg-black h-11 lg:h-14 !rounded-xl placeholder:text-[13px] lg:placeholder:text-base placeholder:text-[rgba(255,255,255,0.40)]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='hidden lg:block'>
              <RichTextEditor ref={richTextEditorRef} />
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder='Type here' {...field} className='block lg:hidden h-[175px] bg-black !rounded-xl placeholder:text-[rgba(255,255,255,0.40)] placeholder:text-[13px] lg:placeholder:text-base' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <RollButton
              type="submit"
              btnType="default"
              disabled={isPending}
              loading={isPending}
              text='Create Request'
              className='group overflow-hidden w-full h-12 bg-primary rounded-[100px] cursor-pointer flex justify-center items-center text-[15px] font-bold text-[#000]'
            >
            </RollButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
};

export default FormDialog;