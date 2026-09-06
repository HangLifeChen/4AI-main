"use client";
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
import { Input } from "@/components/ui/input";
import { createResolve } from "../request";
import { useParams } from "next/navigation";
import { addToast } from "@heroui/react";
import { memo, useState } from "react";
import { isValidCustomUrl } from "@/utils";

const formSchema = z.object({
  repositoryUrl: z.string({
    required_error: "repositoryUrl is required",
  }).min(1, 'repositoryUrl cannot be empty')
});

const ResolveDialog = memo(({ requestMethod, isOpen, setIsOpen }: { requestMethod: () => void, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {

  const { id } = useParams()
  // const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repositoryUrl: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const isValid = isValidCustomUrl(values.repositoryUrl)
    if (!isValid) {
      addToast({ title: "Illegal URL" });
      return;
    }
    const splitUrl = values.repositoryUrl.split('/')
    const res = await createResolve({
      request_id: Number(id),
      repo_id: Number(splitUrl[splitUrl.length - 1])
    })
    if (res.code == 0) {
      addToast({ title: "resolve request successfully", color: "success" });
      requestMethod();
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="!w-[590px] max-w-[590px] !gap-6 !py-10 !px-[50px] bg-[linear-gradient(90deg,#212329_0%,#0E0F12_100%)] !rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-[var(--common-white-six)] font-normal">Paste the agent repository URL to solve the request.</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[40px] w-full">
            <FormField
              control={form.control}
              name="repositoryUrl"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Full Name</FormLabel> */}
                  <FormControl>
                    <Input {...field} className="bg-black h-14 !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full h-12 bg-primary rounded-[100px] group overflow-hidden flex justify-center items-center text-black text-sm font-bold cursor-pointer"
              onClick={form.handleSubmit(onSubmit)}
            >
              <div className='duration-300 flex flex-col h-full group-hover:translate-y-[-100%]'>
                <div className='h-full flex-shrink-0 flex items-center '>
                  Solve
                </div>
                <div className='h-full flex-shrink-0 flex items-center'>Solve</div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
);

export default ResolveDialog;