"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorClass?: string;
}

const StatCard = ({ title, value, icon: Icon, description, trend, colorClass }: StatCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-sm bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            {description && (
              <p className="text-xs text-gray-400 mt-1">{description}</p>
            )}
            {trend && (
              <p className={cn(
                "text-xs mt-2 font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? '↑' : '↓'} {trend.value} from last week
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-2xl", colorClass || "bg-orange-50 text-orange-600")}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;