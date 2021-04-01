import request from '@/utils/request';

export async function queryProject() {
  return request('/api/projects');
}
