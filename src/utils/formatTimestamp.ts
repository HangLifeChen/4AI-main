
export const formatTimestampToShortDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}
export function formatNumber(value: number | string): string {
   if (value === null || value === undefined || value === "") return "";
  const raw = value.toString().replace(/\D/g, "");
  if (!raw) return "";
  return Number(raw).toLocaleString("en-US");
}
export const removeThousandSeparator = (value: string): string => {
  return value.replace(/,/g, "");
};

export function formatWithW(num: number,  digits: number = 2): string {
   if (num === null || num === undefined || isNaN(num)) return "0";

  const units = [
    { value: 1e15, symbol: "Q" }, 
    { value: 1e12, symbol: "T" }, 
    { value: 1e9,  symbol: "B" },  
    { value: 1e6,  symbol: "M" },  
    { value: 1e3,  symbol: "K" }, 
  ];

  for (const unit of units) {
    if (num >= unit.value) {
      return (num / unit.value).toFixed(digits).replace(/\.0+$/, "") + unit.symbol;
    }
  }
  return num.toString(); 
}

