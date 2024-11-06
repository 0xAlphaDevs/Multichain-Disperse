'use client'

import { ConnectButton, useAccount } from '@particle-network/connectkit'
import { isEVMChain } from '@particle-network/connectkit/chains'
import Demo from './components/demo'

export default function Component() {
  const { isConnected, chain } = useAccount()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 px-8 bg-purple-900 text-white z-10">
        <p className="text-lg font-bold">Multichain Disperse</p>
        <ConnectButton />
      </header>
      <main className="flex-grow flex justify-center items-center p-8 mt-16">
        {isConnected && chain && isEVMChain(chain) ? (
          <Demo />
        ) : (
          <div className="flex flex-col items-center gap-4 justify-center text-center">
            <p className="text-lg">Please connect your wallet to get started with</p>
            <p className="font-semibold text-5xl text-purple-600">Multichain Disperse</p>
          </div>
        )}
      </main>
    </div>
  )
}