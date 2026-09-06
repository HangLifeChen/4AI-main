import { cn } from "@/utils"

const getType = {
  agent: "bg-[url(/agentHub/agent-bg-full.png)]",
  download: "bg-[url(/agentHub/download-bg-full.png)]",
  trending: "bg-[url(/agentHub/trending-bg-full.png)]"
}

interface IProps {
  type: keyof typeof getType,
  children: React.ReactNode
}

const TopTitle = ({ type, children }: IProps) => {


  const bgImg = getType[type]

  return (
    <div
      className={cn("realative w-full h-[72px] no-repeat bg-cover rounded-t-2xl pt-[14px] pl-4", bgImg)}>
      {/* <span className='text-lg font-bold text-nowrap'>{title}</span> */}
      {children}
    </div>
  )
}
export default TopTitle