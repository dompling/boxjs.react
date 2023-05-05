import { IOSSwitch } from "@/components/IOSSwitch";
import ModalDebugForm from "@/pages/My/components/ModalDebugForm";
import ModalSettingForm from "@/pages/My/components/ModalSettingForm";

import ModalBackgroundForm from "@/pages/My/components/ModalBackgroundForm";
import ModalHttpApiForm from "@/pages/My/components/ModalHttpApiForm";
import ModalThemeForm from "@/pages/My/components/ModalThemeForm";
import config from "@/utils/config";
import { useModel } from "@@/exports";
import ApiIcon from "@mui/icons-material/Api";
import BorderBottomIcon from "@mui/icons-material/BorderBottom";
import BorderTopIcon from "@mui/icons-material/BorderTop";
import CodeIcon from "@mui/icons-material/Code";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Face5Icon from "@mui/icons-material/Face5";
import ImageIcon from "@mui/icons-material/Image";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LightModeIcon from "@mui/icons-material/LightMode";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  colors,
  useTheme,
} from "@mui/material";
import QueueAnim from "rc-queue-anim";
import { useState } from "react";
import styles from "./index.less";

export default function Page() {
  const { initialState } = useModel("@@initialState");
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const handleVisible = (key: string, val?: true) => {
    setVisible({ ...visible, [key]: !!val });
  };

  const apps = initialState?.apps || [];
  const usercfgs = initialState?.boxdata.usercfgs;
  const theme = useTheme();

  const { fetchSave } = useModel("api");

  const settings = [
    {
      label: "主题设置",
      data: [
        {
          id: "theme",
          type: "select",
          label: "外观设置",
          val: usercfgs?.theme,
          onClick: () => handleVisible(`theme`, true),
          icon:
            theme.palette.mode === "dark" ? (
              <DarkModeIcon sx={{ color: colors.teal[400] }} />
            ) : (
              <LightModeIcon sx={{ color: colors.teal[400] }} />
            ),
        },
        {
          label: "透明图标",
          type: "switch",
          id: "isTransparentIcons",
          icon: <WallpaperIcon sx={{ color: colors.teal[400] }} />,
        },
        {
          label: "壁纸模式",
          type: "switch",
          id: "isWallpaperMode",
          icon: <ImageIcon sx={{ color: colors.blue[400] }} />,
        },

        {
          label: "背景图片",
          type: "select",
          id: "bgimg",
          val: usercfgs?.bgimg,
          onClick: () => handleVisible(`bgimg`, true),
          icon: <PhotoCameraBackIcon sx={{ color: colors.blue[400] }} />,
        },
      ],
    },
    {
      label: "界面设置",
      data: [
        {
          label: "隐藏顶栏",
          type: "switch",
          id: "isWaitToggleSearchBar",
          icon: <BorderTopIcon sx={{ color: colors.green[400] }} />,
        },
        {
          label: "隐藏底栏",
          type: "switch",
          id: "isHidedNaviBottom",
          icon: <BorderBottomIcon sx={{ color: colors.lime[400] }} />,
        },
        // {
        //   label: '自动顶栏',
        //   type: 'switch',
        //   id: 'isAutoSearchBar',
        //   icon: (
        //     <AlignVerticalTopOutlinedIcon
        //       sx={{ color: colors.blueGrey[400] }}
        //     />
        //   ),
        // },
        // {
        //   type: 'switch',
        //   label: '自动底栏',
        //   id: 'isAutoNaviBottom',
        //   icon: <AlignVerticalBottomIcon sx={{ color: colors.purple[400] }} />,
        // },
      ],
    },

    {
      label: "悬浮按钮",
      data: [
        {
          label: "隐藏悬浮按钮",
          type: "switch",
          id: "isHideBoxIcon",
          icon: <Face5Icon sx={{ color: colors.brown[400] }} />,
        },
        {
          label: "隐藏帮助按钮",
          type: "switch",
          id: "isHideHelp",
          icon: <QuestionMarkIcon sx={{ color: colors.amber[400] }} />,
        },

        {
          type: "switch",
          label: "隐藏编码按钮",
          id: "isHideCoding",
          icon: <CodeIcon sx={{ color: colors.orange[400] }} />,
        },
        {
          type: "switch",
          label: "隐藏刷新按钮",
          id: "isHideRefresh",
          icon: <RefreshIcon sx={{ color: colors.red[400] }} />,
        },
      ],
    },
    {
      label: "其他设置",
      data: [
        ...(initialState?.boxdata.syscfgs.env === "Surge"
          ? [
              {
                type: "select",
                id: "httpapi",
                label: "HTTP-API (Surge)",
                onClick: () => handleVisible(`httpapi`, true),
                icon: <ApiIcon sx={{ color: colors.amber[400] }} />,
              },
            ]
          : []),
        {
          label: "勿扰模式",
          type: "switch",
          id: "isMute",
          icon: <VolumeOffIcon sx={{ color: colors.indigo[400] }} />,
        },
        // {
        //   type: "switch",
        //   label: "调试模式",
        //   id: "isDebugWeb",
        //   icon: <BugReportIcon sx={{ color: colors.pink[400] }} />,
        // },
        // {
        //   type: "select",
        //   label: "调试网址",
        //   id: "debugger_web",
        //   val: usercfgs?.debugger_web,
        //   onClick: () => handleVisible(`debugger_web`, true),
        //   icon: <LinkIcon sx={{ color: colors.teal[400] }} />,
        // },
      ],
    },
  ];

  const defaultCheck: string[] = [];
  settings.forEach((item) => {
    item.data.forEach((setting) => {
      if (
        initialState?.boxdata.usercfgs[setting.id] &&
        setting.type === "switch"
      )
        defaultCheck.push(setting.id);
    });
  });

  const [checked, setChecked] = useState<string[]>(defaultCheck);

  const handleToggle = (value: string) => (e: any) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    fetchSave.run([
      {
        key: config.userCfgs,
        val: JSON.stringify({
          ...initialState?.boxdata.usercfgs,
          [value]: e.target.checked,
        }),
      },
    ]);
  };

  return (
    <Box>
      <ModalThemeForm
        open={visible.theme}
        value={usercfgs?.theme}
        onClose={() => handleVisible(`theme`)}
      />

      <ModalDebugForm
        open={visible.debugger_web}
        value={usercfgs?.debugger_web}
        onClose={() => handleVisible(`debugger_web`)}
      />

      <ModalBackgroundForm
        open={visible.bgimg}
        value={usercfgs?.bgimg}
        onClose={() => handleVisible(`bgimg`)}
      />

      <ModalHttpApiForm
        open={visible.httpapi}
        value={usercfgs?.httpapi}
        onClose={() => handleVisible(`httpapi`)}
      />

      <ModalSettingForm
        open={visible.setting}
        onClose={() => handleVisible(`setting`)}
      />

      <Box
        p={4}
        className={styles.avatar}
        sx={{
          position: "relative",
          background: (theme) =>
            `${
              theme.palette.mode === "dark"
                ? "linear-gradient(to top, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0))"
                : "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))"
            }${
              usercfgs?.bgimg
                ? ","
                : `, url(${
                    usercfgs?.iconBg ||
                    usercfgs?.iconCusBg ||
                    `./static/background/3.png`
                  }) no-repeat center`
            } `,
          backgroundSize: "100% 100%",
        }}
      >
        <Stack spacing={1} justifyContent={"center"} alignItems={"center"}>
          <Avatar
            src={usercfgs?.icon}
            sx={{ width: 68, height: 68, border: `1px solid #e8e8e8` }}
          />
          <Typography
            variant="h6"
            display="block"
            gutterBottom
            sx={{ color: "#fff" }}
          >
            {usercfgs?.name}
          </Typography>
        </Stack>
        <Stack
          mt={2}
          direction={"row"}
          justifyContent={"space-around"}
          spacing={2}
        >
          <Chip
            sx={{ color: colors.common.white }}
            avatar={
              <Avatar
                sx={{
                  bgcolor: colors.red[400],
                  color: `${colors.common.white} !important`,
                }}
              >
                {usercfgs?.appsubs.length || 0}
              </Avatar>
            }
            label="订阅"
          />
          <Chip
            sx={{ color: colors.common.white }}
            avatar={
              <Avatar
                sx={{
                  bgcolor: colors.green[400],
                  color: `${colors.common.white} !important`,
                }}
              >
                {initialState?.boxdata.sessions.length || 0}
              </Avatar>
            }
            label="会话"
          />
          <Chip
            sx={{ color: colors.common.white }}
            avatar={
              <Avatar
                sx={{
                  bgcolor: colors.orange[400],
                  color: `${colors.common.white} !important`,
                }}
              >
                {apps.length || 0}
              </Avatar>
            }
            label="应用"
          />
        </Stack>
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => {
            handleVisible("setting", true);
          }}
        >
          <SettingsSuggestIcon color="primary" />
        </IconButton>
      </Box>
      <Box pl={2} pr={2} pt={2}>
        <Stack spacing={2}>
          {settings.map((setting, index) => {
            return (
              <QueueAnim key={`group-${index}`}>
                <Typography
                  variant="body2"
                  key={`title-${index}`}
                  color={colors.grey[500]}
                  sx={
                    usercfgs?.bgimg
                      ? {
                          textShadow: "black 0.1em 0.1em 0.2em",
                          color: (theme) => theme.palette.common.white,
                        }
                      : {}
                  }
                >
                  {setting.label}
                </Typography>
                <Paper sx={{ mt: 1, borderRadius: 2 }} key={`content-${index}`}>
                  <List>
                    {setting.data.map((item: any) => {
                      return (
                        <ListItem
                          key={item.id}
                          onClick={() => item.onClick?.()}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText id={item.id} primary={item.label} />
                          {item.type === "switch" && (
                            <IOSSwitch
                              edge="end"
                              onChange={handleToggle(item.id)}
                              checked={checked.indexOf(item.id) !== -1}
                              inputProps={{
                                "aria-labelledby": item.id,
                              }}
                            />
                          )}

                          {item.type !== "switch" && (
                            <ListItemIcon
                              sx={{
                                justifyContent: "flex-end",
                                alignItems: "center",
                                marginRight: -1.5,
                                maxWidth: 150,
                              }}
                            >
                              <Typography
                                noWrap
                                color={"grey"}
                                variant="caption"
                              >
                                {item.val}
                              </Typography>
                              <KeyboardArrowRightIcon />
                            </ListItemIcon>
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              </QueueAnim>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
