import { anvil, sepolia, bsc } from "wagmi/chains";

export const ContractAddresses: Record<
  string,
  Record<number, `0x${string}` | "">
> = {
  agent: {
    [anvil.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    [sepolia.id]: "0x546736c4dAc5b59e7b4f686C70413E94Fcac1E5e",
    // add more chains
    [bsc.id]: "0x0d7d4e2a99bc9e8aC58D00Ca25A0EF9da97644bA",
    // Robinhood Chain (4663):合约部署后填入地址,否则该链上合约功能不可用
    // [4663]: "0x...",
  },

} as const;