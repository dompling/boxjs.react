import ProModal from "@/components/ProModal";
import { useModel } from "@@/exports";
import { Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditForm: React.FC<{
  open?: boolean;
  onClose: () => void;
  value?: Record<string, any>;
  data?: boxjs.sessions;
  sessionIndex?: number;
}> = (props) => {
  const { fetchSave } = useModel("api");
  const form = useForm();

  useEffect(() => {
    if (props.open) {
      const formValue: Record<string, any> = {};
      props.data?.datas.forEach((item) => {
        formValue[item.key.replace(".", "*")] =
          typeof item.val === "object" ? JSON.stringify(item.val) : item.val;
      });
      form.reset({ appName: props.data?.name, ...formValue });
    }
  }, [props.open]);

  return (
    <ProModal
      fullScreen
      open={!!props.open}
      title={`${props.data?.name || "会话修改"}`}
      onClose={() => {
        props.onClose?.();
      }}
      form={form}
      loading={fetchSave.loading}
      onSubmit={({ appName, ...formData }) => {
        const formValue: { key: string; val: any }[] = [];

        Object.keys(formData).forEach((key) => {
          formValue.push({ key: key.replace("*", "."), val: formData[key] });
        });

        fetchSave
          .run([
            {
              key: `@chavy_boxjs_sessions.${props.sessionIndex}`,
              val: { ...props.data, datas: formValue, name: appName },
            },
          ])
          .then(() => {
            props.onClose?.();
          });
      }}
    >
      <Stack spacing={2}>
        <TextField
          fullWidth
          size="small"
          label={"会话名称"}
          variant="standard"
          placeholder={"会话名称"}
          InputLabelProps={{
            shrink: true,
          }}
          {...form.register("appName")}
        />
        {props.data?.datas.map((item) => {
          return (
            <TextField
              fullWidth
              size="small"
              key={item.key}
              label={item.key}
              variant="standard"
              placeholder={"请输入"}
              InputLabelProps={{
                shrink: true,
              }}
              {...form.register(item.key.replace(".", "*"))}
            />
          );
        })}
      </Stack>
    </ProModal>
  );
};

export default EditForm;
