import ProModal from '@/components/ProModal';
import { ColorModeContext } from '@/utils';
import config from '@/utils/config';
import { useModel } from '@@/exports';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';

const ModalThemeForm: React.FC<{
  open?: boolean;
  onClose: () => void;
  value?: 'dark' | 'light' | 'auto';
}> = (props) => {
  const [themeValue, setTheme] = useState<
    'dark' | 'light' | 'auto' | undefined
  >(props.value);
  const { initialState } = useModel('@@initialState');

  const { fetchSave } = useModel('api');

  const colorMode = React.useContext(ColorModeContext);
  const options: Record<string, any> = {
    light: '白天',
    dark: '夜间',
    auto: '自动',
  };

  return (
    <ProModal
      title={'外观主题'}
      open={!!props.open}
      onClose={() => {
        colorMode.toggleColorMode(props.value as 'dark' | 'light' | 'auto');
        props.onClose();
      }}
      loading={fetchSave.loading}
      onSubmit={() => {
        if (!initialState || !themeValue) return;
        initialState.boxdata.usercfgs.theme = themeValue;
        fetchSave
          .run([
            {
              key: config.userCfgs,
              val: JSON.stringify(initialState.boxdata.usercfgs),
            },
          ])
          .then(() => {
            props.onClose();
          });
      }}
    >
      <RadioGroup
        aria-label="ringtone"
        name="ringtone"
        defaultValue={props.value}
        onChange={(event, value) => {
          const mode = value as 'dark' | 'light' | 'auto';
          setTheme(mode);
          colorMode.toggleColorMode(mode);
        }}
      >
        {Object.keys(options).map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={options[option]}
          />
        ))}
      </RadioGroup>
    </ProModal>
  );
};
export default ModalThemeForm;
