"use client";

import { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { PlusCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import AllocationComponent from "./AllocationComponent";

export function DisperseTabs() {
  const [transferType, setTransferType] = useState("ether");
  const [selectedToken, setSelectedToken] = useState("");
  const [etherRows, setEtherRows] = useState([
    { address: "", chain: "", amount: "" },
  ]);
  const [tokenRows, setTokenRows] = useState([
    { address: "", chain: "", amount: "" },
  ]);
  const [etherTextareaContent, setEtherTextareaContent] = useState("");
  const [tokenTextareaContent, setTokenTextareaContent] = useState("");

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

  const parseTextareaContent = (content: string) => {
    return content
      .split('\n')
      .map(line => {
        const [address, chain, amount] = line.split(',').map(item => item.trim());
        return { address, chain, amount };
      })
      .filter(row => row.address && row.chain && row.amount);
  };

  const handleSendTransaction = () => {
    let dataToSend = [];

    if (transferType === "ether") {
      if (etherTextareaContent.trim()) {
        dataToSend = parseTextareaContent(etherTextareaContent);
      } else {
        dataToSend = etherRows.filter(row => row.address && row.chain && row.amount);
      }
      console.log("Ether Transaction Data:", dataToSend);
    } else {
      if (tokenTextareaContent.trim()) {
        dataToSend = parseTextareaContent(tokenTextareaContent);
      } else {
        dataToSend = tokenRows.filter(row => row.address && row.chain && row.amount);
      }
      console.log("Token Transaction Data:", dataToSend);
    }

    if (dataToSend.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Transaction sent successfully!");
  };

  useEffect(() => {
    setSelectedToken("");
    setTokenRows([{ address: "", chain: "", amount: "" }]);
  }, [transferType]);

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
                  required
                />
                <Select
                  value={row.chain}
                  onValueChange={(value) =>
                    updateRow("ether", index, "chain", value)
                  }
                  required
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
                  required
                />
                {index > 0 && (
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
              value={etherTextareaContent}
              onChange={(e) => setEtherTextareaContent(e.target.value)}
            />
            <div className="flex justify-center pt-6 pb-4">
              <Button onClick={handleSendTransaction}>Send Transaction</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="token" className="space-y-4 px-4 pb-4">
          <div className="space-y-4 mt-4">
            <Select onValueChange={setSelectedToken} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usdc">
                  <div className="flex items-center">
                    <img
                      className="h-6 w-6 mr-2"
                      src="/icons/usdc.png"
                      alt="USDC icon"
                    />
                    <p>USDC</p>
                  </div>
                </SelectItem>
                <SelectItem value="usdt">
                  <div className="flex items-center">
                    <img
                      className="h-6 w-6 mr-2"
                      src="/icons/usdt.png"
                      alt="USDT icon"
                    />
                    <p>USDT</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {selectedToken && (
              <>
                <div className="flex justify-end">
                  <AllocationComponent token={selectedToken} />
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
                      required
                    />
                    <Select
                      value={row.chain}
                      onValueChange={(value) =>
                        updateRow("token", index, "chain", value)
                      }
                      required
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
                      required
                    />
                    {index > 0 && (
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
                    <span className="bg-background px-2 text-purple-500">
                      or
                    </span>
                  </div>
                </div>

                <Textarea
                  placeholder="Paste comma separated values here&#10;Format: address,chain,amount&#10;Example: 0x123...,polygon,100"
                  className="min-h-[100px]"
                  value={tokenTextareaContent}
                  onChange={(e) => setTokenTextareaContent(e.target.value)}
                />
                <div className="flex justify-center pt-6 pb-4">
                  <Button onClick={handleSendTransaction}>
                    Send Transaction
                  </Button>
                </div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
