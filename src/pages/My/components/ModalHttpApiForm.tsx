import ProModal from "@/components/ProModal";
import config from "@/utils/config";
import { useModel } from "@@/exports";
import { MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const ModalHttpApiForm: React.FC<{
  open?: boolean;
  value?: string;
  onClose: () => void;
}> = (props) => {
  const { initialState } = useModel("@@initialState");
  const { fetchSave } = useModel("api");

  const formRef = useForm();

  const httpapis = (
    initialState?.boxdata?.usercfgs?.httpapis?.split(/,|\n/) || []
  ).filter((item) => !!item);

  return (
    <ProModal
      title={"HTTP-API (Surge)"}
      open={!!props.open}
      onClose={() => {
        props.onClose();
      }}
      form={formRef}
      loading={fetchSave.loading}
      onSubmit={(formValue) => {
        if (!initialState) return;
        fetchSave
          .run([
            {
              key: config.userCfgs,
              val: JSON.stringify({
                ...initialState.boxdata.usercfgs,
                ...formValue,
              }),
            },
          ])
          .then(() => props.onClose?.());
      }}
    >
      {httpapis?.length ? (
        <Select
          size="small"
          placeholder="请选择"
          sx={{ width: `100%` }}
          id="demo-select-small"
          defaultValue={props.value}
          labelId="demo-select-small-label"
          {...formRef.register("httpapi")}
        >
          {httpapis?.map((item, index) => {
            return (
              <MenuItem key={`${item}-${index}`} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      ) : (
        <TextField
          fullWidth
          multiline
          minRows={6}
          size="small"
          variant="standard"
          placeholder={"examplekey@127.0.0.1:6166"}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={props.value}
          {...formRef.register("httpapi", {
            pattern: /.*?@.*?:[0-9]+/,
            onChange: () => {
              formRef.trigger(["httpapi"]);
            },
          })}
          error={!!formRef.formState.errors.httpapi}
          helperText={
            formRef.formState.errors.httpapi &&
            `格式错误: examplekey@127.0.0.1:6166`
          }
        />
      )}
    </ProModal>
  );
};
export default ModalHttpApiForm;
