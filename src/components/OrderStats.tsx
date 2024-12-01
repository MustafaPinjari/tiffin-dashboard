import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface OrderStatsProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: number;
  isCurrency?: boolean;
}

export function OrderStats({ title, value, icon: Icon, trend, isCurrency }: OrderStatsProps) {
  const formattedValue = isCurrency 
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
    : value.toLocaleString();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{formattedValue}</p>
        </div>
        <div className={cn(
          "p-3 rounded-full",
          "bg-blue-50"
        )}>
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={cn(
          "text-sm font-medium",
          trend > 0 ? "text-green-600" : "text-red-600"
        )}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
}