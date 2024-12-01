import { useCallback } from 'react';
import { TiffinTrackerDB } from '../lib/database/schema';

const db = new TiffinTrackerDB();

export function useDatabase() {
  const executeTransaction = useCallback(async <T>(
    fn: () => Promise<T>,
    mode: 'rw' | 'r' = 'rw'
  ): Promise<T> => {
    return await db.transaction(fn, mode);
  }, []);

  const addTransaction = useCallback(async (
    type: 'create' | 'update' | 'delete',
    table: string,
    recordId: number | string,
    data: any
  ) => {
    await db.transactions.add({
      type,
      table,
      recordId,
      data,
      timestamp: new Date()
    });
  }, []);

  return {
    db,
    executeTransaction,
    addTransaction
  };
}