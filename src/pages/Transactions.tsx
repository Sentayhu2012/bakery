"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Edit2, Trash2, Download } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    { id: 'TX-1001', type: 'Sale', item: 'Sourdough Loaf x24', amount: '$156.00', date: '2024-03-15 10:30 AM', status: 'Completed' },
    { id: 'TX-1002', type: 'Purchase', item: 'All-Purpose Flour 500kg', amount: '$750.00', date: '2024-03-15 09:15 AM', status: 'Received' },
    { id: 'TX-1003', type: 'Transfer', item: 'Dough Batch #102', amount: '36,000g', date: '2024-03-15 08:45 AM', status: 'Completed' },
    { id: 'TX-1004', type: 'Production', item: 'Bread Bake: 80g Loaf x200', amount: '16,000g Dough', date: '2024-03-15 07:30 AM', status: 'Completed' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Sale': return 'bg-green-50 text-green-700 border-green-100';
      case 'Purchase': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Transfer': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'Production': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 lg:pl-72">
      <Sidebar />
      <main className="max-w-[1600px] mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Global Transaction History</h1>
            <p className="text-gray-500">Unified view of all bakery operations and financial movements.</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
            <Download className="mr-2 h-4 w-4" /> Export History
          </Button>
        </div>

        <Card className="bg-white border-none shadow-sm overflow-hidden">
          <CardHeader className="border-b border-orange-50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search by ID, item, or type..." 
                  className="pl-10 rounded-xl border-orange-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="rounded-xl border-orange-200 text-orange-700">
                <Filter className="mr-2 h-4 w-4" /> Advanced Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-orange-50/50">
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Item / Description</TableHead>
                  <TableHead>Value / Qty</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-orange-50/20 transition-colors">
                    <TableCell className="font-mono text-xs font-bold">{tx.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(tx.type)}>
                        {tx.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{tx.item}</TableCell>
                    <TableCell className="font-bold text-orange-600">{tx.amount}</TableCell>
                    <TableCell className="text-gray-500 text-sm">{tx.date}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 border-none">{tx.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-orange-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600" onClick={() => showSuccess("Record deleted")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Transactions;