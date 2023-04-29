import {
  addAppSub,
  getAllData,
  reloadAppSub,
  runScript,
  saveUserCfgs,
} from '@/services/boxjs.api';
import { useModel, useRequest } from '@@/exports';

export default function useAPI() {
  const { initialState, setInitialState } = useModel('@@initialState');
  const update = (response: boxjs.data) => {
    if (!initialState) return;

    let boxdata = initialState.boxdata;
    if (response.usercfgs) boxdata = response;
    setInitialState({ ...initialState, boxdata });
  };

  const fetchSave = useRequest(saveUserCfgs, {
    manual: true,
    formatResult: (res) => res,
    fetchKey: (params) =>
      JSON.stringify(params).indexOf('chavy_boxjs_cur_sessions') > -1
        ? 'chavy_boxjs_cur_sessions'
        : 'all',
    onSuccess: (response: boxjs.data) => {
      update(response);
    },
  });

  const fetchReloadAppSub = useRequest(reloadAppSub, {
    manual: true,
    formatResult: (res) => res,
    fetchKey: (params) => params?.id || 'all',
    onSuccess: (response: boxjs.data) => {
      update(response);
    },
  });

  const fetchAddAppSub = useRequest(addAppSub, {
    manual: true,
    formatResult: (res) => res,
    onSuccess: (response: boxjs.data) => {
      update(response);
    },
  });

  const fetchAllData = useRequest(getAllData, {
    manual: true,
    formatResult: (res) => res,
    onSuccess: (response: boxjs.data) => {
      update(response);
    },
  });

  const fetchRunScript = useRequest(runScript, {
    manual: true,
    formatResult: (res) => res,
    fetchKey: (url) => url,
    onSuccess: () => {
      fetchAllData.run();
    },
  });

  return {
    fetchSave,
    fetchAllData,
    fetchAddAppSub,
    fetchRunScript,
    fetchReloadAppSub,
    loading:
      fetchSave.loading ||
      fetchReloadAppSub.loading ||
      fetchAddAppSub.loading ||
      fetchRunScript.loading ||
      fetchAllData.loading,
  };
}
