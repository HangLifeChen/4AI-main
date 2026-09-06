import { createConfig, http } from '@wagmi/core'
import { bsc, sepolia } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http('https://bsc.meowrpc.com'),
  },
  // chains: [sepolia],
  // transports: {
  //   [sepolia.id]: http()
  // },
})