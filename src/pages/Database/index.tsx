import ProFormSelectAppKey from "@/components/ProFormSelectAppKey";
import { useModel } from "@@/exports";
import {
  Box,
  Button,
  Divider, FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import $copy from "copy-to-clipboard";
import { useForm } from "react-hook-form";
import React from "react";

export default function Database() {
  const form = useForm();
  const tip = useModel("alert");
  const { fetchDataKey, fetchSaveData } = useModel("api");

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
          <ProFormSelectAppKey
            {...form.register("key")}
            fullWidth
            size="small"
            placeholder={"数据键 (Key)"}
          />
          <FormHelperText>
            输入要查询的数据键, 如: boxjs_host
          </FormHelperText>
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
              fetchSaveData.run({ key, val: data });
            }}
          >
            保存
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
