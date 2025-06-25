
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { mockMechanics, mockWarrantyOrders } from '@/utils/mockData';
import { TrendingUp, TrendingDown, Award, AlertTriangle } from 'lucide-react';

const Mechanics: React.FC = () => {
  const [sortBy, setSortBy] = useState<'cost' | 'rework' | 'orders'>('cost');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleExport = () => {
    console.log('Exportando dados de mecânicos...');
  };

  const sortedMechanics = [...mockMechanics].sort((a, b) => {
    let valueA: number, valueB: number;
    
    switch (sortBy) {
      case 'cost':
        valueA = a.totalCost;
        valueB = b.totalCost;
        break;
      case 'rework':
        valueA = a.reworkRate;
        valueB = b.reworkRate;
        break;
      case 'orders':
        valueA = a.warrantyOrders;
        valueB = b.warrantyOrders;
        break;
      default:
        valueA = a.totalCost;
        valueB = b.totalCost;
    }
    
    return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  };

  const getReworkIcon = (rate: number) => {
    if (rate > 0.2) return <AlertTriangle className="w-5 h-5 text-red-500" />;
    if (rate < 0.15) return <Award className="w-5 h-5 text-green-500" />;
    return <TrendingUp className="w-5 h-5 text-yellow-500" />;
  };

  const getReworkColor = (rate: number) => {
    if (rate > 0.2) return 'text-red-600 bg-red-50';
    if (rate < 0.15) return 'text-green-600 bg-green-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="flex-1 bg-gray-50">
      <Header
        title="Análise de Mecânicos"
        subtitle="Ranking por custos de garantia e índices de retrabalho"
        onExport={handleExport}
      />
      
      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Mecânico com Maior Custo
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  Pedro Costa
                </p>
                <p className="text-green-600 text-sm mt-1">
                  R$ 18.200,00 em garantias
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
                  Maior Taxa de Retrabalho
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  João Silva
                </p>
                <p className="text-red-600 text-sm mt-1">
                  25% de retrabalho
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Melhor Performance
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  Maria Santos
                </p>
                <p className="text-green-600 text-sm mt-1">
                  12.5% de retrabalho
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Sorting Controls */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="cost">Custo Total</option>
                <option value="rework">Taxa de Retrabalho</option>
                <option value="orders">Número de Ordens</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="desc">Maior para Menor</option>
                <option value="asc">Menor para Maior</option>
              </select>
            </div>
          </div>

          {/* Mechanics Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mecânico
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    OS Totais
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    OS Garantia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Custo Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Custo Médio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taxa Retrabalho
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedMechanics.map((mechanic, index) => (
                  <tr key={mechanic.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-800">
                              {mechanic.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {mechanic.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {mechanic.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mechanic.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mechanic.warrantyOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(mechanic.totalCost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(mechanic.averageCost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getReworkColor(mechanic.reworkRate)}`}>
                        {formatPercentage(mechanic.reworkRate)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getReworkIcon(mechanic.reworkRate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mechanics;
