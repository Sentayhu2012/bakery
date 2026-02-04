"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Search, Trash2, CreditCard, User, Plus } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const POS = () => {
  const [cart, setCart] = useState<{id: string, name: string, price: number, qty: number}[]>([]);
  const [customer, setCustomer] = useState("Walking Customer");

  const products = [
    { id: '1', name: 'Standard Loaf (80g)', price: 1.50, stock: 145 },
    { id: '2', name: 'Large Loaf (150g)', price: 2.75, stock: 42 },
    { id: '3', name: 'Family Loaf (250g)', price: 4.50, stock: 18 },
  ];

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item));
    } else {
      setCart([...cart, {...product, qty: 1}]);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleCheckout = () => {
    showSuccess(`Sale Completed for ${customer}: $${total.toFixed(2)} recorded.`);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-orange-50/30 lg:pl-72">
      <Sidebar />
      <main className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Point of Sale</h1>
              <div className="flex gap-4">
                <div className="relative w-64">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Select value={customer} onValueChange={setCustomer}>
                    <SelectTrigger className="pl-10 rounded-xl border-orange-100 bg-white">
                      <SelectValue placeholder="Select Customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Walking Customer">Walking Customer</SelectItem>
                      <SelectItem value="John Smith">John Smith (Loyalty)</SelectItem>
                      <SelectItem value="Sarah Parker">Sarah Parker (Wholesale)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="rounded-xl border-orange-200 text-orange-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {products.map((p) => (
                <Card key={p.id} className="cursor-pointer hover:shadow-md transition-all border-none bg-white" onClick={() => addToCart(p)}>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg">{p.name}</h3>
                    <p className="text-2xl font-black text-orange-600 mt-2">${p.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-400 mt-2">{p.stock} in stock</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <Card className="bg-white border-orange-100 shadow-lg h-[calc(100vh-160px)] flex flex-col sticky top-24">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-orange-600" /> Order: {customer}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.qty} x ${item.price.toFixed(2)}</p>
                    </div>
                    <p className="font-bold">${(item.qty * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </CardContent>
              <div className="p-6 border-t border-orange-50 bg-orange-50/30">
                <div className="flex justify-between text-2xl font-black mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-orange-600 h-14 rounded-xl font-bold text-lg" onClick={handleCheckout} disabled={cart.length === 0}>
                  Complete Sale
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default POS;