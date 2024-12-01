import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TiffinOrder } from '../types/order';
import { format, startOfMonth, eachDayOfInterval } from 'date-fns';

interface TrendChartProps {
  orders: TiffinOrder[];
}

export function TrendChart({ orders }: TrendChartProps) {
  const data = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: new Date()
  }).map(date => {
    const dayOrders = orders.filter(order => 
      format(new Date(order.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    
    return {
      date: format(date, 'MMM dd'),
      orders: dayOrders.length,
      amount: dayOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="orders"
          stroke="#2563eb"
          name="Orders"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="amount"
          stroke="#16a34a"
          name="Amount"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}