import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { ExportOptions } from '../components/ExportOptions';
import { useOrderStore } from '../store/useOrderStore';
import { OrderHistory } from '../components/OrderHistory';

export default function Reports() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const orders = useOrderStore((state) => state.orders);

  const filteredOrders = dateRange
    ? orders.filter(
        (order) =>
          order.date >= dateRange.from! && order.date <= dateRange.to!
      )
    : orders;

  const period = dateRange
    ? `${format(dateRange.from!, 'PP')} - ${format(dateRange.to!, 'PP')}`
    : 'All Time';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
        <ExportOptions period={period} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Select Date Range</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <input
            type="date"
            onChange={(e) =>
              setDateRange({
                from: new Date(e.target.value),
                to: dateRange?.to
              })
            }
            className="px-3 py-2 border rounded-md"
          />
          <input
            type="date"
            onChange={(e) =>
              setDateRange({
                from: dateRange?.from,
                to: new Date(e.target.value)
              })
            }
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <OrderHistory orders={filteredOrders} />
    </div>
  );
}