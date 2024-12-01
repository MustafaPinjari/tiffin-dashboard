import React from 'react';
import { 
  BarChart, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  ShoppingBag 
} from 'lucide-react';
import { useOrderStore } from '../store/useOrderStore';
import { OrderStats } from '../components/OrderStats';
import { TrendChart } from '../components/TrendChart';
import { CalendarHeatmap } from '../components/CalendarHeatmap';
import { RecentOrders } from '../components/RecentOrders';

export default function Dashboard() {
  const orders = useOrderStore((state) => state.orders);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OrderStats 
          title="Total Orders"
          value={orders.length}
          icon={ShoppingBag}
          trend={+5.2}
        />
        <OrderStats 
          title="Monthly Orders"
          value={orders.filter(o => new Date(o.date).getMonth() === new Date().getMonth()).length}
          icon={Calendar}
          trend={-2.1}
        />
        <OrderStats 
          title="Average Order Value"
          value={orders.reduce((acc, curr) => acc + curr.totalAmount, 0) / orders.length || 0}
          icon={DollarSign}
          trend={+1.8}
          isCurrency
        />
        <OrderStats 
          title="Monthly Revenue"
          value={orders
            .filter(o => new Date(o.date).getMonth() === new Date().getMonth())
            .reduce((acc, curr) => acc + curr.totalAmount, 0)}
          icon={TrendingUp}
          trend={+12.5}
          isCurrency
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Trends</h2>
          <TrendChart orders={orders} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Distribution</h2>
          <CalendarHeatmap orders={orders} />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <RecentOrders orders={orders.slice(0, 5)} />
      </div>
    </div>
  );
}