"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullName: z.string({
    required_error: "fullName is required",
  }).min(1, 'fullName cannot be empty'),
  message: z.string({
    required_error: "Message is required",
  }).min(1, 'Message cannot be empty'),
});

const FormDialog = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex-1 h-12 bg-primary rounded-[100px] cursor-pointer flex justify-center items-center text-sm font-bold text-[#000]">
          + New Agent
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[linear-gradient(90deg,#212329_0%,#0E0F12_100%)] !rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">Create a new request</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Full Name</FormLabel> */}
                  <FormControl>
                    <Input placeholder="What is this request about in one brief sentence?" {...field} className="bg-black h-14 !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]" />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Init Price Unit</FormLabel> */}
                  <FormControl>
                    <Textarea
                      placeholder="Type here. Drag or paste images."
                      className="resize-none h-[158px] bg-black !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <div className="w-full h-12 bg-primary rounded-[100px] cursor-pointer flex justify-center items-center text-[15px] font-bold text-[#000]">
              Create Request
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
};

export default FormDialog;