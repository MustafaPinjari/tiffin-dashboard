import React from 'react';
import { OrderForm } from '../components/OrderForm';
import { OrderHistory } from '../components/OrderHistory';

export default function Orders() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      <OrderForm />
      <OrderHistory />
    </div>
  );
}