import {
  addAppSub,
  getAllData,
  getDataKey,
  getModules,
  getScripts,
  reloadAppSub,
  runScript,
  saveData,
  saveUserCfgs,
  setModules,
} from "@/services/boxjs.api";
import { useModel, useRequest } from "@@/exports";

export default function useAPI() {
  const { initialState, setInitialState } = useModel("@@initialState");
  const log = useModel("log");
  const update = (response: boxjs.data) => {
    if (!initialState) return;

    let boxdata = initialState.boxdata;
    if (response.usercfgs) boxdata = response;

    let apps: boxjs.App[] = [...boxdata.sysapps];
    boxdata.usercfgs.appsubs.forEach((item) => {
      if (boxdata.appSubCaches[item.url]) {
        apps = [...apps, ...boxdata.appSubCaches[item.url].apps];
      }
    });

    setInitialState({ ...initialState, boxdata, apps });
  };

  const fetchSave = useRequest(saveUserCfgs, {
    manual: true,
    loadingDelay: 300,
    formatResult: (res) => res,
    fetchKey: (params) =>
      JSON.stringify(params).indexOf("chavy_boxjs_cur_sessions") > -1
        ? "chavy_boxjs_cur_sessions"
        : "all",
    onSuccess: (response: boxjs.data) => {
      update(response);
    },
  });

  const fetchReloadAppSub = useRequest(reloadAppSub, {
    manual: true,
    loadingDelay: 300,
    formatResult: (res) => res,
    fetchKey: (params) => params?.id || "all",
    onSuccess: (response: boxjs.data) => {
      update(response);
    },
  });

  const fetchAddAppSub = useRequest(addAppSub, {
    manual: true,
    loadingDelay: 300,
    formatResult: (res) => res,
    onSuccess: (response: boxjs.data) => {
      update(response);
    },
  });

  const fetchAllData = useRequest(getAllData, {
    loadingDelay: 300,
    focusTimespan: 1000,
    refreshOnWindowFocus: true,
    formatResult: (res) => res,
    onSuccess: (response: boxjs.data) => {
      update(response);
    },
  });

  const fetchRunScript = useRequest(runScript, {
    manual: true,
    loadingDelay: 300,
    formatResult: (res) => res,
    fetchKey: (params) => params.url,
    onSuccess: () => {
      log.setVisible(true);
      fetchAllData.run();
    },
  });

  const fetchDataKey = useRequest(getDataKey, {
    manual: true,
    loadingDelay: 300,
    formatResult: (res) => res,
    fetchKey: (key) => key,
  });

  const fetchSaveData = useRequest(saveData, {
    manual: true,
    loadingDelay: 300,
    formatResult: (res) => res,
    onSuccess: () => {
      fetchAllData.run();
    },
  });

  const fetchScripts = useRequest(getScripts, {
    manual: true,
    loadingDelay: 300,
    formatResult: (res) => res,
  });

  const fetchModules = useRequest(getModules, {
    manual: true,
    loadingDelay: 300,
    formatResult: (res) => res,
  });

  const fetchUpdateModules = useRequest(setModules, {
    loadingDelay: 300,
    manual: true,
  });

  return {
    fetchUpdateModules,
    fetchSaveData,
    fetchSave,
    fetchDataKey,
    fetchAllData,
    fetchAddAppSub,
    fetchRunScript,
    fetchReloadAppSub,
    fetchScripts,
    fetchModules,
    loading:
      fetchUpdateModules.loading ||
      fetchModules.loading ||
      fetchScripts.loading ||
      fetchSaveData.loading ||
      fetchDataKey.loading ||
      fetchSave.loading ||
      fetchReloadAppSub.loading ||
      fetchAddAppSub.loading ||
      fetchRunScript.loading ||
      fetchAllData.loading,
  };
}
