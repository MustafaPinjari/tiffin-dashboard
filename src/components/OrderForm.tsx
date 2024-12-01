import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Minus } from 'lucide-react';
import { useOrderStore } from '../store/useOrderStore';

const DEFAULT_PRICE = 60;

export function OrderForm() {
  const addOrder = useOrderStore((state) => state.addOrder);
  const [quantity, setQuantity] = useState(1);
  const [pricePerTiffin, setPricePerTiffin] = useState(DEFAULT_PRICE);
  const [mealType, setMealType] = useState<'veg' | 'non-veg'>('veg');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder({
      quantity,
      pricePerTiffin,
      totalAmount: quantity * pricePerTiffin,
      mealType,
      specialInstructions,
      status: 'pending'
    });
    setQuantity(1);
    setPricePerTiffin(DEFAULT_PRICE);
    setSpecialInstructions('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">New Tiffin Order</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="text"
            value={format(new Date(), 'PPP')}
            disabled
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Tiffins
          </label>
          <div className="mt-1 flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="block w-20 text-center px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price per Tiffin (₹)
          </label>
          <input
            type="number"
            value={pricePerTiffin}
            onChange={(e) => setPricePerTiffin(Math.max(0, parseInt(e.target.value) || 0))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Meal Type</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value as 'veg' | 'non-veg')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Instructions
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Amount (₹)
          </label>
          <input
            type="text"
            value={quantity * pricePerTiffin}
            disabled
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Order
        </button>
      </div>
    </form>
  );
}