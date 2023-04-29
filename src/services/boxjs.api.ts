import { request } from '@umijs/max';
import { uuid } from 'uuidv4';

export const getAllData = () => {
  return request<boxjs.data>('/query/boxdata').then((response: any) => {
    return (
      response === 'BoxJs'
        ? {
            datas: {},
            usercfgs: {},
            sessions: [],
            curSessions: {},
            sysapps: [],
            syscfgs: {},
            appSubCaches: {},
            globalbaks: [],
          }
        : response
    ) as boxjs.data;
  });
};

// 保存用户偏好
export function saveUserCfgs(
  params: { key: string; val?: any } | { key: string; val?: any }[],
) {
  return request<boxjs.data>('/api/save', { method: 'POST', data: params });
}

export function reloadAppSub(params?: any) {
  return request<boxjs.data>('/api/reloadAppSub', {
    method: 'POST',
    data: params,
  });
}

// 添加应用订阅
export function addAppSub(url: string) {
  const sub = { id: uuid(), url, enable: true };
  return request<boxjs.data>('/api/addAppSub', {
    method: 'POST',
    data: sub,
  });
}

export function runScript(url: string) {
  return request<{ output: string; result: any }>('/api/runScript', {
    method: 'POST',
    data: { isRemote: true, url },
  });
}
