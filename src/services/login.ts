import request from '@/utils/request';

export type LoginParamsType = {
  account: string;
  password: string;
};

export function accountLogin(params: LoginParamsType) {
  return request.post('/portal/login', params);
}

export function outLogin() {
  return request.post('/portal/logout');
}
