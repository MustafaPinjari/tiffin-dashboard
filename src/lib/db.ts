import Dexie, { type Table } from 'dexie';
import { TiffinOrder } from '../types/order';
import { UserPreferences } from '../types/preferences';
import { FavoriteOrder } from '../types/favorites';

export class TiffinTrackerDB extends Dexie {
  orders!: Table<TiffinOrder>;
  preferences!: Table<UserPreferences>;
  favorites!: Table<FavoriteOrder>;

  constructor() {
    super('TiffinTrackerDB');
    this.version(1).stores({
      orders: '++id, date, userId',
      preferences: '&userId',
      favorites: '++id, userId, name'
    });
  }
}

export const db = new TiffinTrackerDB();