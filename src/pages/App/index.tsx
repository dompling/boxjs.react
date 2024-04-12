import config from "@/utils/config";
import { history, useModel } from "@@/exports";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  AccordionProps,
  AccordionSummaryProps,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import QueueAnim from "rc-queue-anim";
import React from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  padding: 0,
  paddingRight: 10,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, 0)",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ListItemTextDesc = styled(ListItemText)(() => ({
  "& .MuiListItemText-secondary": {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));

const CusListItem = styled(ListItem)(() => ({
  paddingLeft: 8,
}));

export default function Page() {
  const { expanded, handleExpandedChange } = useModel("app");
  const { initialState } = useModel("@@initialState");
  const apps = initialState?.apps || [];
  const { fetchSave } = useModel("api");
  const favApp: boxjs.App[] = [];
  const sysApp: boxjs.App[] = initialState?.boxdata.sysapps || [];

  let appSubs: boxjs.appSubCaches[] = [];

  initialState?.boxdata.usercfgs.appsubs.forEach((item) => {
    if (initialState?.boxdata.appSubCaches[item.url]) {
      const app = initialState?.boxdata.appSubCaches[item.url];
      appSubs.push(app);
    }
  });

  initialState?.boxdata.usercfgs.favapps.forEach((item) => {
    const fav = apps.find((app) => app.id === item);
    if (fav) favApp.push(fav);
  });

  appSubs = [
    ...(favApp.length
      ? [
          {
            id: "favApp.id",
            name: "收藏应用",
            description: "收藏应用",
            author: "",
            icon: (
              <FavoriteBorderIcon
                sx={{ color: (theme) => theme.palette.common.white }}
              />
            ) as any,
            repo: "",
            apps: favApp,
            task: [],
            updateTime: "",
          },
        ]
      : []),
    ...appSubs,
    {
      id: "sysApp.id",
      name: "系统应用",
      description: "系统应用",
      author: "",
      icon: (
        <SettingsSuggestIcon
          sx={{ color: (theme) => theme.palette.common.white }}
        />
      ) as any,
      repo: "",
      apps: sysApp,
      task: [],
      updateTime: "",
    },
  ];

  const UI = initialState?.ui?.(initialState?.boxdata);

  // const scrollToId = (id: string) => {
  //   const dom = document.getElementById(id);
  //   if (dom) {
  //     dom.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }
  // };
  //
  // useEffect(() => {
  //   if (expanded) {
  //     setTimeout(() => scrollToId(expanded), 1000);
  //   }
  // }, []);

  return (
    <QueueAnim
      style={{ marginTop: 16 }}
      appear={!!initialState?.boxdata.usercfgs.isAnimate}
    >
      {appSubs.map((item) => {
        return (
          <Paper
            key={item.id}
            elevation={3}
            sx={{
              mb: 2,
              overflow: "hidden",
              borderRadius: (theme) => theme.spacing(2),
            }}
          >
            <Accordion
              expanded={expanded.indexOf(item.id) !== -1}
              onChange={handleExpandedChange(item.id)}
              sx={{
                borderRadius: (theme) => theme.spacing(2),
                overflow: "hidden",
              }}
            >
              <AccordionSummary aria-controls={item.id} id={item.id}>
                <Stack
                  spacing={2}
                  direction={"row"}
                  justifyContent={`center`}
                  alignItems={"center"}
                >
                  {typeof item.icon === "string" ? (
                    <Avatar
                      id={item.id}
                      src={item.icon}
                      sx={{
                        boxShadow: (theme) => theme.shadows[1],
                      }}
                    />
                  ) : (
                    <Avatar
                      id={item.id}
                      sx={{
                        boxShadow: (theme) => theme.shadows[1],
                        bgcolor: (theme) => theme.palette.primary.main,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                  )}
                  <Typography>
                    {item.name}（{item.apps.length}）
                  </Typography>
                </Stack>
              </AccordionSummary>

              <AccordionDetails
                sx={{ padding: 0, maxHeight: 300, overflowY: "auto" }}
              >
                <QueueAnim type={["top", "bottom"]} leaveReverse>
                  <List
                    key={"app_list"}
                    sx={{ padding: 0, bgcolor: "background.paper" }}
                  >
                    {item.apps.map((app, index) => {
                      const isFav = favApp.find((fav) => fav.id === app.id);
                      UI?.loadAppBaseInfo(app);
                      if (expanded.indexOf(item.id) === -1) return null;
                      return (
                        <React.Fragment key={`${app.id}-${index}`}>
                          <CusListItem
                            key={`${app.id}-${index}`}
                            secondaryAction={
                              !isFav ? (
                                <IconButton
                                  edge="end"
                                  aria-label="fav"
                                  sx={{ padding: 0, paddingRight: `2px` }}
                                  onClick={() => {
                                    const isRun =
                                      initialState?.boxdata.usercfgs.favapps.find(
                                        (item) => item === app.id
                                      );
                                    if (isRun) return;
                                    const usercfgs =
                                      initialState?.boxdata.usercfgs;
                                    usercfgs?.favapps?.push(app.id);
                                    fetchSave.run({
                                      key: config.userCfgs,
                                      val: JSON.stringify({ ...usercfgs }),
                                    });
                                  }}
                                >
                                  <StarBorderIcon />
                                </IconButton>
                              ) : (
                                <IconButton
                                  edge="end"
                                  aria-label="cancelFav"
                                  sx={{ padding: 0, paddingRight: `2px` }}
                                  onClick={() => {
                                    const isRun =
                                      initialState?.boxdata.usercfgs.favapps.find(
                                        (item) => item === app.id
                                      );
                                    if (!isRun) return;
                                    const usercfgs =
                                      initialState?.boxdata.usercfgs;
                                    fetchSave.run({
                                      key: config.userCfgs,
                                      val: JSON.stringify({
                                        ...usercfgs,
                                        favapps: usercfgs?.favapps?.filter(
                                          (item) => item !== app.id
                                        ),
                                      }),
                                    });
                                  }}
                                >
                                  <StarIcon color="primary" />
                                </IconButton>
                              )
                            }
                          >
                            <ListItemButton
                              sx={{
                                padding: 0,
                                pr: "0 !important",
                              }}
                              onClick={() => {
                                history.push(`/app/${app.id}`);
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  alt={app.name[0]}
                                  src={app.icon}
                                  sx={{
                                    boxShadow: (theme) => theme.shadows[1],
                                  }}
                                />
                              </ListItemAvatar>
                              <ListItemTextDesc
                                primary={app.name}
                                secondary={app.repo}
                              />
                            </ListItemButton>
                          </CusListItem>
                        </React.Fragment>
                      );
                    })}
                  </List>
                </QueueAnim>
              </AccordionDetails>
            </Accordion>
          </Paper>
        );
      })}
    </QueueAnim>
  );
}
