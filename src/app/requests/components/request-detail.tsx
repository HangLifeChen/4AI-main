import { use, useEffect, useState } from "react";
import { getRequestDetail } from "../request";
import { IRquestDetail } from "@/types/request-types";
import Link from "next/link";
import { RichTextView } from "@/components/common";
import "./index.css"
const RequestDetail = ({ id }: { id: number }) => {
  const [dispalyRequest, setDispalyRequest] = useState<IRquestDetail>()
  const getDetail = async (id: number) => {
    const res = await getRequestDetail({ request_id: id });
    if (res.code == 0) {
      setDispalyRequest(res.data)
    }
  }

  useEffect(() => {
    if (id) {
      getDetail(id)
    }
  }, [id])
  return (
    <Link href={`/requests/${id}`}>
      <div className="card-wrapper overflow-hidden rounded-2xl">
        <div className="relative shadow-box rounded-2xl bg-[linear-gradient(91deg,#0A5561_0%,#0C2446_100%)] w-full p-5 flex flex-col gap-5">


          <div className="editor-class">
            <RichTextView className="bg-transparent" value={dispalyRequest?.content} />
          </div>

          <div className="flex gap-3">
            <div className="flex items-center rounded-[15px] h-[30px] px-3 bg-[var(--common-white-one)] gap-[6px]">
              <img
                width={16}
                height={16}
                src="/requestsPage/comment-blue.svg"
                alt="comment"
              />

              <span className="text-sm pt-[2px] text-primary">{dispalyRequest?.comment_count}</span>
            </div>
            <div className="flex items-center rounded-[15px] h-[30px] px-3 bg-[var(--common-white-one)] gap-[6px]">
              <img
                width={16}
                height={16}
                src="/requestsPage/star-blue.svg"
                alt="star"
              />
              <span className="text-sm pt-[2px] text-primary">{dispalyRequest?.likes_count}</span>
            </div>
            <div className="flex items-center rounded-[15px] h-[30px] px-3 bg-[var(--common-white-one)] gap-[6px]">
              <img
                width={16}
                height={16}
                src="/requestsPage/bot-blue.svg"
                alt="bot"
              />
              <span className="text-sm pt-[2px] text-primary">{dispalyRequest?.resolve_count}</span>
            </div>
          </div>

        </div>
      </div>

    </Link>
  )
};

export default RequestDetail;