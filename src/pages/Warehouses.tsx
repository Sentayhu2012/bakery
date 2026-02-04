"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Warehouse as WarehouseIcon, Plus, MapPin, Package, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Warehouses = () => {
  const warehouses = [
    { id: '1', name: 'Main Raw Material WH', type: 'Raw Materials', location: 'Zone A', items: 24 },
    { id: '2', name: 'Production Floor WH', type: 'Semi-Finished', location: 'Zone B', items: 12 },
    { id: '3', name: 'Main Shop WH', type: 'Finished Goods', location: 'Front Store', items: 45 },
  ];

  return (
    <div className="min-h-screen bg-orange-50/30 lg:pl-72">
      <Sidebar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Warehouse Management</h1>
            <p className="text-gray-500">Manage storage locations for raw, semi-finished, and finished goods.</p>
          </div>
          <Link to="/transfers">
            <Button variant="outline" className="rounded-xl border-orange-200 text-orange-700">
              <ArrowRightLeft className="mr-2 h-4 w-4" /> Stock Transfer
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((wh) => (
            <Card key={wh.id} className="border-none shadow-sm bg-white">
              <CardHeader>
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600 w-fit mb-4">
                  <WarehouseIcon className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 mb-2 w-fit">
                  {wh.type}
                </Badge>
                <CardTitle className="text-lg font-bold">{wh.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" /> {wh.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Package className="h-4 w-4 mr-2" /> {wh.items} Unique Items
                  </div>
                  <Link to="/inventory" className="block mt-4">
                    <Button variant="ghost" className="w-full text-orange-600 hover:bg-orange-50 rounded-xl">
                      View Inventory
                    </Button>
                  </Link>
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