"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Search, AlertTriangle, Edit2, Trash2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minStock: number;
  category: string;
}

const initialMaterials: Material[] = [
  { id: '1', name: 'All-Purpose Flour', quantity: 150, unit: 'kg', minStock: 50, category: 'Dry Goods' },
  { id: '2', name: 'Granulated Sugar', quantity: 80, unit: 'kg', minStock: 30, category: 'Dry Goods' },
  { id: '3', name: 'Unsalted Butter', quantity: 12, unit: 'kg', minStock: 20, category: 'Dairy' },
  { id: '4', name: 'Large Eggs', quantity: 240, unit: 'pcs', minStock: 100, category: 'Dairy' },
  { id: '5', name: 'Whole Milk', quantity: 45, unit: 'L', minStock: 15, category: 'Dairy' },
  { id: '6', name: 'Yeast', quantity: 2, unit: 'kg', minStock: 5, category: 'Dry Goods' },
];

const Inventory = () => {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Material>>({
    name: '',
    category: 'Dry Goods',
    quantity: 0,
    unit: 'kg',
    minStock: 0
  });

  const filteredMaterials = materials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingMaterial(null);
    setFormData({ name: '', category: 'Dry Goods', quantity: 0, unit: 'kg', minStock: 0 });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (material: Material) => {
    setEditingMaterial(material);
    setFormData(material);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
    showSuccess("Material removed from inventory");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMaterial) {
      setMaterials(materials.map(m => m.id === editingMaterial.id ? { ...m, ...formData } as Material : m));
      showSuccess("Material updated successfully");
    } else {
      const newMaterial = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as Material;
      setMaterials([...materials, newMaterial]);
      showSuccess("New material added to inventory");
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Raw Materials</h1>
            <p className="text-gray-500 mt-1">Manage your bakery's essential ingredients and stock levels.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenAdd} className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
                <Plus className="mr-2 h-4 w-4" /> Add Material
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-2xl">
              <DialogHeader>
                <DialogTitle>{editingMaterial ? 'Edit Material' : 'Add New Material'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Material Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Bread Flour" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(v) => setFormData({...formData, category: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dry Goods">Dry Goods</SelectItem>
                        <SelectItem value="Dairy">Dairy</SelectItem>
                        <SelectItem value="Produce">Produce</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select 
                      value={formData.unit} 
                      onValueChange={(v) => setFormData({...formData, unit: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="g">Grams (g)</SelectItem>
                        <SelectItem value="L">Liters (L)</SelectItem>
                        <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Initial Stock</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      value={formData.quantity} 
                      onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Min. Stock Level</Label>
                    <Input 
                      id="minStock" 
                      type="number" 
                      value={formData.minStock} 
                      onChange={(e) => setFormData({...formData, minStock: Number(e.target.value)})}
                      required 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
                    {editingMaterial ? 'Update Material' : 'Save Material'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="p-4 border-b border-orange-50 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search ingredients..." 
                className="pl-10 border-orange-100 focus-visible:ring-orange-500 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Table>
            <TableHeader className="bg-orange-50/50">
              <TableRow>
                <TableHead className="font-semibold text-orange-900">Material Name</TableHead>
                <TableHead className="font-semibold text-orange-900">Category</TableHead>
                <TableHead className="font-semibold text-orange-900">Current Stock</TableHead>
                <TableHead className="font-semibold text-orange-900">Status</TableHead>
                <TableHead className="text-right font-semibold text-orange-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material) => {
                const isLowStock = material.quantity <= material.minStock;
                return (
                  <TableRow key={material.id} className="hover:bg-orange-50/20 transition-colors">
                    <TableCell className="font-medium text-gray-900">{material.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                        {material.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{material.quantity}</span> {material.unit}
                    </TableCell>
                    <TableCell>
                      {isLowStock ? (
                        <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100 flex w-fit items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> Low Stock
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                          In Stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 hover:text-orange-600"
                          onClick={() => handleOpenEdit(material)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 hover:text-red-600"
                          onClick={() => handleDelete(material.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Inventory;