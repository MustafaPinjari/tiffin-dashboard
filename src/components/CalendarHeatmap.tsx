import React from 'react';
import { TiffinOrder } from '../types/order';
import { format, eachDayOfInterval, startOfMonth } from 'date-fns';

interface CalendarHeatmapProps {
  orders: TiffinOrder[];
}

export function CalendarHeatmap({ orders }: CalendarHeatmapProps) {
  const days = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: new Date()
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(day => {
        const dayOrders = orders.filter(order => 
          format(new Date(order.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
        );
        const intensity = Math.min(dayOrders.length * 25, 100);
        
        return (
          <div
            key={format(day, 'yyyy-MM-dd')}
            className="aspect-square rounded-md p-2 text-xs"
            style={{
              backgroundColor: `rgba(37, 99, 235, ${intensity}%)`,
              color: intensity > 50 ? 'white' : 'black'
            }}
          >
            <div className="font-medium">{format(day, 'd')}</div>
            <div>{dayOrders.length}</div>
          </div>
        );
      })}
    </div>
  );
}