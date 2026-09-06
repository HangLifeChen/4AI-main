
const TopTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-[60px] bg-[var(--common-white-one)] rounded-[100px] px-9 flex justify-between items-center border border-solid border-[#3F3F3F]">
      <img
        width={66}
        height={17}
        src="/requestsPage/star-left.svg"
        alt="star"
      />
      <span className='text-lg font-bold text-nowrap'>{title}</span>
      <img
        width={66}
        height={17}
        src="/requestsPage/star-right.svg"
        alt="star"
      />
    </div>
  )
}
export default TopTitle