import DetailForm from "@/pages/App/Details/components/DetailForm";
import EditForm from "@/pages/App/Details/components/EditForm";
import { colorText } from "@/utils";
import { history, useModel, useParams } from "@@/exports";
import { CopyAll } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
  tabsClasses,
} from "@mui/material";
import $copy from "copy-to-clipboard";
import React, { useState } from "react";
import uuid from "react-uuid";
import ProFormSelectAppKey from "@/components/ProFormSelectAppKey";

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Page() {
  const { initialState } = useModel("@@initialState");
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [open, setOpen] =
    useState<
      Record<string, { open: boolean; data?: boxjs.sessions; val?: any }>
    >();

  const { fetchSave, fetchRunScript } = useModel("api");
  const tip = useModel("alert");
  const datas = initialState?.boxdata.datas;
  const sessions = initialState?.boxdata.sessions || [];

  const app = initialState?.apps.find((item) => item.id === id);

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

  const [tabValue, setTabValue] = React.useState(
    curSessionIndex > -1 ? curSessionIndex : 0
  );

  const handleChange = (newValue: number) => {
    setTabValue(newValue);
  };

  const curSessionApp = appSession[tabValue];

  const curAppValues: Record<string, any> = {};
  curSessionApp?.datas.forEach((item) => {
    curAppValues[item.key] = item.val;
  });
  const usercfgs = initialState?.boxdata.usercfgs;
  const sessionIndex = sessions?.findIndex(
    (item) => item?.id === curSessionApp?.id
  );

  if (!app) return `No find App`;

  return (
    <Stack spacing={1} p={1}>
      <EditForm
        data={open?.update?.data}
        open={open?.update?.open}
        value={open?.update?.val}
        sessionIndex={sessionIndex}
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
            history.push("/code", { url });
          }}
        >
          {app.name}
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
      {app.descs_html?.length && (
        <Paper key={"html"} sx={{ padding: 2, mb: 2 }} elevation={3}>
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
        </Paper>
      )}

      {app.scripts?.length && (
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
                        sx={{ mr: -3.5, position: "relative" }}
                        aria-label={item.name}
                        onClick={() => {
                          fetchRunScript.run({
                            url: item.script,
                            isRemote: true,
                          });
                        }}
                      >
                        <PlayCircleFilledIcon />
                        {fetchRunScript.fetches[item.script]?.loading && (
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
                    }
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500 }}
                      component={"span"}
                      onClick={() => {
                        history.push("/code", { url: item.script });
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

      {app.settings?.length && (
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

      {app?.keys?.length !== 0 ? (
        <Paper key={"curSessionItem"} elevation={3} sx={{ mb: 2 }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              px: 2,
              py: 1,
            }}
          >
            <Stack direction={"row"} spacing={2}>
              <Typography>当前会话</Typography>
              {curSession.name ? (
                <Typography color={"primary"}>#{curSession.name}</Typography>
              ) : null}
            </Stack>
          </Box>
          <Box sx={{ p: 2 }}>
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
                                $copy(item.val);
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
          <Box
            p={1}
            sx={{
              borderTop: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
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
          </Box>
        </Paper>
      ) : (
        <></>
      )}

      {appSession?.length !== 0 && app?.keys?.length !== 0 ? (
        <Paper elevation={3}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              scrollButtons
              variant="scrollable"
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
              onChange={(_: any, value: any) => handleChange(value)}
            >
              {appSession?.map((item, index) => {
                return (
                  <Tab
                    key={item.id}
                    label={
                      <Stack
                        spacing={1}
                        direction={"row"}
                        alignItems={"center"}
                      >
                        {curSessionIndex === index ? (
                          <StarBorderIcon sx={{ width: 16, height: 16 }} />
                        ) : null}
                        <Typography>
                          {!isNoneSession ? `${index + 1} # ` : ""}
                          {item.name}
                        </Typography>
                      </Stack>
                    }
                    {...a11yProps(index)}
                  />
                );
              })}
            </Tabs>
          </Box>
          {appSession?.map((session, index) => {
            return (
              <TabPanel value={index} key={session.id} index={tabValue}>
                <List disablePadding>
                  {session?.datas.map((item) => {
                    return (
                      <ListItem sx={{ p: 0 }} key={item.key}>
                        <ListItemText
                          primary={`${item.key}`}
                          primaryTypographyProps={{
                            variant: "caption",
                            sx: { fontWeight: "bold" },
                          }}
                          secondary={
                            <Typography
                              color="grey"
                              variant="caption"
                              noWrap
                              component={"div"}
                            >
                              {(typeof item.val === "object"
                                ? JSON.stringify(item.val)
                                : item.val) || "无数据"}
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </TabPanel>
            );
          })}
          <Box p={1} sx={{ borderTop: 1, borderColor: "divider" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent="flex-end"
            >
              {!isNoneSession && (
                <>
                  <Button
                    color="error"
                    onClick={() => {
                      if (!initialState) return;

                      fetchSave
                        .run([
                          {
                            key: `@chavy_boxjs_sessions.${sessionIndex}`,
                            val: null,
                          },
                        ])
                        .then(() => {
                          setTabValue(0);
                        });
                    }}
                  >
                    删除
                  </Button>

                  <Button
                    color="warning"
                    onClick={() => {
                      setOpen({
                        update: {
                          open: true,
                          data: curSessionApp,
                          val: curAppValues,
                        },
                      });
                    }}
                  >
                    修改
                  </Button>

                  <Button
                    color="primary"
                    onClick={() => {
                      if (!initialState || !id) return;
                      fetchSave.run([
                        {
                          key: `chavy_boxjs_cur_sessions`,
                          val: JSON.stringify({
                            ...initialState?.boxdata.curSessions,
                            [id]: curSessionApp.id,
                          }),
                        },
                        ...curSessionApp.datas,
                      ]);
                    }}
                  >
                    应用
                  </Button>
                </>
              )}
              <Button
                color="success"
                onClick={() => {
                  $copy(JSON.stringify(curAppValues));
                  tip.alert({
                    open: true,
                    message: "复制成功",
                    type: "success",
                  });
                }}
              >
                复制
              </Button>
            </Stack>
          </Box>
        </Paper>
      ) : (
        <></>
      )}
    </Stack>
  );
}
