import { Dot } from "lucide-react";
import { Img as Avatar } from "@/components/common";
import { IRequestCard } from "@/types/request-types";
import { cn, formatTimeAgo } from "@/utils";
import "./index.css";

interface IProps {
  content: IRequestCard;
  isSelected?: boolean;
  onClick?: () => void;
  ondoubleClick?: () => void;
}
const RequestCard = ({ content, isSelected, onClick, ondoubleClick }: IProps) => {
  return (
    <div className={cn("overflow-hidden rounded-2xl", isSelected && "card-wrapper")}>
      <div
        className={
          cn(
            "relative bg-gradient-to-r from-[#242731] to-[#141618] hover:bg-[#343A46] cursor-pointer flex flex-col gap-[14px] px-5 py-4 w-full rounded-2xl border",
            isSelected && "bg-gradient-to-r from-[#0A5561] to-[#0C2446]",
            isSelected ? "" : "hover-bg-override"
          )
        }
        onClick={onClick}
        onDoubleClick={ondoubleClick}
      >

        <span className="font-bold text-[15px]">{content.title}</span>

        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Avatar
                width={20}
                height={20}
                src={content.user_photo}
                alt="avatar"
                className="rounded-full overflow-hidden"
              />
              <span className="text-[13px] text-[var(--common-white-four)]">{content.username}</span>
            </div>

            <Dot className="text-[var(--common-white-four)] w-5 h-[17px]" />
            <span className="text-[13px] text-[var(--common-white-four)]">{formatTimeAgo(content.created_at)}</span>
          </div>

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
      </div>
    </div>

  )
};

export default RequestCard;