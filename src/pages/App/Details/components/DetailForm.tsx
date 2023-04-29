import FormType from '@/components/FormType';
import ProForm from '@/components/ProForm';
import { useModel } from '@@/exports';
import { Button, Divider, Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const DetailForm: React.FC<{ formConfig: boxjs.Setting[] }> = ({
  formConfig,
}) => {
  const { initialState } = useModel('@@initialState');
  const { fetchSave } = useModel('api');
  const defaultValues: any = {};
  formConfig.forEach((setting) => {
    defaultValues[setting.id.replace('.', '*')] =
      initialState?.boxdata.datas[setting.id];
  });

  const form = useForm({ defaultValues });

  return (
    <ProForm
      form={form}
      noValidate
      onSubmit={(formData) => {
        const formValue: { key: string; val: any }[] = [];

        Object.keys(formData).forEach((key) => {
          const id = key.replace('*', '.');
          const initialValue = initialState?.boxdata.datas[id];
          let val: any = formData[key];
          if (
            typeof formData[key] === 'object' &&
            typeof initialValue === 'string'
          ) {
            try {
              const data: any[] = JSON.parse(
                initialState?.boxdata.datas[id] || '[]',
              );
              formData[key].forEach((item: any, index: number) => {
                data[index] = item;
              });
              val = JSON.stringify(data);
            } catch (e) {
              val = formData[key].join(',');
            }
          } else if (typeof formData[key] === 'boolean') {
            val = `${formData[key]}`;
          } else if (
            formData[key] === undefined &&
            initialState?.boxdata.datas[id]
          ) {
            val = initialValue;
          }
          formValue.push({ key: id, val });
        });
        fetchSave.run(formValue);
      }}
      autoComplete="off"
    >
      <Stack sx={{ pl: 2, pr: 2 }} spacing={1}>
        {formConfig.map((setting) => {
          return (
            <FormType
              key={setting.id}
              setting={setting}
              register={form.register}
              itemValue={initialState?.boxdata.datas}
            />
          );
        })}
      </Stack>
      <Divider />
      <Stack p={`5px`} spacing={2} justifyContent={'flex-end'}>
        <Button
          type={'submit'}
          variant="text"
          sx={{ width: 'max-content', marginLeft: 'auto' }}
        >
          保存
        </Button>
      </Stack>
    </ProForm>
  );
};

export default DetailForm;
