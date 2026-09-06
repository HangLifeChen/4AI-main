'use client'

import {
  useAppKit,
  useAppKitAccount,
} from '@reown/appkit/react'
import { useCallback, useEffect } from 'react'
import { cn } from '@/utils'
import { useUser } from '@/stores'
import { useConnectionEffect } from 'wagmi'

interface WalletLoginProps {
  children: React.ReactNode
  className?: string
}

const WalletLogin = ({
  children,
  className,
}: WalletLoginProps) => {
  const { signWallet } = useUser()
  const { open } = useAppKit()
  const { address } = useAppKitAccount()

  useConnectionEffect({
    onConnect(data) {
      signWallet(data.address)
    },
    onDisconnect() {
      console.log('Disconnected!')
    },
  })

  const connect = useCallback(
    () => {
      open({ view: 'Connect', namespace: 'eip155' })
    },
    [open],
  )

  // useEffect(() => {
  //   if (!address) return

  //   const signed = localStorage.getItem('signedFlag')
  //   if (signed) {
  //     return
  //   }

  //   signWallet(address)
  // }, [address])

  return (
    <div className={cn('w-full', className)} onClick={connect}>
      {children}
    </div>
  )
}

export default WalletLogin

// 'use client'

// import { useAppKit } from '@reown/appkit/react'
// import { useCallback, useEffect, useRef } from 'react'
// import { cn } from '@/utils'
// import { useUser } from '@/stores'
// import { useAccount, useWalletClient } from 'wagmi'

// interface WalletLoginProps {
//   children: React.ReactNode
//   className?: string
// }

// const WalletLogin = ({
//   children,
//   className,
// }: WalletLoginProps) => {
//   const { signWallet } = useUser()
//   const { open } = useAppKit()

//   const { address, isConnected, status } = useAccount()
//   const { data: walletClient, isError, isLoading } = useWalletClient()

//   const hasTriggeredSign = useRef(false)

//   useEffect(() => {
//     if (!isConnected || !address || !walletClient) return

//     if (status !== 'connected') return

//     const isLocalSigned = localStorage.getItem('has_signed_message') === 'true'
//     if (hasTriggeredSign.current || isLocalSigned) return

//     const handleSign = async () => {
//       try {
//         hasTriggeredSign.current = true

//         await signWallet(address)

//       } catch (error) {
//         console.error('Sign failed:', error)
//         hasTriggeredSign.current = false
//       }
//     }

//     handleSign()

//   }, [
//     address,
//     isConnected,
//     status,
//     walletClient,
//     signWallet
//   ])

//   useEffect(() => {
//     if (status === 'disconnected') {
//       hasTriggeredSign.current = false
//     }
//   }, [status])

//   const connect = useCallback(() => {
//     open({ view: 'Connect', namespace: 'eip155' })
//   }, [open])

//   return (
//     <div className={cn('w-full', className)} onClick={connect}>
//       {children}
//     </div>
//   )
// }

// export default WalletLogin