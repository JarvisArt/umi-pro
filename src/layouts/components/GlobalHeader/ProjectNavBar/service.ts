import request from '@/utils/request';

export async function queryApps(projectId: string) {
  return request.get(`/project/${projectId}/mart/list`);
}
