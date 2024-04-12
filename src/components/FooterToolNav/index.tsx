import config from "@/utils/config";
import { history, useLocation, useModel } from "@@/exports";
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
import QueueAnim from "rc-queue-anim";
import React from "react";
import styles from "./index.less";

const FooterToolNav: React.FC = () => {
  const location = useLocation();

  const { initialState } = useModel("@@initialState");
  const { loading } = useModel("api");
  const boxdata = initialState?.boxdata;

  const bottomNav: Record<string, BottomNavigationActionProps> = {
    "/": {
      // label: '主页',
      value: "/",
      icon: <HomeIcon />,
    },
    "/app": {
      // label: '应用',
      value: "/app",
      icon: <WebAssetIcon />,
    },
    "/sub": {
      // label: '订阅',
      value: "/sub",
      icon: <StorageIcon />,
    },
    "/my": {
      // label: '我的',
      value: "/my",
      icon: (
        <Box sx={{ position: "relative" }}>
          <Avatar
            alt="boxJS"
            src={boxdata?.usercfgs.icon || config.logo}
            sx={{ width: 24, height: 24 }}
          />
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      ),
    },
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
              onChange={(_, key) => {
                history.push(key);
              }}
              sx={{
                "& .Mui-selected": {
                  "&:after": {
                    width: 0.3,
                  },
                },
              }}
            >
              {Object.keys(bottomNav).map((key) => (
                <BottomNavigationAction
                  key={key}
                  {...bottomNav[key]}
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
              ))}
            </BottomNavigation>
          </Paper>
        </Box>
      ) : null}
    </QueueAnim>
  );
};

export default FooterToolNav;
