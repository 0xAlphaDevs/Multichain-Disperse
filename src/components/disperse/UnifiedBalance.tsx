'use client'

import { ArrowDownIcon, ArrowUpIcon, RefreshCwIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const allocationData = [
  { chain: 'Arbitrum', amount: 559.78, color: 'bg-purple-500' },
  { chain: 'Ethereum', amount: 352.32, color: 'bg-blue-500' },
  { chain: 'Optimism', amount: 94.02, color: 'bg-red-500' },
  { chain: 'Base', amount: 0, color: 'bg-blue-300' },
]

export function UnifiedBalance() {
  const totalBalance = allocationData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="bg-muted p-4 rounded-lg">
      <h3 className="font-medium mb-2">Unified ETH Balance</h3>
      <div className=" text-white flex gap-10">
        <div className="flex-1 bg-black rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400">Universal Account</p>
              <p className="text-xs text-gray-500">0x5a28...5278</p>
            </div>
            <RefreshCwIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-baseline mb-4">
            <span className="text-3xl font-bold">${totalBalance.toFixed(2)}</span>
            <span className="text-sm text-green-500 ml-2">+$22.39</span>
            <span className="text-xs text-green-500 ml-1">+2.24%</span>
          </div>
          <div className="flex justify-between mb-4">
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              <ArrowDownIcon className="w-4 h-4 mr-2" />
              Deposit
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              <ArrowUpIcon className="w-4 h-4 mr-2" />
              Transfer
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              Convert
            </Button>
          </div>
        </div>
        <div className="flex-1 bg-black rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">Allocation</h4>
          <div className="space-y-2">
            {allocationData.map((item) => (
              <div key={item.chain} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${item.color} mr-2`}></div>
                    <span className="text-xs">{item.chain}</span>
                  </div>
                  <span className="text-xs">${item.amount.toFixed(2)}</span>
                </div>
                <Progress value={(item.amount / totalBalance) * 100} className="h-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}