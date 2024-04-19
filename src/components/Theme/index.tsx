import { ColorModeContext, getMediaMode } from "@/utils";
import { useModel } from "@@/exports";
import { CssBaseline, ThemeProvider, colors, createTheme } from "@mui/material";
import React from "react";

const ToggleColorMode: React.FC<{ children: React.ReactNode }> = (props) => {
  const { initialState, setInitialState } = useModel("@@initialState");
  const boxdata = initialState?.boxdata;
  const mode = initialState?.mode;

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: (type: "light" | "dark" | "auto") => {
        let mediaMode: "light" | "dark" = getMediaMode();
        const modeValue = type === "auto" ? mediaMode : type;
        if (initialState) setInitialState({ ...initialState, mode: modeValue });
      },
    }),
    [initialState]
  );

  const color_light_primary =
    boxdata?.usercfgs.color_light_primary || colors.red[500];
  const color_dark_primary =
    boxdata?.usercfgs.color_dark_primary || colors.grey[500];

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? color_light_primary : color_dark_primary,
            light: color_light_primary,
            dark: color_dark_primary,
          },
        },
      }),
    [mode, color_light_primary, color_dark_primary]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
