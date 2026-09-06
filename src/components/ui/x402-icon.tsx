import { cn } from "@/utils";

const X402Icon = ({ className }: { className?: string }) => {
  return (
    <div
      className={
        cn(
          "border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.12)] rounded-[15px] text-[#fff] text-[12px] py-[2px] px-[7px]",
          className
        )
      }
    >
      x402
    </div>
  )
};

export default X402Icon;