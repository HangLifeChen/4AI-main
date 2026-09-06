import Link from "next/link";
import { Img as Avatar } from "@/components/common";
import { memo } from "react";
import { IRequestCard } from "@/types/request-types";
import { Skeleton } from "@/components/ui/skeleton";


interface IProps {
  content: IRequestCard,
}
const Card = memo(
  ({ content }: IProps) => {

    return (
      <div className="hover:bg-[#343A46] group w-full flex flex-col gap-3 px-4 py-[14px] justify-center border-b border-[var(--common-white-one)]">
        {
          content ? <>

            <Link href={`/requests/${content.id}`}>
              <span className="font-bold text-[15px] group-hover:text-primary">{content.title}</span>
            </Link>
            <div className="flex justify-between">

              <Link href={`/profile/${content.create_by}`}>
                <div className="flex items-center gap-2">
                  <Avatar
                    width={20}
                    height={20}
                    src={content.user_photo}
                    alt="avatar"
                    className="rounded-full overflow-hidden"
                  />
                  <span className="text-[13px] text-[var(--common-white-four)]">{content.username.slice(0, 8)}</span>
                </div>
              </Link>

              <div className="flex items-center gap-[14px]">
                <div className="flex items-center gap-1">
                  <img
                    width={16}
                    height={16}
                    src="/requestsPage/comment-card.svg"
                    alt="comment"
                  />
                  <span className="text-[13px] pt-[2px] text-[var(--common-white-four)]">{content.comment_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    width={16}
                    height={16}
                    src="/requestsPage/star-card.svg"
                    alt="star"
                  />
                  <span className="text-[13px] pt-[2px] text-[var(--common-white-four)]">{content.likes_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    width={16}
                    height={16}
                    src="/requestsPage/bot-card.svg"
                    alt="bot"
                  />
                  <span className="text-[13px] pt-[2px] text-[var(--common-white-four)]">{content.resolve_count}</span>
                </div>
              </div>
            </div>
          </>
            : <>
              <Skeleton className="w-3/5 h-6 bg-[var(--common-white-two)]" />

              <div className="flex justify-between">

                <div className="flex items-center gap-2">
                  <Skeleton className="size-5 bg-[var(--common-white-two)]" />
                  <Skeleton className="w-[80px] h-5 bg-[var(--common-white-two)]" />
                </div>

                <Skeleton className="w-[116px] h-[21px] bg-[var(--common-white-two)]" />
              </div>
            </>
        }


      </div>
    )
  }
)

export default Card;