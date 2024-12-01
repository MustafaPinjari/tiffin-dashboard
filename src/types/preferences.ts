export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: {
    code: string;
    symbol: string;
  };
  defaultPrice: number;
  notifications: {
    enabled: boolean;
    dailyReminder: boolean;
    reminderTime: string;
    monthlyReport: boolean;
  };
  orderFormLayout: {
    showSpecialInstructions: boolean;
    showMealType: boolean;
  };
}