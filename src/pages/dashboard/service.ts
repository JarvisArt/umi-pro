import request from '@/utils/request';

export async function queryDashboardGroup(projectId: string) {
  return request.get(`/visual/overview/${projectId}/dashboard/list`);
}

export async function queryDashboards(projectId: string, groupId: string) {
  return request.get(`/visual/overview/${projectId}/dashboard/${groupId}`);
}
