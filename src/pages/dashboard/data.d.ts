import type { Layout } from 'react-grid-layout';
import { ResponseCode } from '@/utils/constants';

export type DashboardGroupDataType = {
  id: string;
  name: string;
  isDefault: boolean;
};

export enum RenderType {
  /** 折线图 */
  LINE = 'LINE',
  /** 曲线图 */
  CURVE = 'CURVE',
  /** 饼状图 */
  PIE = 'PIE',
  /** 柱状图 */
  BAR = 'BAR',
  /** 报表 */
  GRID = 'GRID',
  /** URL单图 */
  IFRAME = 'IFRAME',
  /** TODO: ? */
  EVENT_TABLE = 'EVENTTABLE',
}

export type seriesType = {
  name: string;
  data: number[];
};

export type DashboardDataType = {
  xAxis: string[];
  series: seriesType[];
};

export type ChartEnvDataType = {
  renderType: RenderType;
};

export type DashboardType = {
  id: string;
  name: string;
  grid: Layout;
  status: ChartStatus | undefined;
  data: DashboardDataType | undefined;
  env: ChartEnvDataType;
};

export enum ChartStatus {
  Error = -1,
  Loading = 0,
  Success = 1,
  BigQuery = ResponseCode.BigQuery,
}

export enum PeriodType {
  LastDays7 = 'last_days_7',
  LastDays14 = 'last_days_14',
  LastDays30 = 'last_days_30',
  LastDays60 = 'last_days_60',
  LastDays90 = 'last_days_90',
  ThisMonth = 'this_month',
  LastMonth = 'last_month',
  LastDays180 = 'last_days_180',
  ThisYear = 'this_year',
}

export type ChartParams = {
  period: PeriodType;
};
