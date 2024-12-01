import React from 'react';
import { FileDown, FileSpreadsheet, FileText } from 'lucide-react';
import { exportToPDF } from '../lib/export/pdf';
import { exportToExcel } from '../lib/export/excel';
import { useOrderStore } from '../store/useOrderStore';

interface ExportOptionsProps {
  period: string;
}

export function ExportOptions({ period }: ExportOptionsProps) {
  const orders = useOrderStore((state) => state.orders);

  const handleExport = (format: 'pdf' | 'excel') => {
    switch (format) {
      case 'pdf':
        exportToPDF(orders, period);
        break;
      case 'excel':
        exportToExcel(orders, period);
        break;
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleExport('pdf')}
        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        <FileText className="w-4 h-4 mr-2" />
        Export PDF
      </button>
      <button
        onClick={() => handleExport('excel')}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        <FileSpreadsheet className="w-4 h-4 mr-2" />
        Export Excel
      </button>
    </div>
  );
}