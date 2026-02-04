"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ChefHat, History, ArrowRight, PackageCheck } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Production = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleLogProduction = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(`Successfully logged production of ${quantity} units. Raw materials have been adjusted.`);
    setSelectedProduct("");
    setQuantity("");
  };

  const recentLogs = [
    { id: 1, product: "Sourdough Loaf", qty: 24, time: "Today, 08:30 AM", status: "Completed" },
    { id: 2, product: "Butter Croissant", qty: 48, time: "Today, 07:15 AM", status: "Completed" },
    { id: 3, product: "Chocolate Muffin", qty: 12, time: "Yesterday, 04:45 PM", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-orange-50/30 lg:pl-72">
      <Sidebar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Production Portal</h1>
          <p className="text-gray-500 mt-1">Log daily bakes to update finished goods and consume raw materials.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-orange-100 shadow-sm overflow-hidden">
              <CardHeader className="bg-orange-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" /> Log New Production Run
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleLogProduction} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="product" className="text-gray-700 font-medium">Select Finished Good</Label>
                      <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                        <SelectTrigger className="border-orange-100 focus:ring-orange-500 rounded-xl">
                          <SelectValue placeholder="Choose a product..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sourdough">Sourdough Loaf</SelectItem>
                          <SelectItem value="croissant">Butter Croissant</SelectItem>
                          <SelectItem value="muffin">Chocolate Muffin</SelectItem>
                          <SelectItem value="baguette">Baguette Tradition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-gray-700 font-medium">Quantity Produced</Label>
                      <Input 
                        id="quantity" 
                        type="number" 
                        placeholder="e.g. 24" 
                        className="border-orange-100 focus-visible:ring-orange-500 rounded-xl"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {selectedProduct && (
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                      <h4 className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
                        <PackageCheck className="h-4 w-4" /> Estimated Material Consumption
                      </h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Flour: {Number(quantity || 0) * 0.5} kg</li>
                        <li>• Milk: {Number(quantity || 0) * 0.3} L</li>
                        <li>• Yeast: {Number(quantity || 0) * 0.01} kg</li>
                      </ul>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 text-lg font-bold shadow-lg shadow-orange-200"
                    disabled={!selectedProduct || !quantity}
                  >
                    Complete Production Run <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-orange-100 shadow-sm">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <History className="h-5 w-5 text-orange-600" /> Recent Production
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-orange-50">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="p-4 hover:bg-orange-50/30 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900">{log.product}</h4>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          {log.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{log.qty} units</span>
                        <span>{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-orange-50">
                  <Button variant="ghost" className="w-full text-orange-600 hover:bg-orange-50 text-sm font-semibold">
                    View Full History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Production;