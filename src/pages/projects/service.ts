import request from '@/utils/request';
import type { ProjectParams } from './data.d';

export async function queryProject() {
  return request.get('/project/list');
}

export async function addProject(params: ProjectParams) {
  return request.post('/project/apps', params);
}

export async function updateProject(id: string, params: ProjectParams) {
  return request.put(`/project/${id}/name`, params);
}

export async function removeProject(id: string) {
  return request.put(`project/${id}`);
}
