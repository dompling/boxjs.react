import { history, useModel } from "@@/exports";
import {
  Avatar,
  Box,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useUnmount } from "ahooks";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "hidden",
  background: "unset",
  boxShadow: "unset",
  borderRadius: 0,
}));

export default function Page() {
  const { initialState } = useModel("@@initialState");
  const { fetchRunScript } = useModel("api");
  const UI = initialState?.ui(initialState.boxdata);
  const favApp = initialState?.boxdata?.usercfgs.favapps
    .map((item) => {
      return initialState?.apps.find((app) => app.id === item);
    })
    .filter((item) => !!item);

  let timeoutCount: Record<string, any> = {};
  let timeout: Record<string, any> = {};

  useUnmount(() => {
    timeoutCount = {};
    timeout = {};
  });

  return (
    <Box pt={4}>
      <Grid container spacing={4}>
        {favApp?.map((item) => {
          UI?.loadAppBaseInfo(item);
          let script: any = null;
          if (item?.script) {
            script = item?.script;
          } else if (item?.scripts && item?.scripts[0].script) {
            script = item?.scripts[0].script;
          }
          return (
            <Grid
              item
              xs={3}
              md={2}
              key={`${item?.id}/${item?.author}/${item?.name}`}
            >
              <Item
                onClick={() => {
                  const timeKey = `${item?.id}/${item?.author}`;
                  if (timeoutCount[timeKey] === undefined)
                    timeoutCount[timeKey] = 0;
                  timeoutCount[timeKey] += 1;

                  timeout[timeKey] = setTimeout(() => {
                    if (timeout[timeKey] !== undefined)
                      clearTimeout(timeout[timeKey]);
                    console.log(timeoutCount[timeKey]);
                    if (timeoutCount[timeKey] === 2) {
                      timeoutCount[timeKey] = 0;

                      if (!script) return history.push(`/app/${timeKey}`);
                      fetchRunScript.run({ url: script, isRemote: true });
                    } else if (timeoutCount[timeKey] === 1) {
                      history.push(`/app/${timeKey}`);
                    }
                    timeoutCount = {};
                  }, 200);
                }}
              >
                <Stack
                  spacing={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: (theme) => theme.shadows[4],
                    }}
                  >
                    <Avatar
                      variant="square"
                      alt={item?.name}
                      src={item?.icon}
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    {fetchRunScript.fetches[script]?.loading && (
                      <LinearProgress
                        sx={{ position: "absolute", bottom: 0, width: "100%" }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 10,
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
                    {item?.name}
                  </Typography>
                </Stack>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
