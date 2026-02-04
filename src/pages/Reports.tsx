"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';

const Reports = () => {
  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const productionData = [
    { name: '80g Loaf', qty: 1200 },
    { name: '150g Loaf', qty: 800 },
    { name: '250g Loaf', qty: 400 },
  ];

  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Consolidated Reports</h1>
            <p className="text-gray-500">Analyze sales, production, and inventory performance.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl border-orange-200 text-orange-700">
              <Calendar className="mr-2 h-4 w-4" /> Last 7 Days
            </Button>
            <Button variant="outline" className="rounded-xl border-orange-200 text-orange-700">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Sales Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#ea580c" strokeWidth={3} dot={{ r: 4, fill: '#ea580c' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Production by Variant</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="qty" fill="#fb923c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Total Inventory Value</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">$12,450.00</h3>
              <p className="text-xs text-green-600 mt-2 font-medium">↑ 4.5% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Production Efficiency</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">94.2%</h3>
              <p className="text-xs text-green-600 mt-2 font-medium">↑ 1.2% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Waste Percentage</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">2.1%</h3>
              <p className="text-xs text-red-600 mt-2 font-medium">↓ 0.5% from last month</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;