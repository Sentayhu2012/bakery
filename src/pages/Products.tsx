"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, ShoppingBag, MoreVertical } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

const initialProducts: Product[] = [
  { id: '1', name: 'Sourdough Loaf', price: 6.50, stock: 24, category: 'Bread', image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Butter Croissant', price: 3.75, stock: 42, category: 'Pastry', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Chocolate Muffin', price: 4.25, stock: 18, category: 'Pastry', image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Baguette Tradition', price: 3.20, stock: 30, category: 'Bread', image: 'https://images.unsplash.com/photo-1597079910443-60c43fc4f729?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'Cinnamon Roll', price: 4.50, stock: 12, category: 'Pastry', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=400' },
  { id: '6', name: 'Whole Wheat Bread', price: 5.50, stock: 15, category: 'Bread', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Finished Goods</h1>
            <p className="text-gray-500 mt-1">Track your daily bakes and available storefront stock.</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 border-orange-100 focus-visible:ring-orange-500 rounded-xl bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white/90 text-orange-700 hover:bg-white border-none backdrop-blur-sm">
                    {product.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-orange-600">${product.price.toFixed(2)}</p>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">In Stock</p>
                    <p className="text-lg font-bold text-gray-900">{product.stock}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-orange-50 text-orange-700 hover:bg-orange-100 border-none rounded-xl font-semibold"
                  onClick={() => showSuccess(`Updated stock for ${product.name}`)}
                >
                  Update Stock
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;