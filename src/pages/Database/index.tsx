import ProFormSelectAppKey from "@/components/ProFormSelectAppKey";
import config from "@/utils/config";
import { useModel } from "@@/exports";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  Box,
  Button,
  Chip,
  Divider,
  FormHelperText,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import $copy from "copy-to-clipboard";
import QueueAnim from "rc-queue-anim";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Database() {
  const form = useForm();
  const tip = useModel("alert");
  const [delType, setDelType] = useState<Record<string, "delKey" | "all">>({});
  const { expanded, handleExpandedChange } = useModel("app");
  const { fetchDataKey, fetchSave } = useModel("api");
  const { initialState } = useModel("@@initialState");
  const dataKeys = Object.keys(initialState?.boxdata.datas || {});
  const gistCacheData = initialState?.boxdata.usercfgs.gist_cache_key || [];
  const viewkeys = initialState?.boxdata.usercfgs.viewkeys || [];
  const accordion = [
    {
      data: gistCacheData,
      key: config.gistCacheKey,
      title: `非订阅数据（${gistCacheData.length}）`,
    },
    {
      key: config.viewkeys,
      title: `近期查看（${viewkeys.length}）`,
      data: viewkeys,
    },
  ];

  return (
    <QueueAnim interval={0} appear={!!initialState?.boxdata.usercfgs.isAnimate}>
      <Stack key={"container"} spacing={3} m={1}>
        {accordion.map((tab, index) => {
          if (!tab.data.length) return null;
          const delTypeItem = delType[tab.key];
          return (
            <Stack key={tab.title} direction="column" mt={2}>
              <Accordion
                onChange={handleExpandedChange(tab.key)}
                expanded={expanded.indexOf(tab.key) !== -1}
              >
                <AccordionSummary
                  sx={{ m: 0 }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography variant="body2">{tab.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {tab.data.map((item: string, index: number) => {
                      return (
                        <div key={`${item}_${index}`} style={{ padding: 3 }}>
                          <Chip
                            label={item}
                            variant="filled"
                            sx={{
                              maxWidth: 160,
                              "& span": { width: `100%` },
                              boxShadow: (theme) =>
                                `0px 0 1px ${theme.palette.primary.main}`,
                            }}
                            onDelete={() => {
                              const formData: any[] = [
                                {
                                  key: tab.key,
                                  val: tab.data.filter(
                                    (cache: string) => cache !== item
                                  ),
                                },
                              ];
                              if (delTypeItem === "all") {
                                formData.push({ key: tab.key, val: null });
                              }
                              fetchSave.run(formData);
                            }}
                            onClick={() => {
                              form.setValue("key", item);
                              fetchDataKey.run(item).then((response) => {
                                form.setValue("data", response.val);
                              });
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Stack
                    direction="row"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{ width: `100%`, p: 1 }}
                  >
                    <Chip
                      label="删除键和值"
                      size="small"
                      onClick={() =>
                        setDelType({ ...delType, [tab.key]: "all" })
                      }
                      color={delTypeItem === "all" ? "primary" : undefined}
                    />
                    <Chip
                      label="仅删除键"
                      size="small"
                      onClick={() =>
                        setDelType({ ...delType, [tab.key]: "delKey" })
                      }
                      color={
                        delTypeItem === "delKey" || !delTypeItem
                          ? "primary"
                          : undefined
                      }
                    />
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      sx={{ fontSize: 16 }}
                      onClick={() => {
                        const formData: any[] = [
                          {
                            key: tab.key,
                            val: [],
                          },
                        ];

                        if (delTypeItem === "all") {
                          tab.data.map((dat) => {
                            formData.push({ key: dat, val: null });
                          });
                        }
                        fetchSave.run(formData);
                      }}
                    >
                      <DeleteIcon color="primary" sx={{ fontSize: 16 }} />
                      清空
                    </IconButton>
                  </Stack>
                </AccordionActions>
              </Accordion>
            </Stack>
          );
        })}
        <Paper elevation={3} sx={{ pt: 2 }}>
          <Box pr={2} pl={2} pb={1}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={2}
            >
              <Typography variant="body2">数据查看器</Typography>
              <Typography
                variant="body2"
                color="primary"
                component={"div"}
                onClick={() => {
                  const key = form.getValues("key");
                  if (!key)
                    return tip.alert({
                      open: true,
                      message: "请输入数据 KEY",
                      type: "warning",
                    });
                  $copy(key);
                  tip.alert({
                    open: true,
                    message: "复制成功",
                    type: "success",
                  });
                }}
              >
                复制
              </Typography>
            </Stack>
            <Controller
              name={"key"}
              control={form.control}
              render={({ field }) => {
                return (
                  <ProFormSelectAppKey
                    fullWidth
                    size="small"
                    placeholder={"数据键 (Key)"}
                    {...field}
                    onChange={(val) => {
                      form.setValue("data", "");
                      field.onChange(val);
                    }}
                  />
                );
              }}
            />

            <FormHelperText>输入要查询的数据键, 如: boxjs_host</FormHelperText>
          </Box>

          <Divider />
          <Stack spacing={2} justifyContent={"flex-end"} pt={1} pb={1}>
            <Button
              size="small"
              variant="text"
              sx={{ width: "max-content", marginLeft: "auto" }}
              onClick={() => {
                const key = form.getValues("key");
                if (!key)
                  return tip.alert({
                    open: true,
                    message: "请输入数据 KEY",
                    type: "warning",
                  });
                if (!viewkeys.includes(key)) {
                  fetchSave.run({
                    key: config.viewkeys,
                    val: [key, ...viewkeys],
                  });
                }
                fetchDataKey.run(key).then((response) => {
                  form.setValue("data", response.val);
                });
              }}
            >
              查询
            </Button>
          </Stack>
        </Paper>
        <Paper elevation={3} sx={{ pt: 2 }}>
          <Box pr={2} pl={2} pb={1}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={2}
            >
              <Typography variant="body2">数据编辑器</Typography>
              <Typography
                variant="body2"
                color="primary"
                component={"div"}
                onClick={() => {
                  const key = form.getValues("key");
                  if (!key)
                    return tip.alert({
                      open: true,
                      message: "请输入数据 KEY",
                      type: "warning",
                    });
                  $copy(key);
                  tip.alert({
                    open: true,
                    message: "复制成功",
                    type: "success",
                  });
                }}
              >
                复制
              </Typography>
            </Stack>
            <TextField
              fullWidth
              multiline
              rows={8}
              size="small"
              variant="standard"
              placeholder={"数据内容"}
              InputLabelProps={{
                shrink: true,
              }}
              {...form.register("data")}
            />
          </Box>
          <Divider />
          <Stack spacing={2} justifyContent={"flex-end"} pt={1} pb={1}>
            <Button
              size="small"
              variant="text"
              sx={{ width: "max-content", marginLeft: "auto" }}
              onClick={() => {
                const key = form.getValues("key");
                const data = form.getValues("data");

                if (!key)
                  return tip.alert({
                    open: true,
                    message: "请输入数据 KEY",
                    type: "warning",
                  });
                const formData = [{ key, val: data }];
                if (!dataKeys.includes(key) && !gistCacheData.includes(key)) {
                  formData.push({
                    key: config.gistCacheKey,
                    val: [key, ...gistCacheData],
                  });
                } else if (gistCacheData.includes(key) && !data) {
                  formData.push({
                    key: config.gistCacheKey,
                    val: gistCacheData.filter((item: string) => item !== key),
                  });
                }
                fetchSave.run(formData);
              }}
            >
              保存
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </QueueAnim>
  );
}
