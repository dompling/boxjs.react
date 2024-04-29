import ProModal from '@/components/ProModal';
import config from '@/utils/config';
import { useModel } from '@@/exports';
import { colors, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import HeightIcon from '@mui/icons-material/Height';


const ModalSettingsHeightForm: React.FC<{
  open?: boolean;
  onClose: () => void;
  value?: string;
}> = (props) => {
  const { initialState } = useModel('@@initialState');
  const { fetchSave } = useModel('api');

  const formRef = useForm();

  return (
    <ProModal
      title={'应用设置表单高度'}
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
        type="number"
        variant="standard"
        placeholder={'请输入'}
        {...formRef.register('app_settings_height')}
        defaultValue={props.value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <HeightIcon sx={{ color: colors.teal[400] }} />
            </InputAdornment>
          ),
        }}
      />
    </ProModal>
  );
};
export default ModalSettingsHeightForm;
