import { createConfig, http } from '@wagmi/core'
import { defineChain } from 'viem'
import { bsc, sepolia } from '@wagmi/core/chains'

// Robinhood Chain(L2,官方参数: https://docs.robinhood.com/chain/connecting/)
export const robinhoodChain = defineChain({
  id: 4663,
  name: 'Robinhood Chain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.mainnet.chain.robinhood.com'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://robinhoodchain.blockscout.com' },
  },
})

export const config = createConfig({
  chains: [robinhoodChain, bsc],
  transports: {
    [robinhoodChain.id]: http(),
    [bsc.id]: http('https://bsc.meowrpc.com'),
  },
  // chains: [sepolia],
  // transports: {
  //   [sepolia.id]: http()
  // },
})
