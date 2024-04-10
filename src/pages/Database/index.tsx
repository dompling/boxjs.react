import ProFormSelectAppKey from "@/components/ProFormSelectAppKey";
import { useModel } from "@@/exports";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import $copy from "copy-to-clipboard";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const gistCacheKey = "@chavy_boxjs_userCfgs.gist_cache_key";

export default function Database() {
  const form = useForm();
  const tip = useModel("alert");
  const { fetchDataKey, fetchSave } = useModel("api");
  const { initialState } = useModel("@@initialState");
  const dataKeys = Object.keys(initialState?.boxdata.datas || {});
  const gistCacheData = fetchDataKey.fetches[gistCacheKey]?.data?.val || [];

  useEffect(() => {
    fetchDataKey.run(gistCacheKey);
  }, []);

  return (
    <Stack spacing={3} m={1}>
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
              fetchDataKey.run(key).then((response) => {
                form.setValue("data", response.val);
              });
            }}
          >
            查询
          </Button>
        </Stack>
      </Paper>
      {gistCacheData.length > 0 && (
        <Stack direction="column" mt={2}>
          <Accordion>
            <AccordionSummary
              sx={{ m: 0 }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="body2">
                非订阅数据（{gistCacheData.length}）
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                {gistCacheData.map((item: string, index: number) => {
                  return (
                    <div key={`${item}_${index}`} style={{ padding: 5 }}>
                      <Chip
                        label={item}
                        variant="outlined"
                        sx={{ maxWidth: 120, "& span": { width: `100%` } }}
                        onDelete={() => {
                          fetchSave
                            .run([
                              { key: item, val: "" },
                              {
                                key: gistCacheKey,
                                val: gistCacheData.filter(
                                  (cache: string) => cache !== item
                                ),
                              },
                            ])
                            .then(() => {
                              fetchDataKey.run(gistCacheKey);
                            });
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
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
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
                  key: gistCacheKey,
                  val: [...gistCacheData, key],
                });
              } else if (gistCacheData.includes(key) && !data) {
                formData.push({
                  key: gistCacheKey,
                  val: gistCacheData.filter((item: string) => item !== key),
                });
              }
              fetchSave.run(formData).then(() => {
                if (formData.length > 1) fetchDataKey.run(gistCacheKey);
              });
            }}
          >
            保存
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
