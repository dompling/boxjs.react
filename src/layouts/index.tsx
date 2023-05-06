import BoxJSActions from "@/components/BoxJSActions";
import FooterToolNav from "@/components/FooterToolNav";
import HeaderContent from "@/components/HeaderContent";
import OutPut from "@/components/OutPutLog";
import ToggleColorMode from "@/components/Theme";
import { Outlet, useLocation, useModel } from "@@/exports";
import { Alert, Box, Container, Slide, Snackbar } from "@mui/material";
import VConsole from "vconsole";

import { useEffect } from "react";
import styles from "./index.less";

export default function Layout() {
  const location = useLocation();
  const tipState = useModel("alert");
  const log = useModel("log");
  const { initialState } = useModel("@@initialState");
  const { fetchRunScript } = useModel("api");

  const onClose = () => {
    tipState.alert({});
  };

  const bgimg = initialState?.boxdata.usercfgs.bgimg;

  useEffect(() => {
    let vConsole: any;
    if (initialState?.boxdata?.usercfgs.isVConsole) {
      vConsole = new VConsole({ theme: initialState?.mode });
    } else if (vConsole) {
      vConsole?.destroy?.();
    }
  }, [initialState?.boxdata?.usercfgs.isVConsole]);

  return (
    <ToggleColorMode>
      <OutPut
        open={log.visible}
        value={fetchRunScript.data}
        onClose={() => log.setVisible(false)}
      />

      <Box className={styles.container}>
        {!["/my"].includes(location.pathname) && <HeaderContent />}
        <BoxJSActions />
        <div
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
            backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,.2) 0,transparent 76px), url(${bgimg}?_=${initialState?.random})`,
          }}
        />
        <Container
          fixed
          maxWidth={false}
          className={`${styles.content} ${
            styles[location.pathname.replace("/", "")]
          }`}
        >
          <Outlet />
          {tipState.options?.type ? (
            <Snackbar
              className={styles.alert}
              // autoHideDuration={3000}
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
    </ToggleColorMode>
  );
}
