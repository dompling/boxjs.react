import BoxJSActions from "@/components/BoxJSActions";
import FooterToolNav from "@/components/FooterToolNav";
import HeaderContent from "@/components/HeaderContent";
import OutPut from "@/components/OutPutLog";
import ToggleColorMode from "@/components/Theme";
import { Outlet, useLocation, useModel } from "@@/exports";
import { Alert, Box, Container, Slide, Snackbar } from "@mui/material";
import VConsole from "vconsole";

import config from "@/utils/config";
import { useEffect } from "react";
import styles from "./index.less";

let vConsole: any;

export default function Layout() {
  const location = useLocation();
  const tipState = useModel("alert");
  const log = useModel("log");
  const { initialState } = useModel("@@initialState");
  const { fetchRunScript, fetchSave } = useModel("api");

  const onClose = () => {
    tipState.alert({});
  };

  let bgimg = initialState?.boxdata?.usercfgs?.bgimg;
  const bgimgs = initialState?.boxdata?.usercfgs?.bgimgs
    ?.split(`\n`)
    ?.map((item) => {
      const [name = "", url = ""] = item?.split(",") || [];
      return { name, url };
    });

  if (bgimg === "跟随系统") {
    const hasdark = bgimgs?.find(
      (bgimg) => bgimg.name == "暗黑" || bgimg.name == "dark"
    );
    const haslight = bgimgs?.find(
      (bgimg) => bgimg.name == "明亮" || bgimg.name == "light"
    );
    const darkbgimg = hasdark ? hasdark.url : ``;
    const lightbgimg = haslight ? haslight.url : ``;

    initialState?.mode === "dark" ? (bgimg = darkbgimg) : (bgimg = lightbgimg);
  }

  useEffect(() => {
    document.oncontextmenu = function () {
      return false;
    };
    if (initialState?.boxdata?.usercfgs.isVConsole) {
      vConsole = new VConsole({ theme: initialState?.mode });
    } else if (!initialState?.boxdata?.usercfgs.isVConsole && vConsole) {
      vConsole?.destroy?.();
    }

    if (initialState?.boxdata.usercfgs.isWallpaperMode) {
      setTimeout(() => {
        fetchSave.run([
          {
            key: config.userCfgs,
            val: JSON.stringify({
              ...initialState?.boxdata.usercfgs,
              isWallpaperMode: false,
            }),
          },
        ]);
      }, 3000);
    }
  }, [
    initialState?.boxdata?.usercfgs.isVConsole,
    initialState?.boxdata.usercfgs.isWallpaperMode,
  ]);

  return (
    <ToggleColorMode>
      <Box
        className={
          initialState?.boxdata?.usercfgs.isWaitToggleSearchBar
            ? styles.container_top
            : styles.container
        }
      >
        {!["/my"].includes(location.pathname) && <HeaderContent />}
        <div
          draggable={false}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "transparent",
            backgroundImage: bgimg
              ? `linear-gradient(to bottom,rgba(0,0,0,.2) 0,transparent 76px), url(${bgimg}?_=${initialState?.random})`
              : undefined,
          }}
        />
        <Container
          fixed
          maxWidth={false}
          className={`${styles.content} ${
            styles[location.pathname.replace("/", "")]
          }`}
        >
          {!initialState?.boxdata.usercfgs.isWallpaperMode ? <Outlet /> : null}

          {tipState.options?.type ? (
            <Snackbar
              className={styles.alert}
              autoHideDuration={2000}
              key={tipState.options.key}
              onClose={() => onClose()}
              open={tipState.options?.open}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              TransitionComponent={(props) => (
                <Slide {...props} direction="down" />
              )}
            >
              <Alert
                sx={{ width: "100%" }}
                onClose={() => onClose()}
                severity={tipState.options?.type}
              >
                {tipState.options?.message}
              </Alert>
            </Snackbar>
          ) : (
            <Snackbar
              className={styles.alert}
              key={tipState.options.key}
              autoHideDuration={1000}
              onClose={() => onClose()}
              open={tipState.options?.open}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              TransitionComponent={(props) => (
                <Slide {...props} direction="down" />
              )}
              message={
                tipState.options?.type ? undefined : tipState.options?.message
              }
            />
          )}
        </Container>

        <FooterToolNav />
      </Box>
      {initialState?.boxdata?.usercfgs?.isHideBoxIcon !== true && (
        <BoxJSActions />
      )}

      <OutPut
        open={log.visible}
        value={fetchRunScript.data}
        onClose={() => log.setVisible(false)}
      />
    </ToggleColorMode>
  );
}
