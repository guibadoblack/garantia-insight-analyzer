
import React from 'react';
import { Header } from '@/components/Header';
import { KPICard } from '@/components/KPICard';
import { TrendChart } from '@/components/TrendChart';
import { mockKPIs, mockTrendData } from '@/utils/mockData';

const Dashboard: React.FC = () => {
  const handleExport = () => {
    console.log('Exportando dados do dashboard...');
    // Implementar exportação
  };

  return (
    <div className="flex-1 bg-gray-50">
      <Header
        title="Dashboard de Garantias"
        subtitle="Visão geral dos custos e indicadores de garantia"
        onExport={handleExport}
      />
      
      <div className="p-6">
        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockKPIs.map((kpi, index) => (
            <KPICard key={index} kpi={kpi} />
          ))}
        </div>
        
        {/* Trend Chart */}
        <div className="mb-8">
          <TrendChart data={mockTrendData} type="line" />
        </div>
        
        {/* Additional Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top 5 Defeitos Mais Frequentes
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Injetores - Entupimento', count: 25, percentage: 33.3 },
                { name: 'Sensores - Falha de Comunicação', count: 18, percentage: 24.0 },
                { name: 'Turbocharger - Falha Mecânica', count: 15, percentage: 20.0 },
                { name: 'Bobinas - Falha Elétrica', count: 10, percentage: 13.3 },
                { name: 'Válvulas - Desgaste', count: 7, percentage: 9.3 },
              ].map((defect, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {defect.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {defect.count} ({defect.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${defect.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Distribuição por Modelo de Motor
            </h3>
            <TrendChart 
              data={[
                { month: 'V8 4.0L', cost: 31250, orders: 25 },
                { month: 'I4 2.0L Turbo', cost: 35840, orders: 32 },
                { month: 'V6 3.0L', cost: 22680, orders: 18 },
              ]} 
              type="bar" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
