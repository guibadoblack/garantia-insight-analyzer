
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPI } from '@/types/warranty';

interface KPICardProps {
  kpi: KPI;
}

const formatValue = (value: number | string, format?: string): string => {
  if (typeof value === 'string') return value;
  
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    case 'percentage':
      return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value);
    case 'number':
    default:
      return new Intl.NumberFormat('pt-BR').format(value);
  }
};

const getTrendIcon = (trend?: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-4 h-4 text-red-500" />;
    case 'down':
      return <TrendingDown className="w-4 h-4 text-green-500" />;
    default:
      return <Minus className="w-4 h-4 text-gray-400" />;
  }
};

const getTrendColor = (trend?: string) => {
  switch (trend) {
    case 'up':
      return 'text-red-500';
    case 'down':
      return 'text-green-500';
    default:
      return 'text-gray-400';
  }
};

export const KPICard: React.FC<KPICardProps> = ({ kpi }) => {
  const { label, value, previousValue, trend, format } = kpi;
  
  const formattedValue = formatValue(value, format);
  const formattedPreviousValue = previousValue 
    ? formatValue(previousValue, format) 
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{label}</h3>
        {trend && getTrendIcon(trend)}
      </div>
      
      <div className="mb-2">
        <span className="text-2xl font-bold text-gray-900">
          {formattedValue}
        </span>
      </div>
      
      {formattedPreviousValue && (
        <div className="flex items-center text-sm">
          <span className="text-gray-500 mr-2">vs. período anterior:</span>
          <span className={getTrendColor(trend)}>
            {formattedPreviousValue}
          </span>
        </div>
      )}
    </div>
  );
};
