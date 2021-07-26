import request from '@/utils/request';
import type { ProjectParams } from './data.d';

export async function queryProject() {
  return request.get('/project/list');
}

export async function addProject(params: ProjectParams) {
  return request.post('/project/apps', params);
}

export async function updateProject(projectId: string, params: ProjectParams) {
  return request.put(`/project/${projectId}/name`, params);
}

export async function removeProject(projectId: string) {
  return request.put(`project/${projectId}`);
}
