"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteRepository, updateRepository } from "../../request";
import { useParams } from "next/navigation";
import { addToast } from "@heroui/react";
import { useUser } from "@/stores";
import { Button } from "@/components/ui/button";
import { useWriteAgentContract } from "@/hooks/useAgentContract";
import RollButton from "@/components/common/button/roll-btn";

const formSchema = z.object({
  owner: z.string(),
  agentName: z.string({
    required_error: "agentName is required",
  }).min(1, 'agentName cannot be empty'),
  description: z.string({
    required_error: "description is required",
  }).min(1, 'description cannot be empty'),
});

const formDeleteSchema = z.object({
  agenFullName: z.string({
    required_error: "input the fullname",
  }).min(1, 'fullname cannot be empty'),
});


const SettingCard = ({ repoName }: { repoName: string }) => {

  const { id } = useParams();
  const { userInfo } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner: userInfo?.name || "",
      agentName: "",
      description: ""
    },
  });
  const { updateAgent, isPending, errorMessage } = useWriteAgentContract();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const res = await updateRepository({
    //   repo_id: Number(id),
    //   name: values.agentName,
    //   description: values.description
    // })
    const { isConfirmed } = await updateAgent(Number(id), values.agentName, values.description);
    if (isConfirmed) {
      addToast({ title: "update agent repository successfully" });
      form.reset();
    } else {
      addToast({ title: "update agent repository failed" });
    }
  }

  const formDelete = useForm<z.infer<typeof formDeleteSchema>>({
    resolver: zodResolver(formDeleteSchema),
    defaultValues: {
      agenFullName: "",
    },
  });

  const deleteAgent = async (values: z.infer<typeof formDeleteSchema>) => {
    const rule = `${userInfo?.name}/${repoName}`
    if (values.agenFullName !== rule) {
      return addToast({ title: "input the correct fullname" });
    }
    const res = await deleteRepository({
      repo_id: Number(id),
    })
    if (res.code == 0) {
      addToast({ title: "delete agent repository successfully", color: "success" });
      formDelete.reset();
    } else {
      addToast({ title: "delete agent repository failed" });
    }
  }

  return (
    <div className="flex flex-col gap-[60px] items-center">
      <div className="w-full p-5 md:w-[930px] md:p-[30px] rounded-2xl bg-[linear-gradient(90deg,#212329_0%,#0E0F12_100%)] flex flex-col gap-[36px] border border-[var(--common-white-one)]">
        <span className="text-[26px] font-bold">Rename this agent</span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[36px] w-full">

            <div className="flex flex-col gap-6 md:flex-row md:gap-10 justify-between items-end">
              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xl !font-normal">Owner</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="Current User" {...field} className="w-full bg-black h-14 !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]" />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <div className="hidden md:block w-[1px] h-12 bg-white rotate-[30deg]"></div>
              <FormField
                control={form.control}
                name="agentName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xl !font-normal">Agent Name</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-xl !font-normal">Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} className="bg-black h-14 !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]" />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            {/* 
            <Button
              type='submit'
              className='group overflow-hidden w-full h-12 bg-primary rounded-[100px] cursor-pointer flex justify-center items-center text-[15px] font-bold text-[#000]'
            >
              <div className='duration-200 h-full group-hover:translate-y-[-100%]'>
                <div className='h-full flex items-center'>Confirm</div>
                <div className='h-full flex items-center'>Confirm</div>
              </div>
            </Button> */}

            <RollButton
              type="submit"
              btnType="default"
              disabled={isPending}
              loading={isPending}
              text='Confirm'
              className='group overflow-hidden w-full h-12 bg-primary rounded-[100px] cursor-pointer flex justify-center items-center text-[15px] font-bold text-[#000]'
            >
            </RollButton>
          </form>
        </Form>
      </div>

      <div className="w-full p-5 md:w-[930px] md:p-[30px] rounded-2xl bg-[linear-gradient(90deg,#212329_0%,#0E0F12_100%)] flex flex-col gap-[36px] border border-[var(--common-white-one)]">
        <div className="flex flex-col gap-[5px]">
          <span className="text-[26px] font-bold">Delete this agent</span>
          <span className="text-[15px] text-[#B2B2B2]">Once you delete a repository, there is no going back. Please be certain.</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-[6px] md:text-xl text-[#B2B2B2]">
            <span>Please type</span>
            <span className="text-white">{userInfo?.name}/{repoName}</span>
            <span>to confirm.</span>
          </div>
          <div className="flex flex-col gap-[26px]">

            <Form {...formDelete}>
              <form onSubmit={formDelete.handleSubmit(deleteAgent)} className="space-y-[36px] w-full">

                <FormField
                  control={formDelete.control}
                  name="agenFullName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {/* <FormLabel className="text-xl !font-normal">Agent Name</FormLabel> */}
                      <FormControl>
                        <Input placeholder={`${userInfo?.name}/${repoName}`} {...field} className="bg-black h-14 !rounded-xl placeholder:text-[rgba(255,255,255,0.40)]" />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />


                <Button
                  type='submit'
                  className='group overflow-hidden w-full h-12 bg-primary rounded-[100px] cursor-pointer flex justify-center items-center text-[15px] font-bold text-[#000]'
                >
                  <div className='duration-200 h-full group-hover:translate-y-[-100%]'>
                    <div className='h-full flex items-center'>I understand, delete this agent</div>
                    <div className='h-full flex items-center'>I understand, delete this agent</div>
                  </div>
                </Button>
              </form>
            </Form>
          </div>
        </div>

      </div>
    </div>
  )
};

export default SettingCard;