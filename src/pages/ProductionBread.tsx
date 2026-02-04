"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UtensilsCrossed, Package, ArrowRight, History } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const ProductionBread = () => {
  const [variant, setVariant] = useState("");
  const [quantity, setQuantity] = useState("");

  const variants = {
    "80g": 80,
    "150g": 150,
    "250g": 250
  };

  const doughNeeded = variant && quantity ? (variants[variant as keyof typeof variants] * Number(quantity)) : 0;

  const handleBake = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(`Baking Complete: ${quantity}x ${variant} loaves added to Finished Goods. ${doughNeeded}g dough consumed.`);
    setVariant("");
    setQuantity("");
  };

  return (
    <div className="min-h-screen bg-orange-50/30 lg:pl-72">
      <Sidebar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bread Production</h1>
          <p className="text-gray-500">Convert semi-finished dough into finished bread loaves.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-orange-100 shadow-sm">
              <CardHeader className="bg-orange-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5" /> Log Bread Baking
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleBake} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Bread Variant</Label>
                      <Select value={variant} onValueChange={setVariant}>
                        <SelectTrigger className="rounded-xl border-orange-100">
                          <SelectValue placeholder="Select variant..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="80g">Standard Loaf (80g)</SelectItem>
                          <SelectItem value="150g">Large Loaf (150g)</SelectItem>
                          <SelectItem value="250g">Family Loaf (250g)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity to Produce</Label>
                      <Input 
                        type="number" 
                        placeholder="e.g. 100" 
                        className="rounded-xl border-orange-100"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {variant && quantity && (
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs text-orange-600 font-bold uppercase">Dough Consumption</p>
                          <p className="text-xl font-bold text-gray-900">{doughNeeded.toLocaleString()}g</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-orange-300" />
                      <div className="text-right">
                        <p className="text-xs text-orange-600 font-bold uppercase">Finished Output</p>
                        <p className="text-xl font-bold text-gray-900">{quantity} Loaves</p>
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 font-bold"
                    disabled={!variant || !quantity}
                  >
                    Complete Baking Run
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-orange-100 shadow-sm">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <History className="h-5 w-5 text-orange-600" /> Recent Bakes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-orange-50">
                  {[
                    { item: "80g Loaf", qty: "200 units", time: "10:30 AM" },
                    { item: "150g Loaf", qty: "50 units", time: "09:15 AM" },
                    { item: "80g Loaf", qty: "150 units", time: "07:45 AM" },
                  ].map((b, i) => (
                    <div key={i} className="p-4 hover:bg-orange-50/30 transition-colors">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-gray-900">{b.item}</h4>
                        <span className="text-sm font-medium text-gray-500">{b.time}</span>
                      </div>
                      <p className="text-sm text-orange-600 font-semibold mt-1">{b.qty}</p>
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

export default ProductionBread;