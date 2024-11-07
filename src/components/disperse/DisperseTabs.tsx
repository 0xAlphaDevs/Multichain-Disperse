"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { PlusCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Progress } from "../ui/progress";

const allocationData = [
  {
    chain: "Arbitrum",
    amount: 559.78,
    color: "bg-purple-500",
    icon: "/icons/arbitrum.png",
  },
  {
    chain: "Ethereum",
    amount: 352.32,
    color: "bg-blue-500",
    icon: "/icons/eth.png",
  },
  {
    chain: "Optimism",
    amount: 94.02,
    color: "bg-red-500",
    icon: "/icons/optimism.png",
  },
  { chain: "Base", amount: 0, color: "bg-blue-300", icon: "/icons/base.png" },
];

export function DisperseTabs() {
  const [transferType, setTransferType] = useState("ether");
  const [selectedToken, setSelectedToken] = useState("");
  const [etherRows, setEtherRows] = useState([
    { address: "", chain: "", amount: "" },
  ]);
  const [tokenRows, setTokenRows] = useState([
    { address: "", chain: "", amount: "" },
  ]);
  const totalBalance = allocationData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const addRow = (type: "ether" | "token") => {
    if (type === "ether") {
      setEtherRows([...etherRows, { address: "", chain: "", amount: "" }]);
    } else {
      setTokenRows([...tokenRows, { address: "", chain: "", amount: "" }]);
    }
  };

  const removeRow = (type: "ether" | "token", index: number) => {
    if (type === "ether") {
      const newRows = etherRows.filter((_, i) => i !== index);
      setEtherRows(
        newRows.length ? newRows : [{ address: "", chain: "", amount: "" }]
      );
    } else {
      const newRows = tokenRows.filter((_, i) => i !== index);
      setTokenRows(
        newRows.length ? newRows : [{ address: "", chain: "", amount: "" }]
      );
    }
  };

  const updateRow = (
    type: "ether" | "token",
    index: number,
    field: string,
    value: string
  ) => {
    if (type === "ether") {
      const newRows = [...etherRows];
      newRows[index] = { ...newRows[index], [field]: value };
      setEtherRows(newRows);
    } else {
      const newRows = [...tokenRows];
      newRows[index] = { ...newRows[index], [field]: value };
      setTokenRows(newRows);
    }
  };

  const handleSendTransaction = () => {
    toast.success('Transaction sent successfully!');
  };

  return (
    <Card className="p-4">
      <Tabs
        defaultValue="ether"
        onValueChange={setTransferType}
        className="w-full px-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ether">Send Ether</TabsTrigger>
          <TabsTrigger value="token">Send Token</TabsTrigger>
        </TabsList>

        <TabsContent value="ether" className="space-y-4 px-4">
          <div className="space-y-4 mt-4">
            {etherRows.map((row, index) => (
              <div
                key={index}
                className="flex items-center gap-4 justify-start"
              >
                <Input
                  placeholder="Address"
                  className="w-[500px]"
                  value={row.address}
                  onChange={(e) =>
                    updateRow("ether", index, "address", e.target.value)
                  }
                />
                <Select
                  value={row.chain}
                  onValueChange={(value) =>
                    updateRow("ether", index, "chain", value)
                  }
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="optimism">Optimism</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Amount"
                  type="number"
                  className="w-[120px]"
                  value={row.amount}
                  onChange={(e) =>
                    updateRow("ether", index, "amount", e.target.value)
                  }
                />
                {index >= 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow("ether", index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => addRow("ether")}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Row
            </Button>

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
            <div className="flex justify-center pt-6 pb-4">
              <Button onClick={handleSendTransaction}>Send Transaction</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="token" className="space-y-4 px-4 pb-4">
          <div className="space-y-4 mt-4">
            <Select onValueChange={setSelectedToken}>
              <SelectTrigger>
                <SelectValue placeholder="Select Token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usdc">
                  <div className="flex items-center">
                    <img className="h-6 w-6 mr-2" src="/icons/usdc.png" alt="USDC icon" />
                    <p>USDC</p>
                  </div>
                </SelectItem>
                <SelectItem value="usdt">
                  <div className="flex items-center">
                    <img className="h-6 w-6 mr-2" src="/icons/usdt.png" alt="USDT icon" />
                    <p>USDT</p>
                  </div>
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            {selectedToken && (
              <>
                {selectedToken === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="tokenAddress">Token Address</Label>
                    <Input id="tokenAddress" placeholder="Enter token address" />
                    <Label htmlFor="tokenChain">Token Chain</Label>
                    <Select>
                      <SelectTrigger id="tokenChain">
                        <SelectValue placeholder="Select Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="arbitrum">Arbitrum</SelectItem>
                        <SelectItem value="optimism">Optimism</SelectItem>
                        <SelectItem value="base">Base</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="">View Token Allocation</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Token Allocation</DialogTitle>
                        <DialogDescription>
                          <div className="space-y-2 py-4">
                            {allocationData.map((item) => (
                              <div key={item.chain} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <img
                                      src={`${item.icon}`}
                                      className={`w-6 h-6 rounded-full mr-2`}
                                    ></img>
                                    <span className="text-xs">{item.chain}</span>
                                  </div>
                                  <span className="text-xs">${item.amount.toFixed(2)}</span>
                                </div>
                                <Progress
                                  value={(item.amount / totalBalance) * 100}
                                  className="h-1"
                                />
                              </div>
                            ))}
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>


                </div>

                {tokenRows.map((row, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 justify-start"
                  >
                    <Input
                      placeholder="Address"
                      className="w-[500px]"
                      value={row.address}
                      onChange={(e) =>
                        updateRow("token", index, "address", e.target.value)
                      }
                    />
                    <Select
                      value={row.chain}
                      onValueChange={(value) =>
                        updateRow("token", index, "chain", value)
                      }
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="arbitrum">Arbitrum</SelectItem>
                        <SelectItem value="optimism">Optimism</SelectItem>
                        <SelectItem value="base">Base</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Amount"
                      type="number"
                      className="w-[120px]"
                      value={row.amount}
                      onChange={(e) =>
                        updateRow("token", index, "amount", e.target.value)
                      }
                    />
                    {index >= 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRow("token", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => addRow("token")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Row
                </Button>

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
                <div className="flex justify-center pt-6 pb-4">
                  <Button onClick={handleSendTransaction}>Send Transaction</Button>
                </div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

    </Card>
  );
}