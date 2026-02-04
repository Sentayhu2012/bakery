"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Package, LayoutDashboard, ShoppingBasket, BookOpen, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/inventory', label: 'Raw Materials', icon: Package },
    { path: '/bom', label: 'BOM / Recipes', icon: BookOpen },
    { path: '/production', label: 'Production', icon: ChefHat },
    { path: '/products', label: 'Finished Goods', icon: ShoppingBasket },
  ];

  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-orange-900 tracking-tight">Crust & Crumb</span>
            </div>
            <div className="hidden lg:ml-8 lg:flex lg:space-x-2">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;