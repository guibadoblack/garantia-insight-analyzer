
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { mockEngineModels } from '@/utils/mockData';
import { TrendChart } from '@/components/TrendChart';
import { Wrench, AlertCircle, TrendingUp } from 'lucide-react';

const Engines: React.FC = () => {
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);

  const handleExport = () => {
    console.log('Exportando dados de motores...');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const engineTrendData = [
    { month: 'Jan', cost: 28500, orders: 22 },
    { month: 'Fev', cost: 31250, orders: 25 },
    { month: 'Mar', cost: 29800, orders: 24 },
    { month: 'Abr', cost: 33200, orders: 27 },
    { month: 'Mai', cost: 30750, orders: 25 },
    { month: 'Jun', cost: 32900, orders: 26 },
  ];

  return (
    <div className="flex-1 bg-gray-50">
      <Header
        title="Motores em Garantia"
        subtitle="Análise de modelos com maior incidência de garantias"
        onExport={handleExport}
      />
      
      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Motor com Mais Garantias
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  I4 2.0L Turbo
                </p>
                <p className="text-red-600 text-sm mt-1">
                  32 ordens de garantia
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Maior Custo Total
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  I4 2.0L Turbo
                </p>
                <p className="text-red-600 text-sm mt-1">
                  R$ 35.840,00
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Menor Custo Médio
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  I4 2.0L Turbo
                </p>
                <p className="text-green-600 text-sm mt-1">
                  R$ 1.120,00 por OS
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Wrench className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engine Models List */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Modelos de Motor - Ranking
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {mockEngineModels
                  .sort((a, b) => b.totalCost - a.totalCost)
                  .map((engine, index) => (
                    <div
                      key={engine.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedEngine === engine.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedEngine(engine.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-800">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {engine.model}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {engine.warrantyOrders} ordens de garantia
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(engine.totalCost)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatCurrency(engine.averageCost)} médio
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">
                          Principais defeitos:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {engine.topDefects.slice(0, 3).map((defect, defectIndex) => (
                            <span
                              key={defectIndex}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {defect}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Engine Trend Chart */}
          <div className="space-y-6">
            <TrendChart 
              data={engineTrendData} 
              type="line"
            />
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Distribuição de Defeitos por Categoria
              </h3>
              <div className="space-y-3">
                {[
                  { category: 'Sistema de Combustível', count: 35, percentage: 46.7 },
                  { category: 'Sistema Elétrico', count: 25, percentage: 33.3 },
                  { category: 'Sistema de Admissão', count: 10, percentage: 13.3 },
                  { category: 'Sistema de Arrefecimento', count: 5, percentage: 6.7 },
                ].map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {category.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {category.count} ({category.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engines;
