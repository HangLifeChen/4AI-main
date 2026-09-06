"use client";

import { useUser } from "@/stores";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { request } from "@/utils";
const TARGET = "https://www.x402scan.com/resources/register";

export default function EmbedPage() {

  const router = useRouter();
  const [retryFlag, setRetryFlag] = useState(true);

  const createAgent = async () => {
    const {
      name, tag, description,
    } = JSON.parse(localStorage.getItem('agentInfo') || '{}');
    const finalInfo = {
      name,
      tag,
      description,
    }
    const { code, data } = await request.post(`/api/front/create/x402/repositories`, finalInfo);
    if (code == 0) {
      addToast({ title: "Create agent repository successfully", color: "success" });
      router.push('/agenthub');
    } else {
      setRetryFlag(true);
      addToast({ title: "Create agent repository failed" });
    }
  }

  const getCreateStatus = async () => {
    const { id } = JSON.parse(localStorage.getItem('agentInfo') || '{}');
    const { data, code } = await request.get(`/api/front/get/x402/result`, { params: { id } });
    if (code == 0 && retryFlag && data.result == true) {
      createAgent();
      setRetryFlag(false);
    }
  }

  useEffect(() => {

    const timer = setInterval(() => {
      getCreateStatus();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pt-[132px] bg-[#fff]">
      <iframe
        className="w-full h-screen"
        src={TARGET}
      ></iframe>
    </div>
  );
}
