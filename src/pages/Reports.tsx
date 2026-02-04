"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar, Filter, FileText, TrendingUp, Package, Truck, ChefHat, ShoppingCart } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Reports = () => {
  const [activeTab, setActiveTab] = useState("sales");

  const COLORS = ['#ea580c', '#fb923c', '#fdba74', '#fed7aa'];

  const salesData = [
    { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 }, { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 }, { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const handleExport = () => {
    showSuccess("Generating PDF report... Download will start shortly.");
  };

  return (
    <div className="min-h-screen bg-orange-50/30 lg:pl-72">
      <Sidebar />
      <main className="max-w-[1600px] mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Consolidated ERP Reports</h1>
            <p className="text-gray-500">Comprehensive insights across all bakery operations.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl border-orange-200 text-orange-700">
              <Calendar className="mr-2 h-4 w-4" /> Date Range
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export All Reports (PDF)
            </Button>
          </div>
        </div>

        <Tabs defaultValue="sales" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-orange-100 p-1 rounded-xl h-auto flex-wrap">
            <TabsTrigger value="sales" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <ShoppingCart className="w-4 h-4 mr-2" /> Sales Report
            </TabsTrigger>
            <TabsTrigger value="purchases" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <Truck className="w-4 h-4 mr-2" /> Purchase Report
            </TabsTrigger>
            <TabsTrigger value="stock" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" /> Stock Report
            </TabsTrigger>
            <TabsTrigger value="transfers" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" /> Stock Transfers
            </TabsTrigger>
            <TabsTrigger value="production" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <ChefHat className="w-4 h-4 mr-2" /> Production History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-white border-none shadow-sm">
                <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#ea580c" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm">
                <CardHeader><CardTitle>Sales by Category</CardTitle></CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[{name: 'Bread', value: 400}, {name: 'Pastry', value: 300}, {name: 'Cakes', value: 200}]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {salesData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="purchases">
            <Card className="bg-white border-none shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-orange-50/50">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Warehouse</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1,2,3,4,5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>2024-03-{10+i}</TableCell>
                      <TableCell className="font-bold">All-Purpose Flour</TableCell>
                      <TableCell>Global Flour Mills</TableCell>
                      <TableCell>500 kg</TableCell>
                      <TableCell className="font-bold text-orange-600">$750.00</TableCell>
                      <TableCell>Main Raw WH</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="stock">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader><CardTitle>Raw Material Stock Levels</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material</TableHead>
                        <TableHead>Current</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow><TableCell>Flour</TableCell><TableCell>1,200kg</TableCell><TableCell><span className="text-green-600 font-bold">Healthy</span></TableCell></TableRow>
                      <TableRow><TableCell>Butter</TableCell><TableCell>12kg</TableCell><TableCell><span className="text-red-600 font-bold">Low</span></TableCell></TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm">
                <CardHeader><CardTitle>Finished Goods Stock Levels</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Current</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow><TableCell>Sourdough</TableCell><TableCell>45 units</TableCell><TableCell><span className="text-green-600 font-bold">In Stock</span></TableCell></TableRow>
                      <TableRow><TableCell>Croissant</TableCell><TableCell>8 units</TableCell><TableCell><span className="text-orange-600 font-bold">Re-bake</span></TableCell></TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transfers">
            <Card className="bg-white border-none shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-orange-50/50">
                  <TableRow>
                    <TableHead>Transfer ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>#TR-9021</TableCell>
                    <TableCell>Today, 10:00 AM</TableCell>
                    <TableCell className="font-bold">Dough Batch #102</TableCell>
                    <TableCell>Production WH</TableCell>
                    <TableCell>Baking Floor</TableCell>
                    <TableCell>36,000g</TableCell>
                    <TableCell><span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-bold">Completed</span></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="production">
            <Card className="bg-white border-none shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-orange-50/50">
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Output</TableHead>
                    <TableHead>Consumption</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>#PB-442</TableCell>
                    <TableCell>Dough Prep</TableCell>
                    <TableCell className="font-bold">36,000g Dough</TableCell>
                    <TableCell>24,000g Flour</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Today, 08:00 AM</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Reports;