"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Warehouse as WarehouseIcon, Plus, MapPin, Package, ArrowRightLeft, Edit2, Trash2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface Warehouse {
  id: string;
  name: string;
  type: string;
  location: string;
  items: number;
}

const initialWarehouses: Warehouse[] = [
  { id: '1', name: 'Main Raw Material WH', type: 'Raw Materials', location: 'Zone A', items: 24 },
  { id: '2', name: 'Production Floor WH', type: 'Semi-Finished', location: 'Zone B', items: 12 },
  { id: '3', name: 'Main Shop WH', type: 'Finished Goods', location: 'Front Store', items: 45 },
  { id: '4', name: 'Secondary Outlet', type: 'Finished Goods', location: 'Downtown', items: 30 },
];

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  
  const [formData, setFormData] = useState<Partial<Warehouse>>({
    name: '',
    type: 'Raw Materials',
    location: '',
    items: 0
  });

  const handleOpenAdd = () => {
    setEditingWarehouse(null);
    setFormData({ name: '', type: 'Raw Materials', location: '', items: 0 });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (wh: Warehouse) => {
    setEditingWarehouse(wh);
    setFormData(wh);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setWarehouses(warehouses.filter(w => w.id !== id));
    showSuccess("Warehouse removed successfully");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWarehouse) {
      setWarehouses(warehouses.map(w => w.id === editingWarehouse.id ? { ...w, ...formData } as Warehouse : w));
      showSuccess("Warehouse updated successfully");
    } else {
      const newWH = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as Warehouse;
      setWarehouses([...warehouses, newWH]);
      showSuccess("New warehouse added to system");
    }
    setIsDialogOpen(false);
  };

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
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenAdd} className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
                  <Plus className="mr-2 h-4 w-4" /> Add Warehouse
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-2xl">
                <DialogHeader>
                  <DialogTitle>{editingWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="wh-name">Warehouse Name</Label>
                    <Input 
                      id="wh-name" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Cold Storage" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wh-type">Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(v) => setFormData({...formData, type: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                        <SelectItem value="Semi-Finished">Semi-Finished</SelectItem>
                        <SelectItem value="Finished Goods">Finished Goods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wh-location">Location / Zone</Label>
                    <Input 
                      id="wh-location" 
                      value={formData.location} 
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g. Zone C" 
                      required 
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
                      {editingWarehouse ? 'Update Warehouse' : 'Save Warehouse'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {warehouses.map((wh) => (
            <Card key={wh.id} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white group">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    <WarehouseIcon className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-gray-400 hover:text-orange-600"
                      onClick={() => handleOpenEdit(wh)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-gray-400 hover:text-red-600"
                      onClick={() => handleDelete(wh.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 mb-2">
                    {wh.type}
                  </Badge>
                  <CardTitle className="text-lg font-bold">{wh.name}</CardTitle>
                </div>
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