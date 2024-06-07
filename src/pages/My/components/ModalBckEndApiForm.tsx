import ProModal from "@/components/ProModal";
import { BACKEND_API, TOKEN } from "@/utils";
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
  const { fetchAllData } = useModel("api");
  const defaultValues = {
    token: localStorage.getItem(TOKEN),
    backend_address: localStorage.getItem(BACKEND_API),
  };

  const formRef = useForm({ defaultValues });

  const httpapis = (
    initialState?.boxdata?.usercfgs?.backend_address_list?.split(/,|\n/) || []
  ).filter((item) => !!item);

  const backend_address = formRef.watch("backend_address");

  return (
    <ProModal
      title={"后端设置"}
      open={!!props.open}
      onClose={() => {
        props.onClose();
      }}
      form={formRef}
      loading={fetchAllData.loading}
      onSubmit={(formValue) => {
        localStorage.setItem(BACKEND_API, formValue.backend_address);
        if (formValue.token) localStorage.setItem(TOKEN, formValue.token);
        fetchAllData
          .run()
          .then(() => {
            props.onClose?.();
            window.location.reload();
          })
      }}
    >
      {httpapis?.length ? (
        <Select
          size="small"
          placeholder="请选择"
          sx={{ width: `100%` }}
          id="demo-select-small"
          labelId="demo-select-small-label"
          {...formRef.register("backend_address")}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
          minRows={3}
          size="small"
          variant="standard"
          placeholder={"后端地址"}
          InputLabelProps={{ shrink: true }}
          {...formRef.register("backend_address")}
        />
      )}
      {backend_address && (
        <TextField
          fullWidth
          multiline
          minRows={3}
          size="small"
          variant="standard"
          placeholder={"后端Token"}
          InputLabelProps={{ shrink: true }}
          error={!!formRef.formState.errors.token}
          {...formRef.register("token", { required: true })}
          helperText={formRef.formState.errors.token && "请输入登录 Token"}
        />
      )}
    </ProModal>
  );
};
export default ModalHttpApiForm;
