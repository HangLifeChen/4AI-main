const CommonChild = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pb-[30px] border-b border-[var(--common-white-two)] flex flex-col gap-4 last:border-b-transparent">
      {children}
    </div>
  )
};

export default CommonChild;
