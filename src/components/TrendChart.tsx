
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface TrendChartProps {
  data: Array<{
    month: string;
    cost: number;
    orders: number;
  }>;
  type?: 'line' | 'bar';
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const TrendChart: React.FC<TrendChartProps> = ({ 
  data, 
  type = 'line' 
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center text-sm">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700 mr-2">{entry.name}:</span>
              <span className="font-semibold">
                {entry.dataKey === 'cost' 
                  ? formatCurrency(entry.value)
                  : entry.value
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const Chart = type === 'line' ? LineChart : BarChart;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tendência de Custos e Ordens
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <Chart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            yAxisId="cost"
            orientation="left"
            stroke="#3b82f6"
            fontSize={12}
            tickFormatter={formatCurrency}
          />
          <YAxis 
            yAxisId="orders"
            orientation="right"
            stroke="#10b981"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {type === 'line' ? (
            <>
              <Line
                yAxisId="cost"
                type="monotone"
                dataKey="cost"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="Custo (R$)"
              />
              <Line
                yAxisId="orders"
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Ordens"
              />
            </>
          ) : (
            <>
              <Bar yAxisId="cost" dataKey="cost" fill="#3b82f6" name="Custo (R$)" />
              <Bar yAxisId="orders" dataKey="orders" fill="#10b981" name="Ordens" />
            </>
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};
