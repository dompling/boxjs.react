import ProModal from '@/components/ProModal';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

const OutPut: React.FC<{
  open?: boolean;
  value: any;
  onClose: () => void;
}> = (props) => {
  return (
    <ProModal
      fullScreen
      footer={null}
      open={!!props.open}
      title={
        <Stack
          direction={'row'}
          alignItems={'center'}
          sx={{ width: 1, p: 1 }}
          justifyContent={'space-between'}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            执行结果
          </Typography>
          <IconButton onClick={() => props.onClose?.()}>
            <KeyboardDoubleArrowDownIcon />
          </IconButton>
        </Stack>
      }
      onClose={() => {
        props.onClose?.();
      }}
    >
      {props.value?.output ? (
        <Typography
          variant="caption"
          color={'grey'}
          component={'p'}
          sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {props.value?.output}
        </Typography>
      ) : (
        JSON.stringify(props.value || '')
      )}
    </ProModal>
  );
};

export default OutPut;
