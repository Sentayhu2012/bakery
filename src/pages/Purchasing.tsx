"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Plus, History, Search } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Purchasing = () => {
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [warehouse, setWarehouse] = useState("");

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(`Stock In: ${quantity}kg of ${material} added to ${warehouse}`);
    setMaterial("");
    setQuantity("");
  };

  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Raw Material Purchasing</h1>
          <p className="text-gray-500">Record incoming stock and manage supplier transactions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-orange-100 shadow-sm">
              <CardHeader className="bg-orange-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" /> Record Stock In
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handlePurchase} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Raw Material</Label>
                      <Select value={material} onValueChange={setMaterial}>
                        <SelectTrigger className="rounded-xl border-orange-100">
                          <SelectValue placeholder="Select material..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flour">All-Purpose Flour</SelectItem>
                          <SelectItem value="sugar">Granulated Sugar</SelectItem>
                          <SelectItem value="yeast">Dry Yeast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Target Warehouse</Label>
                      <Select value={warehouse} onValueChange={setWarehouse}>
                        <SelectTrigger className="rounded-xl border-orange-100">
                          <SelectValue placeholder="Select warehouse..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wh1">Main Raw Material WH</SelectItem>
                          <SelectItem value="wh2">Production Floor WH</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity (kg)</Label>
                      <Input 
                        type="number" 
                        placeholder="e.g. 500" 
                        className="rounded-xl border-orange-100"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Supplier</Label>
                      <Select defaultValue="sup1">
                        <SelectTrigger className="rounded-xl border-orange-100">
                          <SelectValue placeholder="Select supplier..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sup1">Global Flour Mills</SelectItem>
                          <SelectItem value="sup2">Sweet & Pure Sugar Co.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 font-bold">
                    Complete Purchase Transaction
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-orange-100 shadow-sm">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <History className="h-5 w-5 text-orange-600" /> Recent Purchases
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-orange-50">
                  {[
                    { item: "Flour", qty: "1000kg", date: "Today", status: "Received" },
                    { item: "Sugar", qty: "200kg", date: "Yesterday", status: "Received" },
                    { item: "Yeast", qty: "50kg", date: "2 days ago", status: "Received" },
                  ].map((p, i) => (
                    <div key={i} className="p-4 hover:bg-orange-50/30 transition-colors">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900">{p.item}</h4>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">
                          {p.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{p.qty}</span>
                        <span>{p.date}</span>
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

export default Purchasing;