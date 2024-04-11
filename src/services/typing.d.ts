declare namespace boxjs {
  type data = {
    appSubCaches: Record<string, appSubCaches>;
    curSessions: Record<string, string>;
    datas: Record<string, string | null>;
    sessions: sessions[];
    globalbaks: [];
    sysapps: App[];
    syscfgs: syscfgs;
    usercfgs: usercfgs;
  };

  export interface usercfgs {
    favapps: string[];
    appsubs: Appsub[];
    viewkeys: string[];
    isPinedSearchBar: boolean;
    httpapi: string;
    http_backend: string;
    theme: "light" | "dark" | "auto";
    isLeftBoxIcon: boolean;
    isHideRefresh: boolean;
    name: string;
    isDebugData: boolean;
    isDebugFormat: boolean;
    subapppanel: any[];
    favapppanel: any[];
    color_dark_primary: string;
    color_light_primary: string;
    isHideRefreshTip: boolean;
    isMute: boolean;
    isHideMyTitle: boolean;
    icon: string;
    isHideHelp: boolean;
    httpapis: string;
    httpapi_timeout: string;
    isTransparentIcons: boolean;
    isWallpaperMode: boolean;
    isHidedSearchBar: boolean;
    isDebugWeb: boolean;
    isHideCoding: boolean;
    isAutoSearchBar: boolean;
    isHidedNaviBottom: boolean;
    isAutoNaviBottom: boolean;
    isHideBoxIcon: boolean;
    bgimg: string;
    bgimgs: string;
    lang: string;
    changeBgImgEnterDefault: string;
    changeBgImgOutDefault: string;
    debugger_web: string;
    sysapppanel: number;
    gist_cache_key?: string[];
  }

  export interface Appsub {
    id?: string;
    url: string;
    enable: boolean;
    d?: string;
  }

  export interface syscfgs {
    env: string;
    version: string;
    versionType: string;
    envs: Env[];
    chavy: Chavy;
    senku: Senku;
    id77: Id77;
    orz3: Orz3;
    boxjs: Boxjs;
    defaultIcons: string[];
  }

  export interface Env {
    id: string;
    icons: string[];
  }

  export interface Chavy {
    id: string;
    icon: string;
    repo: string;
  }

  export interface Senku {
    id: string;
    icon: string;
    repo: string;
  }

  export interface Id77 {
    id: string;
    icon: string;
    repo: string;
  }

  export interface Orz3 {
    id: string;
    icon: string;
    repo: string;
  }

  export interface Boxjs {
    id: string;
    show: boolean;
    icon: string;
    icons: string[];
    repo: string;
  }

  export interface sessions {
    id: string;
    name: string;
    appId: string;
    appName: string;
    enable: boolean;
    createTime: string;
    datas: Datas[];
    usercfgs: usercfgs;
  }

  export interface usercfgs {
    isAnimate: boolean;
    isTraditionalMenu: boolean;
    favapps: string[];
    appsubs: Appsub[];
    viewkeys: string[];
    isPinedSearchBar: boolean;
    httpapi: string;
    http_backend: string;
    theme: string;
    isLeftBoxIcon: boolean;
    isHideRefresh: boolean;
    name: string;
    isDebugData: boolean;
    isDebugFormat: boolean;
    subapppanel: any[];
    favapppanel: any[];
    color_dark_primary: string;
    color_light_primary: string;
    isHideRefreshTip: boolean;
    isMute: boolean;
    isHideMyTitle: boolean;
    icon: string;
    isHideHelp: boolean;
    httpapis: string;
    httpapi_timeout: string;
    isTransparentIcons: boolean;
    isWallpaperMode: boolean;
    isHidedSearchBar: boolean;
    isDebugWeb: boolean;
    isHideCoding: boolean;
    isAutoSearchBar: boolean;
    isHidedNaviBottom: boolean;
    isAutoNaviBottom: boolean;
    isHideBoxIcon: boolean;
    bgimg: string;
    bgimgs: string;
    lang: string;
    changeBgImgEnterDefault: string;
    changeBgImgOutDefault: string;
    debugger_web: string;
    sysapppanel: number;

    [key: string]: any;
  }

  export interface Appsub {
    id?: string;
    url: string;
    enable: boolean;
    d?: string;
  }

  export interface Datas {
    key: string;
    val: any;
  }

  export interface appSubCaches {
    id: string;
    name: string;
    description: string;
    author: string;
    icon: string;
    repo: string;
    apps: App[];
    task: Task[];
    updateTime: string;
  }

  export interface App {
    id: string;
    _id: string;
    name: string;
    keys: string[];
    descs_html: string[];
    settings?: Setting[];
    scripts?: Script[];
    author: string;
    repo: string;
    icons: string[];
    script?: string;
    icon?: string;
  }

  export interface Setting {
    id: string;
    name: string;
    val: any;
    type:
      | "text"
      | "textarea"
      | "selects"
      | "boolean"
      | "radios"
      | "checkboxes"
      | "colorpicker"
      | "number"
      | "cacheKey";
    desc: string;
    disabled?: boolean;
    items?: Item[];
    placeholder?: string;
    autoGrow?: boolean;
    rows?: number;
    primary?: string[];
    child?: Setting[];
    pattern?: RegExp;
    formName: string;
  }

  export interface Item {
    key: string;
    label: string;
  }

  export interface Script {
    name: string;
    script: string;
  }

  export interface Task {
    config: string;
    addons?: string;
  }
}

declare namespace Surge {
  export interface Scripts {
    scripts: Script[];
  }

  export interface Script {
    path: string;
    enabled: boolean;
    name: string;
    type: string;
    parameters: Parameters;
  }

  export interface Parameters {
    pattern?: string;
    "requires-body"?: string;
    type: string;
    "script-path": string;
    timeout?: string;
    "max-size"?: string;
    "script-update-interval"?: string;
    "binary-body-mode"?: string;
    debug?: string;
    cronexp?: string;
    "wake-system"?: string;
  }

  export interface Modules {
    enabled: string[];
    available: string[];
  }
}
