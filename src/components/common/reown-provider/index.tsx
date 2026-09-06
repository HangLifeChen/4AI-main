"use client"

import { createAppKit } from '@reown/appkit/react'

import { http, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bsc, sepolia } from '@reown/appkit/networks'
import { wallectConnectId } from '@/utils'

const queryClient = new QueryClient()

const projectId = wallectConnectId


export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks: [bsc],
  transports: {
    [bsc.id]: http('https://bsc.meowrpc.com')
  }
  // networks: [sepolia],
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: [bsc],
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
    url: 'http://localhost:3000',
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