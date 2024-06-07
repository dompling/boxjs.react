import config from "@/utils/config";
import { history, useLocation, useModel } from "@@/exports";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import HomeIcon from "@mui/icons-material/Home";
import StorageIcon from "@mui/icons-material/Storage";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";

import { BottomNavigationActionProps } from "@mui/material/BottomNavigationAction/BottomNavigationAction";
import lodash from "lodash";
import QueueAnim from "rc-queue-anim";
import React from "react";
import styles from "./index.less";

let taskLists: any[] = [];
const FooterToolNav: React.FC = () => {
  const location = useLocation();

  const { initialState } = useModel("@@initialState");
  const { loading, fetchSave } = useModel("api");
  const boxdata = initialState?.boxdata;
  const taskSubs: any = boxdata?.datas["@SET_TIME.CACHE"] || [];
  const fontSize = 30;

  const handelDoubleClick = () => {
    fetchSave.run([
      {
        key: config.userCfgs,
        val: JSON.stringify({
          ...initialState?.boxdata.usercfgs,
          isHideBoxIcon: !boxdata?.usercfgs.isHideBoxIcon,
        }),
      },
    ]);
  };

  const bottomNav: Record<string, BottomNavigationActionProps> = {
    "/home": {
      // label: '主页',
      value: "/home",
      icon: <HomeIcon sx={{ fontSize }} />,
    },
    ...(taskSubs.length
      ? {
          "/task": {
            value: "/task",
            icon: <AccessAlarmsIcon sx={{ fontSize }} />,
          },
        }
      : {}),
    "/app": {
      // label: '应用',
      value: "/app",
      icon: <WebAssetIcon sx={{ fontSize }} />,
    },
    "/sub": {
      // label: '订阅',
      value: "/sub",
      icon: <StorageIcon sx={{ fontSize }} />,
    },
    "/my": {
      // label: '我的',
      value: "/my",
      icon: (
        <Box sx={{ position: "relative" }}>
          <Avatar
            alt="boxJS"
            src={boxdata?.usercfgs.icon || config.logo}
            sx={{
              width: 34,
              height: 34,
              boxSizing: "border-box",
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            }}
          />
          {loading && (
            <CircularProgress
              size={35}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-17px",
                marginLeft: "-17px",
              }}
            />
          )}
        </Box>
      ),
    },
  };
  const handleClick = (nav: any) => {
    if (location.pathname === nav.value) return;
    if (nav.value === "/my" && initialState?.boxdata.usercfgs) {
      const taskItem = lodash.debounce(() => {
        history.push(nav.value);
        taskLists = [];
      }, 200);
      taskLists.push(taskItem);
      if (taskLists.length === 2) {
        lodash.map(taskLists, (task) => task.cancel());
        taskLists = [];
        return handelDoubleClick();
      }
      return taskItem();
    } else {
      history.push(nav.value);
    }
  };

  return (
    <QueueAnim
      type={["bottom", "bottom"]}
      appear={!!initialState?.boxdata.usercfgs.isAnimate}
    >
      {!initialState?.boxdata.usercfgs.isHidedNaviBottom ? (
        <Box
          className={
            !boxdata?.usercfgs.isTraditionalMenu
              ? styles.footer_container
              : styles.footer_container_tow
          }
        >
          <Paper
            key={"paper"}
            className={styles.footer_bar}
            sx={{
              borderRadius: 7,
              overflow: "hidden",
              boxShadow: (theme) => `0px 0 3px ${theme.palette.primary.main}`,
            }}
          >
            <BottomNavigation
              showLabels
              value={location.pathname}
              sx={{
                "& .Mui-selected": {
                  "&:after": {
                    width: 0.3,
                  },
                },
              }}
            >
              {Object.keys(bottomNav).map((key) => {
                const nav = bottomNav[key];
                return (
                  <BottomNavigationAction
                    key={key}
                    icon={nav.icon}
                    value={nav.value}
                    onTouchEnd={() => handleClick(nav)}
                    onClick={() => !initialState?.isMobile && handleClick(nav)}
                    sx={{
                      "&:after": {
                        content: `""`,
                        position: "absolute",
                        height: 2,
                        width: 0,
                        borderRadius: 1,
                        background: (theme) => theme.palette.primary.main,
                        top: 1,
                        transition: `width 0.3s linear`,
                        boxShadow: 1,
                      },
                    }}
                  />
                );
              })}
            </BottomNavigation>
          </Paper>
        </Box>
      ) : null}
    </QueueAnim>
  );
};

export default FooterToolNav;
