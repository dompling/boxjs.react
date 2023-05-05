import { request } from "@umijs/max";
import { uuid } from "uuidv4";

export const getAllData = () => {
  return request<boxjs.data>("/query/boxdata").then((response: any) => {
    return (
      response === "BoxJs"
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

export const getDataKey = (key: string) => {
  return request<{ key: string; val: any }>(`/query/data/${key}`);
};

// 保存用户偏好
export function saveUserCfgs(
  params: { key: string; val?: any } | { key: string; val?: any }[]
) {
  return request<boxjs.data>("/api/save", { method: "POST", data: params });
}

export function saveData(params: { key: string; val: any }) {
  return request<boxjs.data>("/api/saveData", { method: "POST", data: params });
}

export function reloadAppSub(params?: any) {
  return request<boxjs.data>("/api/reloadAppSub", {
    method: "POST",
    data: params,
  });
}

// 添加应用订阅
export function addAppSub(url: string) {
  const sub = { id: uuid(), url, enable: true };
  return request<boxjs.data>("/api/addAppSub", {
    method: "POST",
    data: sub,
  });
}

export function runScript(params: any) {
  return request<{ output: string; result: any }>("/api/runScript", {
    method: "POST",
    data: params,
  });
}

/**************************************** Surge相关 ****************************************/
export function getScripts(url: string, key: string) {
  return request<Surge.Scripts>(`http://${url}/v1/scripting`, {
    method: "GET",
    headers: { "X-Key": key, Accept: "*/*" },
  });
}

export function getModules(url: string, key: string) {
  return request<Surge.Modules>(`http://${url}/v1/modules`, {
    method: "GET",
    headers: { "X-Key": key, Accept: "*/*" },
  });
}

export function setModules(
  url: string,
  key: string,
  params: Record<string, boolean>
) {
  return request<Surge.Modules>(`http://${url}/v1/modules`, {
    method: "POST",
    data: params,
    headers: { "X-Key": key, Accept: "*/*" },
  });
}
