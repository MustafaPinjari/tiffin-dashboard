import { TiffinOrder } from '../../types/order';
import { UserPreferences } from '../../types/preferences';
import { FavoriteOrder } from '../../types/favorites';
import Dexie from 'dexie';

export class TiffinTrackerDB extends Dexie {
  orders!: Dexie.Table<TiffinOrder, number>;
  preferences!: Dexie.Table<UserPreferences, string>;
  favorites!: Dexie.Table<FavoriteOrder, number>;
  transactions!: Dexie.Table<{
    id?: number;
    type: 'create' | 'update' | 'delete';
    table: string;
    recordId: number | string;
    data: any;
    timestamp: Date;
  }, number>;

  constructor() {
    super('TiffinTrackerDB');
    
    this.version(1).stores({
      orders: '++id, userId, date, status, mealType',
      preferences: '&userId',
      favorites: '++id, userId, name',
      transactions: '++id, type, table, recordId, timestamp'
    });

    // Enable ACID transactions
    this.orders.hook('creating', (primKey, obj) => {
      obj.createdAt = new Date();
      obj.updatedAt = new Date();
      return obj;
    });

    this.orders.hook('updating', (modifications, primKey, obj) => {
      modifications.updatedAt = new Date();
      return modifications;
    });
  }

  async transaction<T>(
    fn: () => Promise<T>,
    mode: 'rw' | 'r' = 'rw'
  ): Promise<T> {
    return await this.transaction(mode, [
      this.orders,
      this.preferences,
      this.favorites,
      this.transactions
    ], async () => {
      try {
        return await fn();
      } catch (error) {
        console.error('Transaction failed:', error);
        throw error;
      }
    });
  }
}