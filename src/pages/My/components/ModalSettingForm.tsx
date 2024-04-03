import ProModal from '@/components/ProModal';
import config from '@/utils/config';
import { useModel } from '@@/exports';
import {
  FormControl,
  InputLabel,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const avatarBg = [
  `./static/background/2.png`,
  `./static/background/3.png`,
  `./static/background/4.png`,
  `./static/background/5.png`,
];

const ModalSettingForm: React.FC<{
  open?: boolean;
  onClose?: () => void;
}> = (props) => {
  const { initialState } = useModel('@@initialState');
  const { fetchSave } = useModel('api');

  const usercfgs = initialState?.boxdata?.usercfgs;
  const [iconBg, setBg] = useState<string>(
    usercfgs?.iconBg || `./static/background/3.png`,
  );

  const formRef = useForm();

  return (
    <ProModal
      title={'个人设置'}
      open={!!props.open}
      onClose={() => {
        props.onClose?.();
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
                iconBg,
              }),
            },
          ])
          .then(() => {
            props.onClose?.();
          });
      }}
    >
      <Stack spacing={4}>
        <TextField
          fullWidth
          size="small"
          label="昵称"
          variant="standard"
          defaultValue={usercfgs?.name}
          placeholder={'请输入昵称'}
          InputLabelProps={{
            shrink: true,
          }}
          {...formRef.register('name')}
        />
        <TextField
          fullWidth
          size="small"
          label="头像"
          variant="standard"
          placeholder={'请输入头像图片地址'}
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={usercfgs?.icon}
          {...formRef.register('icon')}
        />

        <FormControl variant="standard">
          <InputLabel
            sx={{
              position: 'unset',
              transform: 'unset',
              mb: 2,
            }}
          >
            头像背景
          </InputLabel>
          <Stack spacing={2}>
            <Stack spacing={2} direction={'row'}>
              {avatarBg.map((item) => {
                return (
                  <Paper
                    key={item}
                    sx={{
                      border: item !== iconBg ? 1 : 2,
                      width: '25%',
                      height: 'auto',
                      overflow: 'hidden',
                      borderColor:
                        item !== iconBg
                          ? 'unset'
                          : (theme) => theme.palette.primary.main,
                    }}
                    elevation={3}
                  >
                    <img
                      onClick={() => {
                        setBg(item);
                      }}
                      loading="lazy"
                      src={item}
                      width={`100%`}
                      height={`100%`}
                    />
                  </Paper>
                );
              })}
            </Stack>
            <TextField
              fullWidth
              size="small"
              variant="standard"
              placeholder={'自定义头像背景地址'}
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={usercfgs?.iconCusBg}
              {...formRef.register('iconCusBg')}
            />
          </Stack>
        </FormControl>
      </Stack>
    </ProModal>
  );
};
export default ModalSettingForm;
