import ProModal from "@/components/ProModal";
import { useModel } from "@@/exports";
import { TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const ModalImportForm: React.FC<{
  open?: boolean;
  value?: string;
  onClose: () => void;
}> = (props) => {
  const { initialState } = useModel("@@initialState");
  const { fetchSave } = useModel("api");

  const formRef = useForm();

  return (
    <ProModal
      title={"导入会话"}
      open={!!props.open}
      onClose={() => {
        props.onClose();
      }}
      form={formRef}
      loading={fetchSave.loading}
      onSubmit={(formValue) => {
        if (!initialState) return;
        let formData = [];
        try {
          formData = JSON.parse(formValue.json);
          const test = formData.find((item: any) => !item.key && !item.val);
          if (test) return;
        } catch (e) {
          return;
        }
        fetchSave.run(formData).then(() => props.onClose?.());
      }}
    >
      <TextField
        fullWidth
        multiline
        minRows={6}
        size="small"
        variant="standard"
        placeholder={"JSON 格式的会话内容"}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ maxHeight: 400 }}
        defaultValue={props.value}
        {...formRef.register("json", { required: true })}
        error={!!formRef.formState.errors.json}
        helperText={`你可通过【当前会话】＞复制 来获得会话数据`}
      />
    </ProModal>
  );
};
export default ModalImportForm;
