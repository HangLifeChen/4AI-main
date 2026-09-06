import { cn } from "@/utils";
import LoadingSpinner from "@/components/ui/btn-loading";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string,
  text: string,
  loading?: boolean,
  theme?: "primary" | "dark",
  btnType: "default" | 'ghost',
  disabled?: boolean
}

const RollButton = ({ className, text, loading = false, theme = "primary", btnType = 'default', disabled = false, ...rest }: IProps) => {
  return (
    <button
      disabled={disabled}
      {...rest}
      className={
        cn(
          'bg-primary w-[144px] rounded-[100px] h-[38px] font-bold lg:text-sm text-[12px] text-black overflow-hidden',
          className,
          btnType == 'ghost' && "bg-[rgba(255,255,255,0.10)] text-white border border-[rgba(255,255,255,0.1)]",
          !disabled && btnType === 'ghost' && "hover:bg-[rgba(39,230,255,0.15)] hover:border-[rgba(39,230,255,0.60)] hover:text-primary",
          disabled && "bg-[rgba(255,255,255,0.10)] text-[var(--common-white-four)] border border-[rgba(255,255,255,0.1)] cursor-not-allowed"
        )
      }
    >
      <div
        className={cn(
          "duration-300 h-full",
          !disabled && "hover:translate-y-[-100%] cursor-pointer"
        )}>
        <div className='h-full flex items-center justify-center gap-[6px]'>
          {text}
          <LoadingSpinner loading={loading} theme={theme} />
        </div>
        <div className='h-full flex items-center justify-center gap-[6px]'>
          {text}
          <LoadingSpinner loading={loading} theme={theme} />
        </div>
      </div>
    </button>
  )
};

export default RollButton;