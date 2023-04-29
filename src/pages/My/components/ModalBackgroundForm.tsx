import ProModal from '@/components/ProModal';
import config from '@/utils/config';
import { useModel } from '@@/exports';
import { MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const ModalBackgroundForm: React.FC<{
  open?: boolean;
  value?: string;
  onClose: () => void;
}> = (props) => {
  const { initialState } = useModel('@@initialState');
  const { fetchSave } = useModel('api');

  const formRef = useForm();

  const images = initialState?.boxdata.usercfgs.bgimgs
    .split(`\n`)
    .map((item) => {
      const [label, val] = item.split(',');
      return { label, val };
    });

  return (
    <ProModal
      title={'背景图片'}
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
      {images?.length ? (
        <Select
          size="small"
          placeholder="请选择"
          sx={{ width: `100%` }}
          id="demo-select-small"
          defaultValue={props.value}
          labelId="demo-select-small-label"
          {...formRef.register('bgimg')}
        >
          {images?.map((item, index) => {
            return (
              <MenuItem key={`${item.val}_${index}`} value={item.val}>
                {item.label}
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
          placeholder={'请输入图片在线链接'}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={props.value}
          {...formRef.register('bgimg')}
        />
      )}
    </ProModal>
  );
};
export default ModalBackgroundForm;
