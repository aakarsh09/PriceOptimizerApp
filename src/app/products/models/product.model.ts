export interface Product {
  product_id: number;
  name: string;
  description: string;
  cost_price: number;
  selling_price: number;
  category: string;
  stock_available: number;
  units_sold: number;
  customer_rating: number;
  demand_forecast: number;
  optimized_price: number;
}

export interface ColumnDef {
  field: string;
  headerName: string;
}

export interface ProductApiResponse {
  columns: ColumnDef[];
  rows: Product[];
}
