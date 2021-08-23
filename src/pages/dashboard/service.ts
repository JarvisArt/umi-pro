import request from '@/utils/request';
import type { ChartParams } from './data.d';

export async function queryDashboardGroup(projectId: string) {
  return request.get(`/visual/overview/${projectId}/dashboard/list`);
}

export async function queryDashboards(projectId: string, groupId: string) {
  return request.get(`/visual/overview/${projectId}/dashboard/${groupId}`);
}

export async function queryChartData(projectId: string, chartId: string, params: ChartParams) {
  return request.get(`/visual/overview/${projectId}/chart/${chartId}/data`, params);
}
