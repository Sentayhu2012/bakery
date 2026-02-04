"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, History, Plus, Trash2, Search } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface Transfer {
  id: string;
  item: string;
  from: string;
  to: string;
  qty: string;
  date: string;
}

const initialTransfers: Transfer[] = [
  { id: 'TR-101', item: 'All-Purpose Flour', from: 'Main Raw WH', to: 'Production Floor', qty: '200kg', date: 'Today, 09:00 AM' },
  { id: 'TR-102', item: 'Dough Batch #44', from: 'Production Floor', to: 'Baking Floor', qty: '36,000g', date: 'Today, 10:30 AM' },
];

const StockTransfer = () => {
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);
  const [item, setItem] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [qty, setQty] = useState("");

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransfer = {
      id: `TR-${Math.floor(Math.random() * 9000) + 1000}`,
      item, from, to, qty,
      date: 'Just now'
    };
    setTransfers([newTransfer, ...transfers]);
    showSuccess(`Stock Transfer: ${qty} of ${item} moved successfully.`);
    setItem(""); setFrom(""); setTo(""); setQty("");
  };

  const deleteTransfer = (id: string) => {
    setTransfers(transfers.filter(t => t.id !== id));
    showSuccess("Transfer record deleted");
  };

  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stock Transfers</h1>
          <p className="text-gray-500">Move inventory between warehouses and track movement history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader className="bg-orange-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5" /> New Stock Transfer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleTransfer} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Item to Transfer</Label>
                      <Input value={item} onChange={(e) => setItem(e.target.value)} placeholder="e.g. Flour or Dough Batch" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input value={qty} onChange={(e) => setQty(e.target.value)} placeholder="e.g. 50kg" required />
                    </div>
                    <div className="space-y-2">
                      <Label>From Warehouse</Label>
                      <Select value={from} onValueChange={setFrom}>
                        <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Main Raw WH">Main Raw WH</SelectItem>
                          <SelectItem value="Production Floor">Production Floor</SelectItem>
                          <SelectItem value="Baking Floor">Baking Floor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>To Warehouse</Label>
                      <Select value={to} onValueChange={setTo}>
                        <SelectTrigger><SelectValue placeholder="Select destination" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Main Raw WH">Main Raw WH</SelectItem>
                          <SelectItem value="Production Floor">Production Floor</SelectItem>
                          <SelectItem value="Baking Floor">Baking Floor</SelectItem>
                          <SelectItem value="Main Shop">Main Shop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 font-bold">
                    Execute Transfer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <History className="h-5 w-5 text-orange-600" /> Transfer History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-orange-50">
                  {transfers.map((t) => (
                    <div key={t.id} className="p-4 hover:bg-orange-50/30 transition-colors group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-900">{t.item}</h4>
                          <p className="text-xs text-gray-500">{t.from} → {t.to}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => deleteTransfer(t.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="font-bold text-orange-600">{t.qty}</span>
                        <span className="text-gray-400">{t.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StockTransfer;