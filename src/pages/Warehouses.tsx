"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Warehouse, Plus, MapPin, Package, ArrowRightLeft } from 'lucide-react';

const Warehouses = () => {
  const [warehouses] = useState([
    { id: '1', name: 'Main Raw Material WH', type: 'Raw Materials', location: 'Zone A', items: 24 },
    { id: '2', name: 'Production Floor WH', type: 'Semi-Finished', location: 'Zone B', items: 12 },
    { id: '3', name: 'Main Shop WH', type: 'Finished Goods', location: 'Front Store', items: 45 },
    { id: '4', name: 'Secondary Outlet', type: 'Finished Goods', location: 'Downtown', items: 30 },
  ]);

  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Warehouse Management</h1>
            <p className="text-gray-500">Manage storage locations for raw, semi-finished, and finished goods.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl border-orange-200 text-orange-700">
              <ArrowRightLeft className="mr-2 h-4 w-4" /> Stock Transfer
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
              <Plus className="mr-2 h-4 w-4" /> Add Warehouse
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {warehouses.map((wh) => (
            <Card key={wh.id} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    <Warehouse className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                    {wh.type}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold mt-4">{wh.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" /> {wh.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Package className="h-4 w-4 mr-2" /> {wh.items} Unique Items
                  </div>
                  <Button variant="ghost" className="w-full mt-4 text-orange-600 hover:bg-orange-50 rounded-xl">
                    View Inventory
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Warehouses;