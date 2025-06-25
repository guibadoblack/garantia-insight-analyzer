
export interface WarrantyOrder {
  id: string;
  orderNumber: string;
  date: string;
  mechanicId: string;
  mechanicName: string;
  engineModel: string;
  defectGroup: string;
  defectSubgroup: string;
  defectSubsubgroup: string;
  cost: number;
  laborHours: number;
  partsCost: number;
  isRework: boolean;
  originalOrderId?: string;
}

export interface Mechanic {
  id: string;
  name: string;
  totalOrders: number;
  warrantyOrders: number;
  totalCost: number;
  reworkRate: number;
  averageCost: number;
}

export interface EngineModel {
  id: string;
  model: string;
  warrantyOrders: number;
  totalCost: number;
  averageCost: number;
  topDefects: string[];
}

export interface KPI {
  label: string;
  value: number | string;
  previousValue?: number | string;
  trend?: 'up' | 'down' | 'stable';
  format?: 'currency' | 'number' | 'percentage';
}

export interface DateRange {
  start: string;
  end: string;
}

export interface Filters {
  dateRange: DateRange;
  mechanicId?: string;
  engineModel?: string;
}
