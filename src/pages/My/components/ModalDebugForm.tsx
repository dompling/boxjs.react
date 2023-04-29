import ProModal from '@/components/ProModal';
import config from '@/utils/config';
import { useModel } from '@@/exports';
import LinkIcon from '@mui/icons-material/Link';
import { colors, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const ModalDebugForm: React.FC<{
  open?: boolean;
  onClose: () => void;
  value?: string;
}> = (props) => {
  const { initialState } = useModel('@@initialState');
  const { fetchSave } = useModel('api');

  const formRef = useForm();

  return (
    <ProModal
      title={'调试地址'}
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
      <TextField
        fullWidth
        size="small"
        variant="standard"
        placeholder={'请输入 html 地址'}
        {...formRef.register('debugger_web')}
        defaultValue={props.value}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkIcon sx={{ color: colors.teal[400] }} />
            </InputAdornment>
          ),
        }}
      />
    </ProModal>
  );
};
export default ModalDebugForm;
