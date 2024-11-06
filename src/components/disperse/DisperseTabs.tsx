'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export function DisperseTabs() {
  const [transferType, setTransferType] = useState('ether')
  const [selectedToken, setSelectedToken] = useState('')

  return (
    <Tabs defaultValue="ether" onValueChange={setTransferType} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ether">Send Ether</TabsTrigger>
        <TabsTrigger value="token">Send Token</TabsTrigger>
      </TabsList>

      <TabsContent value="ether" className="space-y-4">
        <div className="space-y-4 mt-4">
          <div className="flex gap-4">
            <Input placeholder="Address" className="flex-1" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="arbitrum">Arbitrum</SelectItem>
                <SelectItem value="optimism">Optimism</SelectItem>
                <SelectItem value="base">Base</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Amount" type="number" className="w-[150px]" />
            <Button variant="outline" className="px-2">+</Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-purple-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-purple-500">or</span>
            </div>
          </div>

          <Textarea
            placeholder="Paste comma separated values here&#10;Format: address,chain,amount&#10;Example: 0x123...,polygon,0.1"
            className="min-h-[100px]"
          />
        </div>
      </TabsContent>

      <TabsContent value="token" className="space-y-4">
        <div className="space-y-4 mt-4">
          <Select onValueChange={setSelectedToken}>
            <SelectTrigger>
              <SelectValue placeholder="Select Token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usdc">USDC</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {selectedToken === 'other' && (
            <div className="space-y-2">
              <Label htmlFor="tokenAddress">Token Address</Label>
              <Input id="tokenAddress" placeholder="Enter token address" />
            </div>
          )}

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Chain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="polygon">Polygon</SelectItem>
              <SelectItem value="arbitrum">Arbitrum</SelectItem>
              <SelectItem value="optimism">Optimism</SelectItem>
              <SelectItem value="base">Base</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-4">
            <Input placeholder="Address" className="flex-1" />
            <Input placeholder="Amount" type="number" className="w-[150px]" />
            <Button variant="outline" className="px-2">+</Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-purple-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-purple-500">or</span>
            </div>
          </div>

          <Textarea
            placeholder="Paste comma separated values here&#10;Format: address,chain,amount&#10;Example: 0x123...,polygon,100"
            className="min-h-[100px]"
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}