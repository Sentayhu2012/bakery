"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  Package, 
  LayoutDashboard, 
  ChefHat, 
  ShoppingCart, 
  BarChart3, 
  Warehouse,
  Truck,
  Settings,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/warehouses', label: 'Warehouses', icon: Warehouse },
    { path: '/purchasing', label: 'Purchasing', icon: Truck },
    { path: '/production-dough', label: 'Dough Prep', icon: ChefHat },
    { path: '/production-bread', label: 'Bread Bake', icon: UtensilsCrossed },
    { path: '/inventory', label: 'Stock', icon: Package },
    { path: '/transfers', label: 'Transfers', icon: ArrowRightLeft },
    { path: '/pos', label: 'POS / Sales', icon: ShoppingCart },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 mr-8">
              <div className="bg-orange-500 p-2 rounded-lg">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-orange-900 tracking-tight hidden md:block">Crust & Crumb ERP</span>
            </Link>
            <div className="hidden xl:flex xl:space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive 
                        ? "bg-orange-50 text-orange-700" 
                        : "text-gray-500 hover:text-orange-600 hover:bg-orange-50/50"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-orange-600 uppercase">Production Manager</p>
              <p className="text-sm font-medium text-gray-900">John Doe</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-100 border-2 border-orange-200 flex items-center justify-center text-orange-700 font-bold">
              JD
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;