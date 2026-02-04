"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, BookOpen } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface BOMItem {
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  id: string;
  productName: string;
  ingredients: BOMItem[];
}

const initialRecipes: Recipe[] = [
  {
    id: '1',
    productName: 'Sourdough Loaf',
    ingredients: [
      { materialId: '1', materialName: 'All-Purpose Flour', quantity: 0.5, unit: 'kg' },
      { materialId: '5', materialName: 'Whole Milk', quantity: 0.3, unit: 'L' },
      { materialId: '6', materialName: 'Yeast', quantity: 0.01, unit: 'kg' },
    ]
  },
  {
    id: '2',
    productName: 'Butter Croissant',
    ingredients: [
      { materialId: '1', materialName: 'All-Purpose Flour', quantity: 0.2, unit: 'kg' },
      { materialId: '3', materialName: 'Unsalted Butter', quantity: 0.1, unit: 'kg' },
      { materialId: '4', materialName: 'Large Eggs', quantity: 0.5, unit: 'pcs' },
    ]
  }
];

const BOM = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleSave = () => {
    showSuccess("Recipe (BOM) saved successfully");
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-orange-50/30 lg:pl-72">
      <Sidebar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bill of Materials</h1>
            <p className="text-gray-500 mt-1">Define recipes and material requirements for your bakes.</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
            <Plus className="mr-2 h-4 w-4" /> Create New Recipe
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-orange-600" /> Active Recipes
            </h2>
            {recipes.map((recipe) => (
              <Card 
                key={recipe.id} 
                className={`cursor-pointer transition-all border-orange-100 hover:shadow-md ${selectedRecipe?.id === recipe.id ? 'ring-2 ring-orange-500 bg-orange-50/50' : 'bg-white'}`}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900">{recipe.productName}</h3>
                  <p className="text-sm text-gray-500">{recipe.ingredients.length} Ingredients</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selectedRecipe ? (
              <Card className="bg-white border-orange-100 shadow-sm">
                <CardHeader className="border-b border-orange-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Recipe: {selectedRecipe.productName}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" className="rounded-xl border-orange-200 text-orange-700" onClick={() => setSelectedRecipe(null)}>
                        Cancel
                      </Button>
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" /> Save BOM
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-orange-50/50">
                      <TableRow>
                        <TableHead className="font-semibold text-orange-900">Material</TableHead>
                        <TableHead className="font-semibold text-orange-900">Quantity</TableHead>
                        <TableHead className="font-semibold text-orange-900">Unit</TableHead>
                        <TableHead className="text-right font-semibold text-orange-900">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedRecipe.ingredients.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{item.materialName}</TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              defaultValue={item.quantity} 
                              className="w-24 border-orange-100 focus-visible:ring-orange-500"
                            />
                          </TableCell>
                          <TableCell className="text-gray-500">{item.unit}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="p-4 border-t border-orange-50">
                    <Button variant="ghost" className="text-orange-600 hover:bg-orange-50 w-full border-dashed border-2 border-orange-100 rounded-xl">
                      <Plus className="mr-2 h-4 w-4" /> Add Ingredient
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-orange-100 p-12 text-center">
                <div className="bg-orange-50 p-4 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No Recipe Selected</h3>
                <p className="text-gray-500 max-w-xs mx-auto mt-2">
                  Select a recipe from the list to view or edit its Bill of Materials.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BOM;