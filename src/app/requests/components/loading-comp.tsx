import { Skeleton } from "@/components/ui/skeleton";

const LoadingComp = () => {
  return (
    <div className="w-full flex flex-col gap-3 px-4 py-[14px] justify-center border-b border-[var(--common-white-one)]">

      <Skeleton className="w-3/5 h-6 bg-[var(--common-white-two)]" />

      <div className="flex justify-between">

        <div className="flex items-center gap-2">
          <Skeleton className="size-5 bg-[var(--common-white-two)]" />
          <Skeleton className="w-[80px] h-5 bg-[var(--common-white-two)]" />
        </div>

        <Skeleton className="w-[116px] h-[21px] bg-[var(--common-white-two)]" />
      </div>

    </div>
  )
};

export default LoadingComp;