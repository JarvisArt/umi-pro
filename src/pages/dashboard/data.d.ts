import type { Layout } from 'react-grid-layout';

export type DashboardGroupDataType = {
  id: string;
  name: string;
  isDefault: boolean;
};

export type DashboardDataType = {
  id: string;
  name: string;
  grid: Layout;
};
