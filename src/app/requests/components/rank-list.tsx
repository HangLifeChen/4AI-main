import RequestCard from "@/components/list-card/cards/request-card";
import { PaginationWithBtns } from "@/components/common/pagination";
import { IRequestCard, IRquestDetail } from "@/types/request-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { RichTextView } from "@/components/common";
import Link from "next/link";
import "./index.css"
import { useRouter } from "next/navigation";
import { getRankList, getRequestDetail } from "../request";
import { cn } from "@/utils";

interface IRequestResponse {
  count: number
  list: IRequestCard[]
}
const RankList = ({ selectFilter }: { selectFilter: string }) => {

  const router = useRouter();
  const [requestList, setRequestList] = useState<IRequestResponse>({ count: 0, list: [] });
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedRequestId, setSelectedRequestId] = useState(0);
  const [dispalyRequest, setDispalyRequest] = useState<IRquestDetail>()

  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getDetail = async (id: number) => {
    const res = await getRequestDetail({ request_id: id });
    if (res.code == 0) {
      setDispalyRequest(res.data)
    }
  }

  const autoSelect = useCallback(async (id: number, index: number) => {

    setSelectedIdx(index);
    setSelectedRequestId(id);

    if (selectedIdx == index) {
      router.push(`/requests/${id}`)
      return
    }
  }, [selectedIdx]);

  const fetchData = async (page: number = 1) => {
    const res = await getRankList({
      cur_page: page,
      page_size: 15,
      order_by: selectFilter
    });
    if (res.code == 0) {
      setRequestList(res.data)
      if (res.data.list && res.data.list.length > 0) {
        setSelectedRequestId(res.data.list[0].id)
      }
    }
  }

  const getList = async (page: number = 1) => {
    await fetchData(page);
  }

  const handleScroll = () => {
    if (!containerRef.current) return;

    const containerTop = containerRef.current.getBoundingClientRect().top;

    if (containerTop <= 40) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    getList();
  }, [selectFilter]);

  useEffect(() => {
    if (!selectedRequestId) return
    getDetail(selectedRequestId);
  }, [selectedRequestId])

  return (
    <div ref={containerRef} className="w-full flex gap-0 lg:gap-5">

      <div className="flex flex-col gap-4 lg:gap-5 w-full">
        {
          requestList?.list?.map((item, index) => <RequestCard
            key={item.id}
            content={item}
            isSelected={index === selectedIdx}
            onClick={() => autoSelect(item.id, index)}
            ondoubleClick={() => router.push(`/requests/${item.id}`)}
            isRankList={true}
          />)
        }
        <PaginationWithBtns
          totalCount={requestList.count}
          pageChange={getList}
          pageSize={15}
        />
      </div>

      <div className="flex flex-col">
        <div
          className={
            cn(
              "w-[404px] flex-shrink-0 hidden md:block",
              isSticky && 'fixed top-10 right-[130px]'
            )
          }
        >
          <Link href={`/requests/${selectedRequestId}`}>
            <div className="card-wrapper overflow-hidden rounded-2xl">
              <div className="relative shadow-box rounded-2xl bg-[linear-gradient(91deg,#825D00_0%,#643800_100%)] w-full p-5 flex flex-col gap-5">

                {
                  dispalyRequest?.is_mobile ?
                    <div className="w-full">
                      {dispalyRequest?.content}
                    </div>
                    :
                    <div className="editor-class">
                      <RichTextView className="bg-transparent" value={dispalyRequest?.content} />
                    </div>
                }

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
        </div>
        <div className="w-[404px] flex-shrink-0 hidden md:block"></div>
      </div>

    </div>
  )
};

export default RankList;