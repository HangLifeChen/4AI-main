import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/blur-dialog"
import { getCommitLogs } from "../../request";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatTimeAgo } from "@/utils";

const CommitDialog = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {

  const { id } = useParams();
  const [commits, setCommits] = useState({
    count: 0,
    list: []
  });

  const getCommits = async () => {
    const res = await getCommitLogs({
      repo_id: Number(id),
      cur_page: 1,
      page_size: 30
    });
    if (res.code == 0) {
      setCommits(res.data)
    }
  }

  useEffect(() => {
    getCommits();
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <div className="cursor-pointer border border-[var(--common-white-two)] px-5 py-[9px] rounded-[70px] text-[15px] flex items-center gap-1">
          <img
            width={20}
            height={20}
            src="/agentHub/clock.svg"
            alt="clock"
          />
          <span className="text-[var(--common-white-six)]">
            History:
          </span>
          <span className="font-medium">
            {commits?.count} commits
          </span>
        </div>
      </DialogTrigger> */}
      <DialogContent className="!w-[578px] max-w-[578px] !gap-[30px] !p-0 !pt-10 bg-[linear-gradient(90deg,#212329_0%,#0E0F12_100%)] !rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl pl-[50px] pb-5 border-b border-[var(--common-white-one)]">{commits?.count} Commits</DialogTitle>
        </DialogHeader>

        <div className="px-[50px] flex flex-col gap-[6px] pb-[30px] max-h-[600px] overflow-y-auto">
          {
            commits?.list?.map((item: any) =>
              <div key={item.created_at} className="w-full rounded-[8px] border border-[var(--common-white-one)] bg-black/30 p-[14px] flex flex-col justify-between">
                <span className="font-medium">{item.commit}</span>
                <span className="text-[15px] text-[var(--common-white-six)]">{formatTimeAgo(item.created_at)}</span>
              </div>)
          }
        </div>
      </DialogContent>
    </Dialog>
  )
};

export default CommitDialog;