import * as XLSX from 'xlsx';
import { TiffinOrder } from '../../types/order';
import { format } from 'date-fns';

export const exportToExcel = (orders: TiffinOrder[], period: string): void => {
  const worksheet = XLSX.utils.json_to_sheet(
    orders.map(order => ({
      Date: format(order.date, 'PP'),
      Quantity: order.quantity,
      'Price per Tiffin': order.pricePerTiffin,
      'Total Amount': order.totalAmount,
      'Meal Type': order.mealType || 'N/A',
      Status: order.status,
      'Special Instructions': order.specialInstructions || 'N/A'
    }))
  );
  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
  
  // Save the file
  XLSX.writeFile(workbook, `tiffin-summary-${period}.xlsx`);
};