import ProModal from "@/components/ProModal";
import { useModel, useSearchParams } from "@@/exports";
import { FormHelperText, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddSubs: React.FC<{
  open?: boolean;
  onClose: () => void;
}> = (props) => {
  const { fetchAddAppSub } = useModel("api");
  const formRef = useForm();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const add = searchParams.get("add");
    if (add) formRef.setValue("url", add);
  }, []);

  return (
    <ProModal
      title={"添加订阅"}
      open={!!props.open}
      onClose={() => {
        props.onClose();
        formRef.reset();
      }}
      form={formRef}
      loading={fetchAddAppSub.loading}
      onSubmit={(formValue) => {
        if (!formValue.url) return;
        fetchAddAppSub.run(formValue.url).then(props.onClose);
      }}
    >
      <TextField
        fullWidth
        multiline
        minRows={3}
        size="small"
        variant="standard"
        label={"订阅地址"}
        placeholder={"请输入订阅地址"}
        {...formRef.register("url")}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormHelperText sx={{ wordWrap: "break-word" }}>
        https://raw.githubusercontent.com/chavyleung/scripts/master/box/chavy.boxjs.json
      </FormHelperText>
    </ProModal>
  );
};
export default AddSubs;
