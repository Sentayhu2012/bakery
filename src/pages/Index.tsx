"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import { 
  TrendingUp, 
  Package, 
  AlertCircle, 
  ShoppingBag, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bakery Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening in your bakery today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Total Sales" 
            value="$1,284.50" 
            icon={TrendingUp}
            trend={{ value: "12%", isPositive: true }}
            colorClass="bg-green-50 text-green-600"
          />
          <StatCard 
            title="Raw Materials" 
            value="42 Items" 
            icon={Package}
            description="6 items below threshold"
            colorClass="bg-blue-50 text-blue-600"
          />
          <StatCard 
            title="Low Stock Alerts" 
            value="6" 
            icon={AlertCircle}
            description="Requires immediate attention"
            colorClass="bg-red-50 text-red-600"
          />
          <StatCard 
            title="Finished Goods" 
            value="184 Units" 
            icon={ShoppingBag}
            description="Across 12 categories"
            colorClass="bg-orange-50 text-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  { action: "Stock Updated", item: "Sourdough Loaf", time: "10 mins ago", type: "product" },
                  { action: "Low Stock Alert", item: "Unsalted Butter", time: "45 mins ago", type: "alert" },
                  { action: "New Batch Added", item: "Chocolate Muffins", time: "2 hours ago", type: "product" },
                  { action: "Material Received", item: "All-Purpose Flour", time: "4 hours ago", type: "inventory" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'alert' ? 'bg-red-50 text-red-600' : 
                      activity.type === 'product' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.item}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
                <p className="text-orange-100 text-sm mb-6">Common tasks for your daily operations.</p>
                <div className="space-y-3">
                  <Link to="/inventory">
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-none justify-between group mb-3">
                      Update Inventory <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-none justify-between group">
                      Log Daily Bakes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-10">
                <ShoppingBag size={120} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
              <h3 className="font-bold text-gray-900 mb-4">Production Status</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Morning Bakes</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[85%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Special Orders</span>
                    <span className="font-semibold">40%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[40%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;