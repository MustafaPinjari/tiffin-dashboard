export interface TiffinOrder {
  id?: number;
  userId: string;
  date: Date;
  quantity: number;
  pricePerTiffin: number;
  totalAmount: number;
  mealType?: 'veg' | 'non-veg';
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'delivered' | 'cancelled';
}