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
  /** 事件制表 */
  EVENT_TABLE = 'EVENTTABLE',
}

export enum ChartStatus {
  Error = -1,
  Loading = 0,
  Success = 1,
  BigQuery = ResponseCode.BigQuery,
}

export type ChartParams = {
  period: PeriodType;
};

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
  url?: string;
};

export type RetentionValue = {
  count: number;
  divisor: number;
};

export type RetentionDataType = {
  group: string;
  count: number;
  values: RetentionValue[];
};

export type DashboardType = {
  id: string;
  name: string;
  grid: Layout;
  env: ChartEnvDataType;
  fixedTime?: PeriodType;
  status?: ChartStatus;
  chartData?: DashboardDataType;
  intervalType?: RetainTimeUnit;
  displayPeriod?: number;
  retentions?: RetentionDataType[];
};

/**
 * TODO: intervalType
 * 留存的时间单位使用了大写,其他地方使用小写,不规范
 */
export enum RetainTimeUnit {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
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
