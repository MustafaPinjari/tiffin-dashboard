import { create } from 'zustand';
import { TiffinOrder } from '../types/order';

interface OrderState {
  orders: TiffinOrder[];
  addOrder: (order: Partial<TiffinOrder>) => void;
  deleteOrder: (id: number | undefined) => void;
  editOrder: (id: number | undefined, order: Partial<TiffinOrder>) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (order) =>
    set((state) => ({
      orders: [
        ...state.orders,
        {
          id: Date.now(),
          userId: 'default',
          date: new Date(),
          quantity: 1,
          pricePerTiffin: 60,
          totalAmount: 60,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
          ...order,
        },
      ],
    })),
  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),
  editOrder: (id, updatedOrder) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, ...updatedOrder, updatedAt: new Date() } : order
      ),
    })),
}));