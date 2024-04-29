import { IOSSwitch } from "@/components/IOSSwitch";
import { history, useModel } from "@@/exports";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useUnmount } from "ahooks";
import { useEffect } from "react";

export default function Actions() {
  const { fetchScripts, fetchUpdateModules, fetchModules, fetchRunScript } =
    useModel("api");

  let timeoutCount: Record<string, any> = {};
  let timeout: Record<string, any> = {};

  useUnmount(() => {
    timeoutCount = {};
    timeout = {};
  });

  useEffect(() => {
    fetchScripts.run();
    fetchModules.run();
  }, []);

  const category: Record<string, Surge.Script[]> = {};
  fetchScripts.data?.scripts?.forEach((item: any) => {
    if (!category[item.type]) category[item.type] = [];
    category[item.type].push(item);
  });

  return (
    <Stack spacing={3} m={1}>
      {fetchModules.data && (
        <Accordion key={"modules"} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <AccordionSummary
            id="modules"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`Modules-content`}
          >
            <Typography>Modules</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {fetchModules.data?.available?.map((item: any, index: number) => {
              return (
                <Paper
                  elevation={3}
                  component={"div"}
                  sx={{ mb: 2, p: 2, position: "relative" }}
                  key={`${item}-${index}`}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: 5,
                      opacity: 0.5,
                      borderRadius: 2,
                      background: (theme) =>
                        fetchModules.data?.enabled &&
                        fetchModules.data?.enabled?.indexOf?.(item) > -1
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                    }}
                  />
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Stack spacing={1}>
                      <Typography variant="body2">{item}</Typography>
                    </Stack>
                    <IOSSwitch
                      defaultChecked={
                        fetchModules.data?.enabled &&
                        fetchModules.data?.enabled?.indexOf?.(item) > -1
                      }
                      onChange={(_, checked) => {
                        fetchUpdateModules
                          .run({ [item]: checked })
                          .then(() => fetchModules.run());
                      }}
                    />
                  </Stack>
                </Paper>
              );
            })}
          </AccordionDetails>
        </Accordion>
      )}

      {Object.keys(category).map((key) => {
        const data = category[key];
        return (
          <Accordion key={key} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <AccordionSummary
              id={key}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${key}-content`}
            >
              <Typography>{key}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data.map((item, index) => {
                return (
                  <Paper
                    elevation={3}
                    sx={{
                      mb: 2,
                      p: 2,
                      position: "relative",
                      overflow: "hidden",
                    }}
                    key={`${item.type}-${item.name}-${index}`}
                    component={"div"}
                    onClick={() => {
                      if (item.type !== "cron") {
                        if (item.path.indexOf(`http`) > -1) {
                          window.open(item.path);
                        }
                        return;
                      }
                      const timeKey = `${item.path}`;
                      if (timeoutCount[timeKey] === undefined)
                        timeoutCount[timeKey] = 0;
                      timeoutCount[timeKey] += 1;

                      timeout[timeKey] = setTimeout(() => {
                        if (timeout[timeKey] !== undefined)
                          clearTimeout(timeout[timeKey]);
                        if (timeoutCount[timeKey] === 2) {
                          timeoutCount[timeKey] = 0;

                          (fetchRunScript as any).run({
                            url: item.path,
                            isRemote: item.path.indexOf("http") > -1,
                          });
                        } else if (timeoutCount[timeKey] === 1) {
                          if (item.path.indexOf(`http`) > -1) {
                            window.open(item.path);
                          }
                        }
                        timeoutCount = {};
                      }, 200);
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: 5,
                        opacity: 0.5,
                        borderRadius: 2,
                        background: (theme) =>
                          item.enabled
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                      }}
                    />
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Stack spacing={1}>
                        <Typography variant="body2">{item.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.type} {item.parameters.cronexp}
                        </Typography>
                      </Stack>
                      {item.type === "cron" && (
                        <Box
                          component={"span"}
                          onClick={() => {
                            history.push("/code", { url: item.path });
                          }}
                        >
                          <PlayCircleOutlineIcon />
                        </Box>
                      )}
                    </Stack>

                    {fetchRunScript.fetches[item.path]?.loading && (
                      <LinearProgress
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                        }}
                      />
                    )}
                  </Paper>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
}
