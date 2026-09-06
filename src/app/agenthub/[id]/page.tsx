"use client"
import Menu from "./components/tab";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link";

import AgentInfo from "./components/agent-info";
import FilesCard from "./components/files-card";
import CommunityCard from "./components/community-card";
import Settings from "./components/setting-card";
import { getAgentDetail, likeRepository, unlikeRepository } from "../request";
import { addToast } from "@heroui/react";
import { useUser } from "@/stores";
import { Img as Avatar } from "@/components/common/img";
import X402Icon from "@/components/ui/x402-icon";

const AgentDetail = () => {

  const { id } = useParams();
  const { userInfo, authLoginStatus } = useUser();
  const router = useRouter();
  const [agentDetail, setAgentDetail] = useState<any>({});

  const getDetails = async () => {
    const res = await getAgentDetail({ repo_id: Number(id) });
    if (res.code == 0) {
      setAgentDetail(res.data)
    }
  }

  const copyMethod = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      addToast({ title: "Copy link successfully", color: 'success' });
    } catch (err: unknown) {
      console.error('copy error:', err instanceof Error ? err.message : err);
    }

  }

  const likeAgent = async (id: number, flag: boolean) => {
    const loginStatus = authLoginStatus();
    if (loginStatus) {
      const requestMethod = flag ? unlikeRepository : likeRepository
      const res = await requestMethod({
        repo_id: id
      });
      if (res.code == 0) {
        getDetails();
      } else {
        addToast({ title: `${flag ? "Unstar" : "Star"} agent failed` });
      }
    } else {
      // router.push("/login")
      addToast({ title: `Connect your wallet to proceed.`, color: 'warning' });
    }

  }

  useEffect(() => {
    getDetails()
  }, [])

  const [activeTab, setActiveTab] = useState('agent');
  const menuItems = [
    { key: 'agent', label: 'Agent Card' },
    { key: 'files', label: 'Files And Versions' },
    { key: 'community', label: 'Community' },
    ...(userInfo?.uid && agentDetail?.create_by && userInfo.uid == agentDetail.create_by
      ? [{ key: 'settings', label: 'Settings' }]
      : [])
  ];

  const componentsMap = {
    agent: <AgentInfo agentDetail={agentDetail} />,
    files: <FilesCard agentInfo={agentDetail} flag={agentDetail?.create_by === userInfo?.uid} />,
    community: <CommunityCard />,
    settings: <Settings repoName={agentDetail.name} />,
  };

  return (
    <div className="flex flex-col gap-[50px] pt-[165px] relative min-h-screen">
      <div className="hidden md:block z-[1] absolute top-[116px] left-0 px-[130px] h-[500px] w-full">
        <div className="w-full h-full bg-[url(/agentHub/background-4ai.png)] bg-contain bg-no-repeat bg-right"></div>
      </div>
      <div
        className="z-10 px-5 md:px-[130px] py-[19px] flex gap-3 items-center border border-solid border-x-transparent border-y-[var(--common-white-two)]"
        onClick={() => router.back()}
      >
        <img
          width={20}
          height={20}
          src="/requestsPage/back.svg"
          alt="back"
        />
        {/* <Link href="/agenthub"> */}
        <span className="text-[17px] text-[var(--common-white-six)] cursor-pointer">Back</span>
        {/* </Link> */}
      </div>
      <div className="z-10 px-5 md:px-[130px] flex flex-col gap-[60px]">
        <div className="md:px-10 flex flex-col gap-5">
          <div className="flex items-center">
            <Link href={`/profile/${agentDetail?.create_by}`}>
              <Avatar
                width={50}
                height={50}
                src={agentDetail.user_photo}
                alt="user"
                className="rounded-full overflow-hidden flex-shrink-0 size-6 md:size-[50px]"
              />
            </Link>

            <div className="flex ml-[14px] md:text-[32px] font-medium mr-2">
              <div className="flex">
                <Link href={`/profile/${agentDetail?.create_by}`}>
                  <span className="text-[var(--common-white-six)] max-w-[500px] text-ellipsis overflow-hidden text-nowrap">{agentDetail?.username}</span>
                </Link>
                <i className="text-[var(--common-white-six)] mx-2">/</i>
              </div>
              <span className="text-nowrap">{agentDetail?.name}</span>
            </div>
            <img
              width={20}
              height={20}
              src="/agentHub/copy.svg"
              alt="copy"
              className="cursor-pointer"
              onClick={copyMethod}
            />
            <div className="cursor-pointer flex gap-2 ml-5 px-3 py-[5px] rounded-[60px] bg-[rgba(255,255,255,0.14)]" onClick={() => likeAgent(agentDetail.id, agentDetail.is_like)}>
              <img
                width={18}
                height={18}
                src={`/agentHub/${agentDetail.is_like ? "star-active" : "star-default"}.svg`}
                alt="star"
              />
              <span className="text-[var(--common-white-seven)] pt-[2px]">{agentDetail?.likes_count}</span>
            </div>

            {
              agentDetail.is402 && <X402Icon className="ml-5 px-3 py-[5px] rounded-[60px] rgba(255,255,255,0.14) border-none text-[rgba(255,255,255,0.70)] text-[16px]" />
            }
          </div>
          <div className="flex flex-wrap gap-[9px]">
            {
              (agentDetail?.tags ?? []).map(item => <span key={item.id} className="px-3 py-[5px] rounded-[15px] text-sm bg-[rgba(255,255,255,0.07)] border border-solid border-[rgba(255,255,255,0.15)]">{item.name}</span>)
            }
          </div>
        </div>

        <div className="">
          <div className="w-full md:pl-10">
            <Menu
              items={menuItems}
              activeKey={activeTab}
              onChange={setActiveTab}
            />
          </div>
          <div className="px-3 md:px-10 py-10 border border-[var(--common-white-two)] rounded-3xl bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {componentsMap[activeTab as keyof typeof componentsMap]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AgentDetail;