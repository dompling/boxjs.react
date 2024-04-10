import { request } from "@umijs/max";
import _ from "lodash";
import uuid from "react-uuid";

const responseCallback = (response: boxjs.data | string) => {
  if (typeof response === "string") {
    return {
      datas: {},
      usercfgs: {},
      sessions: [],
      curSessions: {},
      sysapps: [],
      syscfgs: {},
      appSubCaches: {},
      globalbaks: [],
    };
  }

  if (!response.sessions || !Array.isArray(response.sessions)) {
    response.sessions = [];
  }

  const ids: string[] = [];

  response.usercfgs.appsubs.forEach((item: boxjs.Appsub) => {
    if (response.appSubCaches[item.url]) {
      response.appSubCaches[item.url].apps.forEach((appItem: boxjs.App) => {
        ids.push(appItem.id);
      });
    }
  });

  const replyIds = _.filter(ids, (val, i, iteratee) =>
    _.includes(iteratee, val, i + 1)
  );

  response.usercfgs.appsubs.forEach((item: boxjs.Appsub) => {
    if (
      response.appSubCaches[item.url] &&
      response.appSubCaches[item.url].apps
    ) {
      response.appSubCaches[item.url].apps = response.appSubCaches[
        item.url
      ]?.apps.map((appItem: boxjs.App) => {
        if (replyIds.includes(appItem.id)) {
          return { ...appItem, id: `${appItem.author}_${appItem.id}` };
        }
        return { ...appItem, id: appItem.id };
      });
    }
  });
  return response;
};

export const getAllData = () => {
  return request<boxjs.data>("/query/boxdata").then((response) => {
    return responseCallback(response) as boxjs.data;
  });
};

export const getDataKey = (key: string) => {
  return request<{ key: string; val: any }>(`/query/data/${key}`);
};

// 保存用户偏好
export function saveUserCfgs(
  params: { key: string; val?: any } | { key: string; val?: any }[]
) {
  return request<boxjs.data>("/api/save", {
    method: "POST",
    data: params,
  }).then(responseCallback);
}

export function saveData(params: { key: string; val: any }) {
  return request<boxjs.data>("/api/saveData", {
    method: "POST",
    data: params,
  }).then(responseCallback);
}

export function reloadAppSub(params?: any) {
  return request<boxjs.data>("/api/reloadAppSub", {
    method: "POST",
    data: params,
  }).then(responseCallback);
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

export function surgeUrl(params: {
  url: string;
  method: "POST" | "GET";
  body?: any;
}) {
  return request("/api/surge", {
    method: "POST",
    data: params,
  });
}

/**************************************** Surge相关 ****************************************/
export function getScripts() {
  return surgeUrl({ url: `v1/scripting`, method: "GET" });
}

export function getModules() {
  return surgeUrl({ url: `v1/modules`, method: "GET" });
}

export function setModules(params: Record<string, boolean>) {
  return surgeUrl({
    url: `v1/scripting`,
    method: "POST",
    body: params,
  });
}
