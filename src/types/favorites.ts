export interface FavoriteOrder {
  id?: number;
  userId: string;
  name: string;
  quantity: number;
  pricePerTiffin: number;
  mealType?: 'veg' | 'non-veg';
  specialInstructions?: string;
}