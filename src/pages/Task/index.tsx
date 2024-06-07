import { Item } from "@/pages/Home";
import styles from "@/pages/Task/index.less";
import { history, useModel } from "@@/exports";
import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import QueueAnim from "rc-queue-anim";
import React, { Fragment } from "react";

const Task: React.FC = () => {
  const matches = useMediaQuery("(min-width:960px)");

  const { initialState } = useModel("@@initialState");
  const cache: any = initialState?.boxdata.datas["@SET_TIME.CACHE"];
  const tasks: any = initialState?.boxdata.datas["@SET_TIME.TASK"] || {};
  console.log(tasks);

  const dataSource: { title: string; children: any[] }[] = [];
  cache?.forEach((item: any) => {
    const data: { title: string; children: any[] } = {
      title: item.name,
      children: Object.values(item.task),
    };
    dataSource.push(data);
  });


  return (
    <QueueAnim
      interval={[100, 0]}
      appear={!!initialState?.boxdata.usercfgs.isAnimate}
    >
      <Stack sx={{ p: 1 }}>
        {dataSource.map((item, index) => {
          return (
            <Fragment key={`${item.title}-${index}`}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  color: initialState?.boxdata.usercfgs.bgimg
                    ? "#fff"
                    : "unset",
                  textShadow: initialState?.boxdata.usercfgs.bgimg
                    ? "black 0.1em 0.1em 0.2em"
                    : "unset",
                }}
              >
                {item.title}
              </Typography>
              <Divider
                sx={{
                  mt: 1,
                  mb: 1,
                  borderColor: (theme) => theme.palette.primary.main,
                }}
              />
              <Stack direction={"row"} flexWrap={"wrap"}>
                {item.children.map((child) => {
                  return (
                    <Item
                      key={child.url}
                      sx={{
                        flex: matches ? `0 0 ${100 / 6}%` : `0 0 25%`,
                        pt: 1,
                        pb: 1,
                      }}
                      onClick={() => {
                        return history.push(`/task/${item.title}_${child.tag}`);
                      }}
                    >
                      <Stack
                        spacing={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 3,
                            overflow: "hidden",
                            position: "relative",
                            boxShadow: (theme) => theme.shadows[5],
                          }}
                        >
                          <Avatar
                            variant="square"
                            alt={child?.tag}
                            className={styles.time}
                            src={child?.["img-url"]}
                            sx={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: 12,
                            maxWidth: 56,
                            color: initialState?.boxdata.usercfgs.bgimg
                              ? "#fff"
                              : "unset",
                            width: `100%`,
                            fontWeight: "bold",
                            textShadow: initialState?.boxdata.usercfgs.bgimg
                              ? "black 0.1em 0.1em 0.2em"
                              : "unset",
                          }}
                          noWrap
                        >
                          {child?.tag}
                        </Typography>
                      </Stack>
                    </Item>
                  );
                })}
              </Stack>
            </Fragment>
          );
        })}
      </Stack>
    </QueueAnim>
  );
};

export default Task;
