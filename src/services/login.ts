import request from 'umi-request';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function accountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
