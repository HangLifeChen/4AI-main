import { cn } from "@/utils";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string,
  className?: string,
  isDisabled?: boolean
}
const SimpleBtn = ({ isDisabled = false, text, className, onClick, ...rest }: IProps) => {
  return (
    <div
      onClick={!isDisabled ? onClick : undefined}
      {...rest}
      className={
        cn(
          'group/btn overflow-hidden w-full h-[49px] bg-[rgba(255,255,255,0.06)] rounded-[100px] cursor-pointer flex justify-center items-center text-[13px] font-bold text-[#fff]',
          className,
          isDisabled && 'bg-transparent text-[rgba(255,255,255,0.40)] cursor-not-allowed border border-[rgba(255,255,255,0.08)]'
        )
      }
    >
      <div className={
        cn(
          'duration-200 h-full',
          !isDisabled && 'group-hover/btn:translate-y-[-100%]'
        )
      }>
        <div className='h-full flex items-center'>{text}</div>
        <div className='h-full flex items-center'>{text}</div>
      </div>
    </div>
  )
};

export default SimpleBtn;