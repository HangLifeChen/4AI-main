"use client"

import { Area, AreaChart } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FileManage } from '@/utils';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from 'react-markdown';
import "github-markdown-css"
import "./markdown.scss"

import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
import { getChartData } from "../../request";
import { useEffect, useState } from "react";

type ResponseType = {
  download: Record<string, number>[],
  download_count: number,
  user_count: number,
  user: Record<string, number>[],
}


const chartConfig = {
  download: {
    label: "download",
    color: "#FCBC19",
  },
} satisfies ChartConfig


const AgentInfo = ({ agentDetail }: { agentDetail: any }) => {

  const { id, name, readme_hash, description } = agentDetail

  const [chartData, setChartData] = useState<ResponseType>()
  const [readMe, setReadMe] = useState("")

  const getChart = async () => {
    const res = await getChartData({ repo_id: id });
    if (res.code == 0) {
      setChartData(res.data)
    }
  }
  const getReadme = async () => {
    const res = await FileManage.getFilePath(readme_hash, "aws");
    if (res) {
      const markdown = await fetch(res as string)
      const text = await (await markdown.blob()).text()
      setReadMe(text)
    }
  }

  useEffect(() => {
    if (agentDetail.id) {
      getChart()
    }
  }, [agentDetail.id])

  useEffect(() => {
    if (readme_hash) {
      getReadme()
    }
  }, [readme_hash])

  return (
    <div className="flex gap-[30px]">
      <div className="w-0 flex-1 flex flex-col">
        <div className="h-[50px] border-b border-dashed border-[var(--common-white-two)]">
          <span className="text-2xl font-bold">{name}</span>
        </div>
        <div className="w-full py-[53px] overflow-hidden">
          {
            readme_hash
              ?
              <div id="markdown" className="w-full  markdown-body markdown-custom ">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{readMe}</ReactMarkdown>
              </div>
              : <span>{description}</span>
          }
        </div>
      </div>
      <div className="hidden md:flex w-[480px] flex-col gap-[30px] pt-[50px]">
        <div className="flex items-end gap-16 px-5 pt-5 pb-6 border border-[var(--common-white-one)] bg-[#17181C] rounded-2xl">
          <div className="flex flex-col gap-[23px] justify-between">
            <span className="text-[var(--common-white-seven)]">Downloads last month</span>
            <span className="text-2xl font-medium">{chartData?.download_count}</span>
          </div>
          <div className="flex-1">
            <ChartContainer config={chartConfig} className="max-h-[75px] w-full">
              <AreaChart
                accessibilityLayer
                data={chartData?.download}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />

                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-download)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="90%"
                      stopColor="var(--color-download)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="count"
                  type="linear"
                  fill="url(#fillDesktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-download)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>

        <div className="flex flex-col p-5 gap-4 border border-[var(--common-white-one)] bg-[#17181C] rounded-2xl">
          <div className="flex gap-[10px]">
            <span className="text-[var(--common-white-seven)]">Used by</span>
            <span className="font-medium">{chartData?.user_count}</span>
          </div>
          <div className="flex flex-wrap">
            <AnimatedTooltip items={chartData?.user ?? []} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default AgentInfo;