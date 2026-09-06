"use client";
import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationWithLinksProps {
  totalCount: number;
  pageSize?: number;
  page?: number;
  pageChange: (page: number) => void;
}

export interface PaginationWithLinksRef {
  resetPage: () => void;
}

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationBtn>) => (
  <PaginationBtn
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </PaginationBtn>
);

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationBtn>) => (
  <PaginationBtn
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </PaginationBtn>
);

type PaginationBtnProps = {
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"div">;

const PaginationBtn = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationBtnProps) => (
  <div
    className={cn(
      "cursor-pointer",
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  ></div>
);

export const PaginationWithBtns = React.forwardRef<
  PaginationWithLinksRef,
  PaginationWithLinksProps
>(({ pageSize = 10, totalCount, page = 1, pageChange }, ref) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const [curPage, setCurPage] = React.useState(page);

  React.useImperativeHandle(ref, () => ({
    resetPage: () => {
      setCurPage(1);
      // pageChange(1);
    },
  }));

  const renderPageNumbers = () => {
    const items: React.ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationBtn
              isActive={curPage === i}
              onClick={() => {
                setCurPage(i);
                pageChange(i);
              }}
            >
              {i}
            </PaginationBtn>
          </PaginationItem>
        );
      }
    } else {
      // 首页
      items.push(
        <PaginationItem key={1}>
          <PaginationBtn
            isActive={curPage === 1}
            onClick={() => {
              setCurPage(1);
              pageChange(1);
            }}
          >
            1
          </PaginationBtn>
        </PaginationItem>
      );

      if (curPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, curPage - 1);
      const end = Math.min(totalPageCount - 1, curPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationBtn
              isActive={curPage === i}
              onClick={() => {
                setCurPage(i);
                pageChange(i);
              }}
            >
              {i}
            </PaginationBtn>
          </PaginationItem>
        );
      }

      if (curPage < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationBtn
            isActive={curPage === totalPageCount}
            onClick={() => {
              setCurPage(totalPageCount);
              pageChange(totalPageCount);
            }}
          >
            {totalPageCount}
          </PaginationBtn>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center gap-3 w-full",
        totalCount < pageSize && "hidden"
      )}
    >
      <Pagination className="justify-center">
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={curPage === 1}
              onClick={() => {
                if (curPage > 1) {
                  setCurPage(curPage - 1);
                  pageChange(curPage - 1);
                }
              }}
              className={curPage === 1 ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              aria-disabled={curPage === totalPageCount}
              onClick={() => {
                if (curPage < totalPageCount) {
                  setCurPage(curPage + 1);
                  pageChange(curPage + 1);
                }
              }}
              className={
                curPage === totalPageCount
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
});
PaginationWithBtns.displayName = "PaginationWithBtns";
