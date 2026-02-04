"use client";

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Warehouse, Truck, ChefHat, UtensilsCrossed, 
  Package, ArrowRightLeft, ShoppingCart, BarChart3, Settings, 
  LogOut, Menu, BookOpen, History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/warehouses', label: 'Warehouses', icon: Warehouse },
    { path: '/purchasing', label: 'Purchasing', icon: Truck },
    { path: '/bom', label: 'BOM Management', icon: BookOpen },
    { path: '/production-dough', label: 'Dough Prep', icon: ChefHat },
    { path: '/production-bread', label: 'Bread Bake', icon: UtensilsCrossed },
    { path: '/inventory', label: 'Raw Materials', icon: Package },
    { path: '/products', label: 'Finished Goods', icon: Package },
    { path: '/transfers', label: 'Stock Transfers', icon: ArrowRightLeft },
    { path: '/pos', label: 'POS / Sales', icon: ShoppingCart },
    { path: '/transactions', label: 'Global History', icon: History },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-orange-100">
      <div className="p-6 border-b border-orange-50">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-orange-600 p-2 rounded-xl shadow-md shadow-orange-100">
            <UtensilsCrossed className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-orange-900 tracking-tight">Crust & Crumb</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-100" 
                  : "text-gray-500 hover:text-orange-600 hover:bg-orange-50"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-orange-50">
        <div className="flex items-center gap-3 px-4 py-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">Admin</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar - Persistent */}
      <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 z-50">
        <NavContent />
      </aside>

      {/* Mobile Header & Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-orange-100 flex items-center px-4 z-40">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-orange-600">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-none">
            <NavContent />
          </SheetContent>
        </Sheet>
        <div className="flex-1 flex justify-center">
          <span className="text-lg font-bold text-orange-900">Crust & Crumb</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;