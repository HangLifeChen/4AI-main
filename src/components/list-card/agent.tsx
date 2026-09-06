'use client'
import { useEffect, useState } from "react";
import { PaginationWithBtns } from "@/components/common/pagination";
import AgentCard from "./cards/agent-card";
import { IAgentCard } from "@/types/agent-types";
import { request } from "@/utils";

interface IAgentResponse {
  count: number
  list: IAgentCard[]
}

interface ApiType {
  list: string,
  like: string
  unlike: string,
  detail: string
}

interface IProps {
  api: ApiType
  params?: {
    page_size?: number;
    [propName: string]: any;
  }
  onChange?: (data: IAgentResponse) => void
}

const AgentList = ({ api, params, onChange }: IProps) => {

  const [agentList, setAgentList] = useState<IAgentResponse>({ count: 0, list: [] });
  const fetchData = async (page: number = 1) => {
    const res = await request.post(api.list, {
      ...params,
      cur_page: page,
      page_size: params?.page_size || 15
    });
    if (res.code == 0) {
      setAgentList(res.data)
      onChange?.(res.data)
    }
  }

  const getList = async (page: number = 1) => {
    await fetchData(page);
  }

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {
        agentList.list?.map((item) => <AgentCard key={item.id} api={api} content={item} />)
      }
      <PaginationWithBtns
        totalCount={agentList.count}
        pageChange={getList}
        pageSize={params?.page_size || 15}
      />
    </div>
  )
};

export default AgentList;