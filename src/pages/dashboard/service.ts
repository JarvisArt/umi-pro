import request from '@/utils/request';

export async function queryDashboardGroup(projectId: string) {
  return request.get(`/visual/overview/${projectId}/dashboard/list`);
}
