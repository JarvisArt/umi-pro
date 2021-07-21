import request from '@/utils/request';

export function queryCurrent(): Promise<any> {
  return request.get('/system/user/info');
}
