import Detail from "@/pages/App/Details/components/Detail";
import DetailForm from "@/pages/App/Details/components/DetailForm";
import EditForm from "@/pages/App/Details/components/EditForm";
import ModalImportForm from "@/pages/App/Details/components/ModalImportForm";
import { colorText } from "@/utils";
import { history, useModel, useParams } from "@@/exports";
import { CopyAll } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import {
  AccordionActions,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  colors,
  styled,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import $copy from "copy-to-clipboard";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import QueueAnim from "rc-queue-anim";
import React, { useState } from "react";
import uuid from "react-uuid";

const CusBadge = styled(Badge)(({ theme }) => ({
  right: "unset",
  "& .MuiBadge-badge": {
    transform: "scale(1) translate(2px, -50%)",
    color: theme.palette.common.white,
  },
}));

const CusTypography = styled(Typography)(({}) => ({
  right: "unset",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  "& h4,h1,h2,h3,p": {
    padding: 0,
    margin: 0,
  },
}));

export default function Page() {
  const { initialState } = useModel("@@initialState");
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [open, setOpen] =
    useState<
      Record<
        string,
        { open: boolean; data?: boxjs.sessions; val?: any; index?: number }
      >
    >();

  const { fetchSave, fetchRunScript } = useModel("api");
  const tip = useModel("alert");
  const datas = initialState?.boxdata.datas;
  const sessions = initialState?.boxdata.sessions || [];

  const app = initialState?.apps?.find((item) => item.id === id);

  const appSession = sessions?.filter((item) => item?.appId === `${id}`);

  let isNoneSession = false;

  let curSession: any = {
    id: uuid(),
    appId: id,
    enable: true,
    appName: app?.name,
    createTime: new Date(),
    datas: app?.keys.map((key) => ({ key, val: datas?.[key] })),
  };

  if (appSession && !appSession?.length && app?.keys && id)
    isNoneSession = true;

  const curSessionIndex =
    appSession?.findIndex(
      (item) => item?.id === initialState?.boxdata.curSessions[`${id}`]
    ) || 0;

  if (curSessionIndex > -1)
    curSession.name = appSession?.[curSessionIndex].name;

  const usercfgs = initialState?.boxdata.usercfgs;

  if (!app) return `No find App`;

  return (
    <QueueAnim interval={[100, 0]} appear={!!initialState?.boxdata.usercfgs.isAnimate}>
      <Stack key={"container"} spacing={1} p={1}>
        <ModalImportForm
          open={open?.import?.open}
          onClose={() => {
            setOpen((preSate) => {
              if (preSate) {
                preSate.import = { open: false };
                return { ...preSate };
              }
            });
          }}
        />
        <Detail
          open={open?.detail?.open}
          datas={open?.detail?.val}
          session={open?.detail?.data}
          onClose={() =>
            setOpen((preSate) => {
              if (preSate) {
                preSate.detail = { open: false };
                return { ...preSate };
              }
            })
          }
        />
        <EditForm
          data={open?.update?.data}
          open={open?.update?.open}
          value={open?.update?.val}
          sessionIndex={open?.update?.index}
          onClose={() =>
            setOpen((preSate) => {
              if (preSate) {
                preSate.update = { open: false };
                return { ...preSate };
              }
            })
          }
        />

        <Stack
          direction={"row"}
          justifyContent={app.script ? "space-between" : "flex-start"}
          alignItems={"center"}
        >
          <Typography
            variant="h6"
            p={2}
            component={"span"}
            sx={colorText(usercfgs?.bgimg)}
            onClick={() => {
              let url = app.script || app.scripts?.[0]?.script || "";
              if (!url) return;
              history.push(`/code?url=${url}`);
            }}
          >
            {app.name}
            {app.author ? `(${app.author})` : ""}
          </Typography>
          {app.script && (
            <Box sx={{ position: "relative" }}>
              <IconButton
                edge="end"
                aria-label={app.name}
                sx={{ mr: 0.5 }}
                onClick={() => {
                  if (!app.script) return;
                  fetchRunScript.run({ url: app.script, isRemote: true });
                }}
              >
                <PlayCircleFilledIcon color="primary" />
                {fetchRunScript.fetches[app.script]?.loading && (
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
              </IconButton>
            </Box>
          )}
        </Stack>
        {app.descs_html?.length > 0 && (
          <Paper>
            <Accordion>
              <AccordionSummary
                sx={{ m: 0 }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-content`}
                id={`panel-header`}
              >
                <Typography variant="body2">操作提示</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {app.descs_html.map((item, index) => {
                  return (
                    <CusTypography
                      color="grey"
                      display="block"
                      variant="caption"
                      sx={{ mb: 0 }}
                      key={`html-${index}`}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Paper>
        )}
        {app.scripts && app.scripts?.length > 0 && (
          <Paper key="scripts" sx={{ padding: 2, mb: 2 }} elevation={3}>
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="body2">应用脚本</Typography>
                <CusBadge
                  color="primary"
                  badgeContent={app.scripts?.length}
                  sx={{ color: (theme) => theme.palette.common.white }}
                />
              </Stack>
              <List disablePadding>
                {app.scripts.map((item, index) => {
                  return (
                    <ListItem
                      key={item.name}
                      sx={{ padding: 0, mb: 2 }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label={item.name}
                          onClick={() => {
                            if (fetchRunScript.loading) return;
                            fetchRunScript.run({
                              url: item.script,
                              isRemote: true,
                            });
                          }}
                        >
                          {fetchRunScript.loading ? (
                            <CircularProgress size={24} />
                          ) : (
                            <PlayCircleFilledIcon />
                          )}
                        </IconButton>
                      }
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500 }}
                        component={"span"}
                        onClick={() => {
                          history.push(`/code?url=${item.script}`);
                        }}
                      >
                        {`${index + 1}.${item.name}`}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </Stack>
          </Paper>
        )}
        {appSession?.length !== 0 && app?.keys?.length !== 0 && (
          <Paper>
            <Accordion>
              <AccordionSummary
                sx={{ m: 0 }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-2content`}
                id={`panel-2header`}
              >
                <Typography variant="body2">
                  会话切换（{appSession?.length}）
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ float: "left" }}>
                  {appSession.map((session, index) => {
                    return (
                      <PopupState
                        key={session.id}
                        variant="popover"
                        popupId="demo-popup-menu"
                      >
                        {(popupState) => (
                          <>
                            <Chip
                              sx={{
                                mr: 0.5,
                                mb: 1,
                                color: colors.common.white,
                                backgroundColor: `rgba(0, 0, 0, 0.2)`,
                              }}
                              avatar={
                                <Avatar
                                  sx={{
                                    color: `${colors.common.white} !important`,
                                    bgcolor: (theme) =>
                                      theme.palette.primary.main,
                                  }}
                                >
                                  {session.datas.length || 0}
                                </Avatar>
                              }
                              label={session.name}
                              {...bindTrigger(popupState)}
                            />
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem
                                onClick={() => {
                                  if (!initialState || !id) return;
                                  fetchSave.run([
                                    {
                                      key: `chavy_boxjs_cur_sessions`,
                                      val: JSON.stringify({
                                        ...initialState?.boxdata.curSessions,
                                        [id]: session.id,
                                      }),
                                    },
                                    ...session.datas,
                                  ]);
                                  popupState.close();
                                }}
                              >
                                应用
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  $copy(JSON.stringify(session.datas));
                                  tip.alert({
                                    open: true,
                                    message: "复制成功",
                                    type: "success",
                                  });
                                  popupState.close();
                                }}
                              >
                                复制
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  const sessionIndex = sessions?.findIndex(
                                    (item) => item?.id === session?.id
                                  );
                                  setOpen({
                                    update: {
                                      open: true,
                                      data: session,
                                      val: session.datas,
                                      index: sessionIndex,
                                    },
                                  });
                                  popupState.close();
                                }}
                              >
                                修改
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setOpen({
                                    detail: {
                                      open: true,
                                      data: session,
                                      val: session.datas,
                                      index,
                                    },
                                  });
                                  popupState.close();
                                }}
                              >
                                查看
                              </MenuItem>
                              <MenuItem
                                sx={{ color: colors.red[400] }}
                                onClick={() => {
                                  if (!initialState) return;
                                  const sessionIndex = sessions?.findIndex(
                                    (item) => item?.id === session?.id
                                  );
                                  fetchSave.run([
                                    {
                                      key: `@chavy_boxjs_sessions.${sessionIndex}`,
                                      val: null,
                                    },
                                  ]);
                                  popupState.close();
                                }}
                              >
                                删除
                              </MenuItem>
                            </Menu>
                          </>
                        )}
                      </PopupState>
                    );
                  })}
                </div>
              </AccordionDetails>
            </Accordion>
          </Paper>
        )}

        {app?.keys?.length !== 0 && (
          <Paper>
            <Accordion>
              <AccordionSummary
                sx={{ m: 0 }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-3content`}
                id={`panel-3header`}
              >
                <Typography variant="body2">
                  当前会话（{app?.keys?.length}）
                </Typography>
                {curSession.name ? (
                  <Typography color={"primary"}>#{curSession.name}</Typography>
                ) : null}
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    ...(Number(usercfgs?.app_settings_height || "0") > 0
                      ? {
                          maxHeight: `${usercfgs?.app_settings_height}px`,
                          overflow: "auto",
                        }
                      : {}),
                  }}
                >
                  <List disablePadding>
                    {curSession?.datas.map((item: any) => {
                      return (
                        <ListItem sx={{ p: 0 }} key={item.key}>
                          <ListItemText
                            primary={
                              <>
                                <span
                                  style={{
                                    maxWidth: "85%",
                                    display: "inline-block",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    height: "100%",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {item.key}
                                </span>
                                {item.val && (
                                  <IconButton
                                    onClick={() => {
                                      $copy(
                                        typeof item.val === "object"
                                          ? JSON.stringify(item.val)
                                          : item.val
                                      );
                                      tip.alert({
                                        open: true,
                                        message: "复制成功",
                                        type: "success",
                                      });
                                    }}
                                  >
                                    <CopyAll fontSize="small" />
                                  </IconButton>
                                )}
                              </>
                            }
                            primaryTypographyProps={{
                              noWrap: true,
                              variant: "caption",
                              sx: { fontWeight: "bold" },
                            }}
                            secondary={
                              <Typography
                                noWrap
                                color="grey"
                                variant="caption"
                                component={"div"}
                              >
                                {(typeof item.val === "object" && !!item.val
                                  ? JSON.stringify(item.val)
                                  : item.val) || "无数据"}
                              </Typography>
                            }
                          />

                          <IconButton
                            onClick={() => {
                              const datas = [...(curSession?.datas || [])];
                              const curIndex = datas.findIndex(
                                (cur: any) => cur.key === item.key
                              );

                              datas[curIndex].val = "";
                              fetchSave.run(datas);
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                <Button
                  color="primary"
                  onClick={() => {
                    if (!appSession) return;
                    $copy(JSON.stringify(curSession?.datas));
                    tip.alert({
                      open: true,
                      message: "复制成功",
                      type: "success",
                    });
                  }}
                >
                  复制
                </Button>
                <Button
                  color="warning"
                  onClick={() => {
                    setOpen({ ...open, import: { open: true } });
                  }}
                >
                  导入
                </Button>

                <Button
                  color="error"
                  onClick={() => {
                    if (!appSession) return;
                    let session = { ...curSession };

                    if (isNoneSession) {
                      session.name = `会话 1`;
                    } else {
                      session.name = `会话 ${appSession.length + 1}`;
                    }

                    session.id = uuid();
                    if (!initialState) return;
                    fetchSave.run([
                      {
                        key: `@chavy_boxjs_sessions.${sessions.length}`,
                        val: { ...session },
                      },
                    ]);
                  }}
                >
                  克隆
                </Button>
              </AccordionActions>
            </Accordion>
          </Paper>
        )}
        {app.settings && app.settings?.length > 0 && (
          <Paper key={"setting"} sx={{ mb: 2 }} elevation={3}>
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
                p={2}
              >
                <Typography variant="body2">应用设置</Typography>
                <CusBadge
                  color="primary"
                  badgeContent={app.settings?.length}
                  sx={{ color: (theme) => theme.palette.common.white }}
                />
              </Stack>
              {!fetchSave.fetches["chavy_boxjs_cur_sessions"]?.loading ? (
                <DetailForm formConfig={app.settings} />
              ) : null}
            </Stack>
          </Paper>
        )}
      </Stack>
    </QueueAnim>
  );
}
