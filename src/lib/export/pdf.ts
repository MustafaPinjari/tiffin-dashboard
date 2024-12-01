import { jsPDF } from 'jspdf';
import { TiffinOrder } from '../../types/order';
import { format } from 'date-fns';

export const exportToPDF = (orders: TiffinOrder[], period: string): void => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('Tiffin Order Summary', 20, 20);
  doc.setFontSize(12);
  doc.text(`Period: ${period}`, 20, 30);
  
  // Add table headers
  const headers = ['Date', 'Quantity', 'Price/Unit', 'Total'];
  let y = 40;
  
  doc.setFontSize(10);
  headers.forEach((header, i) => {
    doc.text(header, 20 + (i * 40), y);
  });
  
  // Add order data
  y += 10;
  orders.forEach((order) => {
    doc.text(format(order.date, 'PP'), 20, y);
    doc.text(order.quantity.toString(), 60, y);
    doc.text(order.pricePerTiffin.toString(), 100, y);
    doc.text(order.totalAmount.toString(), 140, y);
    y += 10;
  });
  
  // Add summary
  const totalTiffins = orders.reduce((sum, order) => sum + order.quantity, 0);
  const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  y += 10;
  doc.text(`Total Tiffins: ${totalTiffins}`, 20, y);
  doc.text(`Total Amount: ₹${totalAmount}`, 100, y);
  
  // Save the PDF
  doc.save(`tiffin-summary-${period}.pdf`);
};