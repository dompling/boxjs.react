import ProForm from "@/components/ProForm";
import { useModel, useParams } from "@@/exports";
import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import cronParse from "cron-parser";
import QueueAnim from "rc-queue-anim";
import React from "react";
import { useForm } from "react-hook-form";

const Detail: React.FC = () => {
  const params = useParams<{ tag: string }>();
  const taskTag = params?.tag;

  const { initialState } = useModel("@@initialState");
  const cache: any = initialState?.boxdata.datas["@SET_TIME.CACHE"];

  const tasks: any = initialState?.boxdata.datas["@SET_TIME.TASK"] || {};
  console.log(tasks);

  const dataSource: any[] = [];
  cache?.forEach((item: any) => {
    dataSource.push(
      ...Object.values(item.task).map((dat: any) => {
        const temp = { ...dat };
        temp.tag = `${item.name}_${dat.tag}`;
        return temp;
      })
    );
  });

  const taskDetail = dataSource.find((item) => item.tag === taskTag);
  taskDetail.cron = tasks[taskDetail.tag];
  const form = useForm({ defaultValues: taskDetail });

  return (
    <QueueAnim
      interval={[100, 0]}
      appear={!!initialState?.boxdata.usercfgs.isAnimate}
    >
      <Stack key={"container"} spacing={1} p={1}>
        <Stack>
          <Typography variant="h6" p={2} component={"span"}>
            {taskDetail?.tag}
          </Typography>
        </Stack>
        <Paper sx={{ mb: 2, pb: 2 }} elevation={3}>
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              p={2}
            >
              <Typography variant="body2">定时设置</Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{
              pl: 2,
              pr: 2,
            }}
          >
            <ProForm
              form={form}
              onSubmit={() => {
                return false;
              }}
            >
              <TextField
                fullWidth
                multiline
                id="cron"
                size="small"
                label="Cron"
                variant="standard"
                helperText={form.formState.errors.cron && "定时任务格式错误"}
                placeholder="请输入 Cron 定时"
                error={!!form.formState.errors.cron}
                {...form.register("cron", {
                  required: true,
                  validate: (value) => {
                    try {
                      const interval = cronParse.parseExpression(value);
                      console.log("cronDate:", interval.next().toDate());
                      return true;
                    } catch {
                      return false;
                    }
                  },
                })}
              />
              <Divider />
              <Stack p={`5px`} spacing={2} justifyContent={"flex-end"}>
                <Button
                  type={"submit"}
                  variant="text"
                  sx={{ width: "max-content", marginLeft: "auto" }}
                >
                  保存
                </Button>
              </Stack>
            </ProForm>
          </Stack>
        </Paper>
      </Stack>
    </QueueAnim>
  );
};
export default Detail;
