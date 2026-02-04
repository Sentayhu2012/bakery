"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Trash2, CreditCard, User } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const POS = () => {
  const [cart, setCart] = useState<{id: string, name: string, price: number, qty: number}[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: '1', name: 'Standard Loaf (80g)', price: 1.50, stock: 145 },
    { id: '2', name: 'Large Loaf (150g)', price: 2.75, stock: 42 },
    { id: '3', name: 'Family Loaf (250g)', price: 4.50, stock: 18 },
    { id: '4', name: 'Whole Wheat (150g)', price: 3.25, stock: 30 },
  ];

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item));
    } else {
      setCart([...cart, {...product, qty: 1}]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleCheckout = () => {
    showSuccess(`Sale Completed: $${total.toFixed(2)} recorded. Stock updated.`);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Point of Sale</h1>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 rounded-xl border-orange-100 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {products.map((p) => (
                <Card 
                  key={p.id} 
                  className="cursor-pointer hover:shadow-md transition-all border-none bg-white group"
                  onClick={() => addToCart(p)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <ShoppingCart className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100">
                        {p.stock} in stock
                      </Badge>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{p.name}</h3>
                    <p className="text-2xl font-black text-orange-600 mt-2">${p.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart / Checkout */}
          <div className="lg:col-span-4">
            <Card className="bg-white border-orange-100 shadow-lg h-[calc(100vh-160px)] flex flex-col sticky top-24">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-orange-600" /> Current Order
                  </span>
                  <Badge className="bg-orange-100 text-orange-700 border-none">
                    {cart.length} Items
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                    <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
                    <p>Your cart is empty</p>
                    <p className="text-sm">Select products to start an order</p>
                  </div>
                ) : (
                  <div className="divide-y divide-orange-50">
                    {cart.map((item) => (
                      <div key={item.id} className="p-4 flex items-center justify-between hover:bg-orange-50/30">
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.qty}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-gray-400 hover:text-red-600"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <div className="p-6 border-t border-orange-50 bg-orange-50/30 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (0%)</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-gray-900 pt-2 border-t border-orange-100">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="rounded-xl border-orange-200 text-orange-700 h-12">
                    <User className="mr-2 h-4 w-4" /> Customer
                  </Button>
                  <Button variant="outline" className="rounded-xl border-orange-200 text-orange-700 h-12">
                    <CreditCard className="mr-2 h-4 w-4" /> Payment
                  </Button>
                </div>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-14 text-lg font-bold shadow-lg shadow-orange-200"
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                >
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