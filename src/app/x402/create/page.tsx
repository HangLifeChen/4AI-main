"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useUser } from "@/stores";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { request } from "@/utils";

const formSchema = z.object({
  owner: z.string(),
  agentName: z.string({
    required_error: "agentName is required",
  }).min(1, 'agentName cannot be empty'),
  license: z.string(),
  description: z.string(),
  linkStr: z.string(),
});

const CreateAgent = () => {

  const router = useRouter();
  const { userInfo } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner: userInfo?.name || "",
      agentName: "",
      license: "",
      description: "",
      linkStr: "",
    },
  });

  useEffect(() => {
    form.setValue("owner", userInfo?.name || "");
  }, [userInfo]);



  const onSubmit = () => {
    navigator.clipboard.writeText(form.getValues("linkStr"));
    router.push('/agenthub/x402');
  }

  const renderBtn = () => {
    return <div className="flex justify-center items-center gap-2 text-primary">
      <img className="size-[17px]" src="/agentHub/copy-btn.svg" alt="" />
      <span>Copy Resource URL</span>
    </div>
  }

  const x402Call = async () => {

    const isGenerate = form.getValues("linkStr");
    if (!isGenerate) {
      const { data, code } = await request.get(`/api/front/get/x402/url`);
      if (code == 0) {
        // addToast({ title: "Copy link successfully", color: 'success' });
        form.setValue("linkStr", data.url)
        const agentInfo = {
          name: form.getValues("agentName"),
          tag: [0],
          description: form.getValues("description"),
          id: data.id,
        }
        localStorage.setItem('agentInfo', JSON.stringify(agentInfo));
      }
    } else {
      navigator.clipboard.writeText(form.getValues("linkStr"));
      addToast({ title: "Copy link successfully", color: 'success' });
    }

  }

  return (
    <>
      <div className="w-full pt-[105px] px-[156px] pb-[78px] flex flex-col items-center">
        {/* <ToastProvider placement='top-center' toastOffset={60} /> */}
        <div className="flex flex-col items-center gap-8 pt-[100px] pb-[60px]">
          <span className="text-[46px] font-bold letter-spacing-[0.46px]">Create a new agent repository</span>

          <div className="felx justify-center">
            <p className="text-center text-[19px] text-[var(--common-white-eight)] letter-spacing-[0.19px]">A repository contains all agent files, including the revision history.</p>

            <p className="text-center text-[19px] text-[var(--common-white-eight)] letter-spacing-[0.19px]">You can link your agent with x402 for identity registration and future transactions.</p>
          </div>
        </div>

        <div className="w-[900px] py-10 px-[50px] border border-b border-[var(--common-white-one)] rounded-3xl bg-[linear-gradient(90deg,#212329_0%,#0E0F12_100%)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px] w-full">

              <div className="flex justify-between gap-10 items-end">
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xl">Owner</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Current User" {...field} className="w-full bg-black h-14 !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]" />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <div className="w-[1px] h-12 bg-white rotate-[30deg]"></div>
                <FormField
                  control={form.control}
                  name="agentName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xl">Agent Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Agent Name" {...field} className="bg-black h-14 !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]" />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="license"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">License(optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="License" {...field} className="bg-black h-14 !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]" />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Description(optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} className="bg-black h-14 !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]" />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkStr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Create with x402 (optional)</FormLabel>

                    <div className="flex gap-4">
                      <FormControl>
                        <Input disabled placeholder="Link" {...field} className="bg-black h-14 !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]" />
                      </FormControl>
                      <Button
                        onClick={(e) => { e.preventDefault(); x402Call() }}
                        className='group overflow-hidden min-w-[190px] h-[49px] border border-[rgba(255,255,255,0.40)] bg-transparent rounded-[100px] cursor-pointer flex justify-center items-center text-[15px] font-bold text-[#fff]'
                      >
                        <div className='duration-200 h-full group-hover:translate-y-[-100%]'>
                          <div className='h-full flex items-center'>{form.getValues("linkStr") ? renderBtn() : 'Get Resource URL'}</div>
                          <div className='h-full flex items-center'>{form.getValues("linkStr") ? renderBtn() : 'Get Resource URL'}</div>
                        </div>
                      </Button>
                    </div>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-10 !mt-[20px]">
                <div className="w-full h-14 px-5 flex items-center gap-[10px] rounded-xl bg-[linear-gradient(90deg,#589D6B_0%,#679393_100%)]">
                  <img
                    width={22}
                    height={22}
                    src="/agentHub/light.svg"
                    alt="light"

                  />
                  <span className="text-[15px]">Once your Agent is created, you can upload your files using the web interface.</span>
                </div>

                <Button
                  type='submit'
                  className='group overflow-hidden w-full h-12 bg-primary rounded-[100px] cursor-pointer flex justify-center items-center text-[15px] font-bold text-[#000]'
                >
                  <div className='duration-200 h-full group-hover:translate-y-[-100%]'>
                    <div className='h-full flex items-center'>Create</div>
                    <div className='h-full flex items-center'>Create</div>
                  </div>
                </Button>

              </div>
            </form>
          </Form>
        </div>
      </div>
    </>

  )
};

export default CreateAgent;