"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat, ArrowRight, Scale, Info } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const ProductionDough = () => {
  const [doughQty, setDoughQty] = useState("");
  
  // Conversion logic: Flour = Dough / 1.5
  const flourNeeded = doughQty ? (Number(doughQty) / 1.5).toFixed(2) : "0.00";

  const handleDoughProduction = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(`Dough Production Logged: ${doughQty}g produced. ${flourNeeded}g flour deducted from inventory.`);
    setDoughQty("");
  };

  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dough Preparation</h1>
          <p className="text-gray-500">Convert raw flour into semi-finished dough using fixed conversion rules.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white border-orange-100 shadow-sm">
            <CardHeader className="bg-orange-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" /> Log Dough Production
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleDoughProduction} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Total Dough Required (grams)</Label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input 
                        type="number" 
                        placeholder="e.g. 36000" 
                        className="pl-10 h-14 text-xl rounded-xl border-orange-100 focus:ring-orange-500"
                        value={doughQty}
                        onChange={(e) => setDoughQty(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-orange-800 font-medium flex items-center gap-2">
                        <Info className="h-4 w-4" /> Conversion Rule
                      </span>
                      <span className="text-orange-600 font-bold">1.5x Yield</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-orange-100">
                      <div className="text-center flex-1">
                        <p className="text-xs text-orange-600 uppercase font-bold mb-1">Flour Consumption</p>
                        <p className="text-2xl font-bold text-gray-900">{flourNeeded}g</p>
                        <p className="text-xs text-gray-500">({(Number(flourNeeded)/1000).toFixed(2)} kg)</p>
                      </div>
                      <div className="px-4">
                        <ArrowRight className="h-6 w-6 text-orange-300" />
                      </div>
                      <div className="text-center flex-1">
                        <p className="text-xs text-orange-600 uppercase font-bold mb-1">Dough Output</p>
                        <p className="text-2xl font-bold text-gray-900">{doughQty || "0"}g</p>
                        <p className="text-xs text-gray-500">({(Number(doughQty)/1000).toFixed(2)} kg)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-14 text-lg font-bold shadow-lg shadow-orange-200"
                  disabled={!doughQty || Number(doughQty) <= 0}
                >
                  Complete Dough Batch
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white border-orange-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Dough Inventory (Semi-Finished)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { batch: "Batch #1024", qty: "36,000g", date: "Today, 08:00 AM", status: "Available" },
                    { batch: "Batch #1023", qty: "12,500g", date: "Today, 06:30 AM", status: "In Use" },
                    { batch: "Batch #1022", qty: "0g", date: "Yesterday", status: "Depleted" },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                      <div>
                        <p className="font-bold text-gray-900">{b.batch}</p>
                        <p className="text-xs text-gray-500">{b.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600">{b.qty}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          b.status === 'Available' ? 'bg-green-50 text-green-600' : 
                          b.status === 'In Use' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'
                        }`}>
                          {b.status}
                        </span>
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

export default ProductionDough;