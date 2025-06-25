
import { WarrantyOrder, Mechanic, EngineModel, KPI } from '@/types/warranty';

export const mockWarrantyOrders: WarrantyOrder[] = [
  {
    id: '1',
    orderNumber: 'OS-2024-001',
    date: '2024-01-15',
    mechanicId: 'M001',
    mechanicName: 'João Silva',
    engineModel: 'Motor V8 4.0L',
    defectGroup: 'Sistema de Combustível',
    defectSubgroup: 'Injetores',
    defectSubsubgroup: 'Entupimento',
    cost: 1250.00,
    laborHours: 3.5,
    partsCost: 850.00,
    isRework: false,
  },
  {
    id: '2',
    orderNumber: 'OS-2024-002',
    date: '2024-01-20',
    mechanicId: 'M002',
    mechanicName: 'Maria Santos',
    engineModel: 'Motor V6 3.0L',
    defectGroup: 'Sistema Elétrico',
    defectSubgroup: 'Sensores',
    defectSubsubgroup: 'Falha de Comunicação',
    cost: 890.00,
    laborHours: 2.0,
    partsCost: 640.00,
    isRework: false,
  },
  {
    id: '3',
    orderNumber: 'OS-2024-003',
    date: '2024-02-05',
    mechanicId: 'M001',
    mechanicName: 'João Silva',
    engineModel: 'Motor V8 4.0L',
    defectGroup: 'Sistema de Combustível',
    defectSubgroup: 'Injetores',
    defectSubsubgroup: 'Entupimento',
    cost: 1100.00,
    laborHours: 4.0,
    partsCost: 700.00,
    isRework: true,
    originalOrderId: '1',
  },
];

export const mockMechanics: Mechanic[] = [
  {
    id: 'M001',
    name: 'João Silva',
    totalOrders: 45,
    warrantyOrders: 12,
    totalCost: 15750.00,
    reworkRate: 0.25,
    averageCost: 1312.50,
  },
  {
    id: 'M002',
    name: 'Maria Santos',
    totalOrders: 38,
    warrantyOrders: 8,
    totalCost: 9840.00,
    reworkRate: 0.125,
    averageCost: 1230.00,
  },
  {
    id: 'M003',
    name: 'Pedro Costa',
    totalOrders: 52,
    warrantyOrders: 15,
    totalCost: 18200.00,
    reworkRate: 0.20,
    averageCost: 1213.33,
  },
];

export const mockEngineModels: EngineModel[] = [
  {
    id: 'E001',
    model: 'Motor V8 4.0L',
    warrantyOrders: 25,
    totalCost: 31250.00,
    averageCost: 1250.00,
    topDefects: ['Injetores', 'Bomba de Combustível', 'Sensores'],
  },
  {
    id: 'E002',
    model: 'Motor V6 3.0L',
    warrantyOrders: 18,
    totalCost: 22680.00,
    averageCost: 1260.00,
    topDefects: ['Sensores', 'Bobinas', 'Válvulas'],
  },
  {
    id: 'E003',
    model: 'Motor I4 2.0L Turbo',
    warrantyOrders: 32,
    totalCost: 35840.00,
    averageCost: 1120.00,
    topDefects: ['Turbocharger', 'Intercooler', 'Sensores'],
  },
];

export const mockKPIs: KPI[] = [
  {
    label: 'Custo Total de Garantias',
    value: 89770.00,
    previousValue: 76200.00,
    trend: 'up',
    format: 'currency',
  },
  {
    label: 'Ordens em Garantia',
    value: 75,
    previousValue: 68,
    trend: 'up',
    format: 'number',
  },
  {
    label: 'Taxa de Retrabalho',
    value: 0.187,
    previousValue: 0.152,
    trend: 'up',
    format: 'percentage',
  },
  {
    label: 'Custo Médio por OS',
    value: 1196.93,
    previousValue: 1120.59,
    trend: 'up',
    format: 'currency',
  },
];

export const mockTrendData = [
  { month: 'Jan', cost: 76200, orders: 68 },
  { month: 'Fev', cost: 89770, orders: 75 },
  { month: 'Mar', cost: 82340, orders: 71 },
  { month: 'Abr', cost: 95680, orders: 82 },
  { month: 'Mai', cost: 78920, orders: 69 },
  { month: 'Jun', cost: 91250, orders: 78 },
];
