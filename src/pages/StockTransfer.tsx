"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, History, Trash2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const warehouseInventory: Record<string, string[]> = {
  "Main Raw WH": ["All-Purpose Flour", "Granulated Sugar", "Unsalted Butter", "Dry Yeast"],
  "Production Floor": ["Dough Batch #102", "Dough Batch #103", "Mixed Seeds"],
  "Baking Floor": ["Proofed Loaves", "Glaze Mix"],
  "Main Shop": ["Sourdough Loaf", "Butter Croissant"]
};

const StockTransfer = () => {
  const [fromWH, setFromWH] = useState("");
  const [toWH, setToWH] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [qty, setQty] = useState("");
  const [availableItems, setAvailableItems] = useState<string[]>([]);

  useEffect(() => {
    if (fromWH) {
      setAvailableItems(warehouseInventory[fromWH] || []);
      setSelectedItem(""); // Reset item when warehouse changes
    }
  }, [fromWH]);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(`Successfully transferred ${qty} of ${selectedItem} from ${fromWH} to ${toWH}`);
    setFromWH(""); setToWH(""); setSelectedItem(""); setQty("");
  };

  return (
    <div className="min-h-screen bg-orange-50/30 lg:pl-72">
      <Sidebar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stock Transfers</h1>
          <p className="text-gray-500">Move inventory between warehouses with intelligent item filtering.</p>
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
                      <Label>From Warehouse</Label>
                      <Select value={fromWH} onValueChange={setFromWH}>
                        <SelectTrigger className="rounded-xl border-orange-100">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(warehouseInventory).map(wh => (
                            <SelectItem key={wh} value={wh}>{wh}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>To Warehouse</Label>
                      <Select value={toWH} onValueChange={setToWH}>
                        <SelectTrigger className="rounded-xl border-orange-100">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(warehouseInventory).filter(wh => wh !== fromWH).map(wh => (
                            <SelectItem key={wh} value={wh}>{wh}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Item to Transfer</Label>
                      <Select 
                        value={selectedItem} 
                        onValueChange={setSelectedItem}
                        disabled={!fromWH || !toWH}
                      >
                        <SelectTrigger className="rounded-xl border-orange-100">
                          <SelectValue placeholder={fromWH ? "Select item..." : "Select warehouses first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableItems.map(item => (
                            <SelectItem key={item} value={item}>{item}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input 
                        value={qty} 
                        onChange={(e) => setQty(e.target.value)} 
                        placeholder="e.g. 50kg" 
                        disabled={!selectedItem}
                        required 
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 font-bold"
                    disabled={!qty}
                  >
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
                  <History className="h-5 w-5 text-orange-600" /> Recent Transfers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-orange-50">
                  {[
                    { id: 'TR-101', item: 'Flour', from: 'Main Raw', to: 'Production', qty: '200kg' },
                    { id: 'TR-102', item: 'Dough', from: 'Production', to: 'Baking', qty: '36kg' },
                  ].map((t) => (
                    <div key={t.id} className="p-4 hover:bg-orange-50/30 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-900">{t.item}</h4>
                          <p className="text-xs text-gray-500">{t.from} → {t.to}</p>
                        </div>
                        <span className="font-bold text-orange-600">{t.qty}</span>
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