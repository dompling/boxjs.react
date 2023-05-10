import AddSubs from "@/pages/Sub/components/AddSub";
import { colorText, getCommentTime } from "@/utils";
import config from "@/utils/config";
import { useModel, useSearchParams } from "@@/exports";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
  colors,
  styled,
} from "@mui/material";
import $copy from "copy-to-clipboard";
import QueueAnim from "rc-queue-anim";
import { useEffect, useState } from "react";
import styles from "./index.less";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    bottom: "30%",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "& .MuiBadge-colorSuccess": {
    color: colors.green[700],
    background: colors.green[700],
  },
  "& .MuiBadge-colorError": {
    color: colors.red[700],
    background: colors.red[700],
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1.4)",
      opacity: 0,
    },
  },
}));

const DotBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    color: "#fff",
  },
}));

export default function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState<boolean>(!!searchParams.get("add"));
  const { initialState } = useModel("@@initialState");
  const tip = useModel("alert");

  const { fetchReloadAppSub, fetchSave } = useModel("api");

  const boxdata = initialState?.boxdata;
  const appsubs = boxdata?.usercfgs.appsubs || [];
  const appSubCaches = boxdata?.appSubCaches || {};
  const usercfgs = initialState?.boxdata.usercfgs;

  useEffect(() => {
    setSearchParams({});
  }, []);

  return (
    <Box sx={{ paddingTop: 2 }}>
      <AddSubs open={open} onClose={() => setOpen(false)} />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5" sx={colorText(usercfgs?.bgimg)}>
          应用订阅
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <IconButton
            color="primary"
            component="label"
            onClick={() => {
              window.open(`https://docs.boxjs.app/awesome/subscriptions`);
            }}
          >
            <CloudCircleIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="label"
            onClick={() => {
              fetchReloadAppSub.run(undefined);
            }}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="label"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Stack>
      </Stack>
      <QueueAnim appear={!!initialState?.boxdata.usercfgs.isAnimate}>
        {appsubs.map((item, index) => {
          const appItem = { ...item, ...appSubCaches[item.url] } || {
            name: "匿名订阅",
            repo: item.url,
            apps: [],
          };

          return (
            <Box
              key={item.url}
              sx={{ marginBottom: 2, boxSizing: "border-box" }}
            >
              <Paper
                className={styles.dynamics}
                elevation={3}
                sx={{
                  width: 1,
                  minHeight: 20,
                  borderRadius: 4,
                  padding: "20px 20px 12px 20px",
                  boxSizing: "border-box",
                }}
              >
                <Box>
                  <Stack direction="row" spacing={2}>
                    <StyledBadge
                      variant="dot"
                      overlap="circular"
                      color={appItem.id ? "success" : "error"}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      sx={{ position: "relative" }}
                    >
                      <Avatar
                        src={appItem.icon}
                        sx={{
                          border: "1px solid #e8e8e8",
                          width: 36,
                          height: 36,
                        }}
                      />
                      {(fetchReloadAppSub.fetches[appItem.id]?.loading ||
                        fetchReloadAppSub.fetches[`all`]?.loading) && (
                        <CircularProgress
                          size={40}
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-23px",
                            marginLeft: "-20px",
                          }}
                        />
                      )}
                    </StyledBadge>
                    <Stack sx={{ overflow: "hidden", flex: "1 1" }}>
                      <Stack>
                        <Typography variant="body2" gutterBottom>
                          {appItem.name}
                        </Typography>
                        <DotBadge
                          color="primary"
                          badgeContent={appItem?.apps?.length}
                          sx={{ top: -15, right: 13 }}
                        />
                      </Stack>
                      <Typography
                        noWrap
                        variant="body2"
                        sx={{ color: colors.grey[500], fontSize: 12 }}
                      >
                        {appItem.repo}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>

                <Stack sx={{ marginTop: 1 }}>
                  <Stack direction="row" alignItems={"center"} spacing={1}>
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => {
                        $copy(item.url);
                        tip.alert({
                          open: true,
                          message: "复制成功",
                          type: "success",
                        });
                      }}
                    >
                      <CopyAllIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => {
                        $copy(appItem.repo);
                        tip.alert({
                          open: true,
                          message: "复制成功",
                          type: "success",
                        });
                        window.open(appItem.repo);
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => {
                        $copy(
                          `${window.location.href}?add=${encodeURIComponent(
                            item.url
                          )}`
                        );
                        tip.alert({
                          open: true,
                          message: "复制成功",
                          type: "success",
                        });
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      color="success"
                      component="label"
                      onClick={() => {
                        fetchReloadAppSub.run(appItem);
                      }}
                    >
                      <RefreshIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      component="label"
                      onClick={() => {
                        const appsubs = initialState?.boxdata.usercfgs.appsubs;
                        appsubs?.splice(index, 1);
                        if (initialState)
                          fetchSave.run([
                            {
                              key: config.userCfgs,
                              val: JSON.stringify({
                                ...initialState?.boxdata.usercfgs,
                                appsubs,
                              }),
                            },
                          ]);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                    <Typography
                      noWrap
                      gutterBottom
                      variant="overline"
                      sx={{
                        color: colors.grey[500],
                        marginLeft: "auto !important",
                      }}
                    >
                      {getCommentTime(appItem.updateTime)}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          );
        })}
      </QueueAnim>
    </Box>
  );
}
