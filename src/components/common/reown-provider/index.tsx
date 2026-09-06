"use client"

import { createAppKit } from '@reown/appkit/react'

import { http, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bsc, sepolia } from '@reown/appkit/networks'
import { wallectConnectId } from '@/utils'
import { robinhoodChain } from './wagmi-config'

const queryClient = new QueryClient()

const projectId = wallectConnectId


export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks: [robinhoodChain, bsc],
  transports: {
    [robinhoodChain.id]: http(),
    [bsc.id]: http('https://bsc.meowrpc.com')
  }
  // networks: [sepolia],
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: [robinhoodChain, bsc],
  defaultNetwork: robinhoodChain,
  // networks: [sepolia],
  projectId,
  features: {
    email: false,
    socials: [],
    emailShowWallets: false
  },
  metadata: {
    name: '4AI',
    description: '4AI',
    url: 'https://4ai.network',
    icons: ['https://fav.farm/🦄']
  },
})

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}