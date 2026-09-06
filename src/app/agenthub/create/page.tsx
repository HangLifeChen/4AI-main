"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/blur-dialog"
import { Input } from "@/components/ui/input";
import { addToast } from "@heroui/react";
import { createRepository } from "../request";
import { useRouter } from "next/navigation";
import { useUser } from "@/stores";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { request } from "@/utils";
import { useWriteAgentContract } from "@/hooks/useAgentContract";
import RollButton from "@/components/common/button/roll-btn";
import { useAppKitAccount } from "@reown/appkit/react";

const formSchema = z.object({
  owner: z.string(),
  agentName: z.string({
    required_error: "agentName is required",
  }).min(1, 'agentName cannot be empty'),
  license: z.string(),
  description: z.string({
    required_error: "description is required",
  }).min(1, 'description cannot be empty'),
});

const CreateAgent = () => {

  const router = useRouter();
  const { userInfo, isWalletConnected } = useUser();
  const { address } = useAppKitAccount();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner: userInfo?.name || "",
      agentName: "",
      license: "",
      description: "",
    },
  });
  const { createAgent, isPending } = useWriteAgentContract();

  useEffect(() => {
    form.setValue("owner", userInfo?.name || "");
    isWalletConnected();
  }, [userInfo]);

  const onSubmit = async () => {

    const payload = {
      name: form.getValues("agentName"),
      tag: [0],
      description: form.getValues("description"),
    }
    const res = await createRepository(payload);
    if (res.code == 0) {

      const { id, name, description } = res.data;

      const { isConfirmed } = await createAgent(id, name, description)

      if (isConfirmed) {
        addToast({ title: "Create agent repository successfully", color: "success" });
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
        router.push('/agenthub');
      } else {
        addToast({ title: `Create agent repository failed` });
      }
    }
  }
  return (
    <>
      <div className="w-full pt-[84px] lg:pt-[105px] px-5 lg:px-[156px] pb-[78px] flex flex-col items-center">
        {/* <ToastProvider placement='top-center' toastOffset={60} /> */}
        <div className="flex flex-col items-center gap-[10px] lg:gap-8 pt-10px lg:pt-[100px] pb-[30px] lg:pb-[60px]">
          <span className="text-xl lg:text-[46px] font-bold letter-spacing-[0.46px]">Create a new agent repository</span>

          <div className="felx justify-center">
            <p className="text-center text-[13px] lg:text-[19px] text-[var(--common-white-eight)] letter-spacing-[0.19px]">A repository contains all agent files, including the revision history.</p>
          </div>
        </div>

        <div className="w-full lg:w-[900px] py-6 px-4 lg:py-10 lg:px-[50px] border border-b border-[var(--common-white-one)] rounded-3xl bg-[linear-gradient(90deg,#212329_0%,#0E0F12_100%)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[18px] lg:space-y-[30px] w-full">

              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-10 lg:items-end">
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm lg:text-xl">Owner</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Current User" {...field} className="w-full bg-black h-11 lg:h-14 !rounded-xl placeholder:text-[13px] lg:placeholder:text-base placeholder:text-[rgba(255,255,255,0.40)]" />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <div className="hidden lg:block w-[1px] h-12 bg-white rotate-[30deg]"></div>
                <FormField
                  control={form.control}
                  name="agentName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm lg:text-xl">Agent Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Agent Name" {...field} className="bg-black h-11 lg:h-14 !rounded-xl placeholder:text-[13px] lg:placeholder:text-base placeholder:text-[rgba(255,255,255,0.40)]" />
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
                    <FormLabel className="text-sm lg:text-xl">License(optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="License" {...field} className="bg-black h-11 lg:h-14 !rounded-xl placeholder:text-[13px] lg:placeholder:text-base placeholder:text-[rgba(255,255,255,0.40)]" />
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
                    <FormLabel className="text-sm lg:text-xl">Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} className="bg-black h-11 lg:h-14 !rounded-xl placeholder:text-[13px] lg:placeholder:text-base placeholder:text-[rgba(255,255,255,0.40)]" />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-[30px] lg:gap-10 !mt-[20px]">
                <div className="w-full text-[12px] lg:text-base h-14 px-5 flex items-center rounded-xl bg-[linear-gradient(90deg,#589D6B_0%,#679393_100%)]">
                  <div className="flex items-start lg:items-center  gap-[10px]">
                    <img
                      className="size-[13px] lg:size-[22px] mt-[2px] lg:mt-0"
                      src="/agentHub/light.svg"
                      alt="light"
                    />
                    <span className="text-[12px] lg:text-[15px]">Once your Agent is created, you can upload your files using the web interface.</span>
                  </div>
                </div>

                <RollButton
                  type="submit"
                  btnType="default"
                  disabled={isPending}
                  loading={isPending}
                  text='Create'
                  className='group overflow-hidden w-full h-12 bg-primary rounded-[100px] cursor-pointer flex justify-center items-center text-[15px] font-bold text-[#000]'
                >
                </RollButton>

              </div>
            </form>
          </Form>
        </div>
      </div>
    </>

  )
};

export default CreateAgent;