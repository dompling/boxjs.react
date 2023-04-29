import { IOSSwitch } from '@/components/IOSSwitch';
import styles from '@/pages/App/Details/index.less';
import { useModel } from '@@/exports';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useFormControl,
} from '@mui/material';
import $copy from 'copy-to-clipboard';
import lodash from 'lodash';
import QueueAnim from 'rc-queue-anim';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { ChromePicker } from 'react-color';
import { FieldValue, useForm } from 'react-hook-form';

function CusFormHelperText({ text, ...props }: any) {
  const { focused } = useFormControl() || {};
  const helperText = React.useMemo(() => {
    if (focused) return text;

    return '';
  }, [focused]);

  return (
    <QueueAnim type={['top', 'bottom']} leaveReverse style={{ minHeight: 25 }}>
      {focused ? (
        <FormHelperText key={text} {...props}>
          {helperText}
        </FormHelperText>
      ) : null}
    </QueueAnim>
  );
}

const FormPickerColor: React.FC<{
  defaultValue?: string | null;
  name?: string;
  onChange?: (value: any) => void;
}> = forwardRef(({ defaultValue, name, onChange }, ref) => {
  const [value, setValue] = useState<string | null | undefined>(defaultValue);

  const pickerProps: { color?: any } = {};
  if (value) pickerProps.color = value;

  useImperativeHandle(ref, () => {
    return { value };
  });

  return (
    <ChromePicker
      {...pickerProps}
      className={styles.picker}
      onChangeComplete={(color) => {
        setValue(color.hex);
        onChange?.({ target: { name, value: color.hex } });
      }}
    />
  );
});

const renderFormItem = (
  data: boxjs.Setting,
  value?: Record<string, string | null>,
  register?: FieldValue<any>,
) => {
  const formItemProps = register(data.formName);
  data.name = (data.disabled ? '🈲手动填写-' : '') + data.name;

  return (
    <>
      {(data.type === 'text' || !data.type) && (
        <FormControl size="small" sx={{ width: 1 }} variant="standard">
          <InputLabel htmlFor={data.id}>{data.name}</InputLabel>
          <Input
            id={data.id}
            size="small"
            disabled={data.disabled}
            placeholder={data.placeholder}
            defaultValue={value?.[data.id]}
            {...formItemProps}
          />
          <CusFormHelperText text={data.desc} />
        </FormControl>
      )}

      {data.type === 'textarea' && !data.child && (
        <TextField
          fullWidth
          multiline
          id={data.id}
          size="small"
          label={data.name}
          variant="standard"
          rows={6 || data.rows}
          helperText={data.desc}
          disabled={data.disabled}
          placeholder={data.placeholder}
          defaultValue={value?.[data.id]}
          {...formItemProps}
        />
      )}

      {data.child && (
        <FormControl size="small" sx={{ width: 1 }} variant="standard">
          <InputLabel
            htmlFor={data.id}
            sx={{
              position: 'unset',
              transform: 'unset',
              mb: 2,
            }}
          >
            {data.name}
          </InputLabel>
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <FormList
            setting={data}
            {...formItemProps}
            itemValue={value?.[data.id] || '[]'}
          />
          <CusFormHelperText text={data.desc} />
        </FormControl>
      )}

      {data.type === 'boolean' && (
        <Stack>
          <FormControlLabel
            label={data.name}
            {...formItemProps}
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                disabled={data.disabled}
                defaultChecked={value?.[data.id] === `true`}
              />
            }
          />
          <FormHelperText sx={{ minHeight: 20 }}>{data.desc}</FormHelperText>
        </Stack>
      )}

      {data.type === 'checkboxes' && (
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">{data.name}</FormLabel>
          <FormGroup>
            {data.items?.map((checkbox) => {
              const checkboxValue = value?.[data.id]
                ?.split(',')
                .includes(checkbox.key);

              return (
                <FormControlLabel
                  key={checkbox.key}
                  {...formItemProps}
                  control={
                    <Checkbox
                      disabled={data.disabled}
                      defaultChecked={checkboxValue}
                    />
                  }
                  value={checkbox.key}
                  label={checkbox.label}
                />
              );
            })}
          </FormGroup>
          <FormHelperText sx={{ minHeight: 20 }}>{data.desc}</FormHelperText>
        </FormControl>
      )}

      {data.type === 'number' && (
        <FormControl size="small" sx={{ width: 1 }} variant="standard">
          <InputLabel htmlFor={data.id}>{data.name}</InputLabel>
          <Input
            id={data.id}
            size="small"
            type="number"
            {...formItemProps}
            disabled={data.disabled}
            placeholder={data.placeholder}
            defaultValue={value?.[data.id]}
          />
          <CusFormHelperText text={data.desc} />
        </FormControl>
      )}

      {data.type === 'radios' && (
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">{data.name}</FormLabel>
          <RadioGroup {...formItemProps} defaultValue={value?.[data.id]}>
            {data.items?.map((radio) => {
              return (
                <FormControlLabel
                  key={radio.key}
                  value={radio.key}
                  label={radio.label}
                  control={<Radio disabled={data.disabled} />}
                />
              );
            })}
          </RadioGroup>
          <FormHelperText sx={{ minHeight: 20 }}>{data.desc}</FormHelperText>
        </FormControl>
      )}

      {data.type === 'colorpicker' && (
        <FormControl size="small" sx={{ width: 1 }} variant="standard">
          <InputLabel
            htmlFor={data.id}
            sx={{
              position: 'unset',
              transform: 'unset',
              mb: 2,
            }}
          >
            {data.name}
          </InputLabel>
          <FormPickerColor {...formItemProps} defaultValue={value?.[data.id]} />
          <CusFormHelperText text={data.desc} />
        </FormControl>
      )}
    </>
  );
};

const FormList: React.FC<{
  name?: string;
  itemValue: string;
  setting?: boxjs.Setting;
  onChange?: (value: any) => void;
}> = forwardRef(({ setting, itemValue, onChange, ...props }, ref) => {
  let data: Record<string, any>[] = [];
  try {
    data = JSON.parse(itemValue);
  } catch (e) {
    console.log(e);
  }

  const form = useForm({ defaultValues: data });
  const formDrawer = useForm();
  const tip = useModel('alert');

  const [drawerTitle, setTitle] = useState<string>('');
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [formValue, setValue] = useState<Record<string, any>[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handelChange = (val: any[]) => {
    setValue(val);
    onChange?.({
      target: { name: props.name, value: JSON.stringify(val) },
    });
  };

  form.watch((response: any) => {
    const formData = [...formValue];
    Object.keys(response).forEach((key) => {
      formData[parseInt(key)] = response[key];
    });
    onChange?.({
      target: { name: props.name, value: JSON.stringify(formData) },
    });
  });

  useImperativeHandle(ref, () => {
    return { value: formValue };
  });

  useEffect(() => {
    setValue([...data]);
  }, [data]);

  let maxKeys = 0,
    formItems: string[] = [];
  formValue.forEach((item: any) => {
    const keyItem = Object.keys(item);
    const keys = keyItem.length;
    if (keys > maxKeys) {
      maxKeys = keys;
      formItems = keyItem;
    }
  });

  const child: Record<string, boxjs.Setting> = {};

  formItems = [
    ...formItems,
    ...(setting?.child?.map((item) => {
      child[item.id] = item;
      return item.id;
    }) || []),
  ];

  formItems = lodash.uniq(formItems);
  const formValues = formValue.filter((_, index) =>
    !loadMore ? index < 4 : true,
  );

  const handelDrawerClose = () => {
    setOpen(false);
    formDrawer.reset();
  };

  return (
    <>
      <Drawer anchor={'bottom'} open={open} onClose={() => handelDrawerClose()}>
        <Box
          sx={{
            pt: 1,
            pb: 1,
            borderBottom: 1,
            borderColor: 'divider',
            boxShadow: (theme) => theme.shadows[2],
            position: 'fixed',
            top: 0,
            width: `100%`,
            bgcolor: 'inherit',
            zIndex: 99,
          }}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <IconButton color="inherit" onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>

            <Typography sx={{ flexGrow: 1 }}>
              {drawerTitle}-{setting?.name}
            </Typography>
            <Button
              color="primary"
              onClick={() => {
                const val = formDrawer.getValues();
                if (val['*JSON*']) {
                  try {
                    handelChange(JSON.parse(val['*JSON*']));
                    return handelDrawerClose();
                  } catch (e) {
                    return tip.alert({
                      open: true,
                      message: 'JSON 格式错误',
                      type: 'error',
                    });
                  }
                }
                handelChange([...formValue, formDrawer.getValues()]);
                handelDrawerClose();
              }}
            >
              保存
            </Button>
          </Stack>
        </Box>
        <Stack sx={{ pt: 8, pl: 2, pr: 2, height: `100vh` }}>
          {formItems && drawerTitle === '新增' ? (
            formItems?.map((settingKey) => {
              let settingItem: boxjs.Setting = child[settingKey] || {
                id: settingKey,
                name: settingKey,
                type: 'text',
              };

              return (
                <React.Fragment key={settingItem.id}>
                  {renderFormItem(
                    {
                      ...settingItem,
                      formName: `${settingItem?.id}`,
                    },
                    {},
                    formDrawer.register,
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <TextField
              fullWidth
              multiline
              size="small"
              minRows={10}
              variant="standard"
              placeholder={'请输入 JSON 数组'}
              helperText={
                <pre>{` JSON 格式数组示例值\n${JSON.stringify(
                  [
                    { key: 1, val: 1 },
                    { key: 2, val: 2 },
                  ],
                  null,
                  ` `,
                )}`}</pre>
              }
              {...formDrawer.register('*JSON*')}
            />
          )}
        </Stack>
      </Drawer>
      {formValues.map((item: Record<string, any>, index: number) => {
        const title = setting?.primary
          ? setting?.primary.map((tit) => item[tit] || index + 1)
          : [setting?.name, index + 1];
        const id = `${setting?.id}-${index}`;
        if (!loadMore && index > 4 && data.length > 5) return null;

        return (
          <Accordion
            key={id}
            expanded={expanded === id}
            onChange={handleChange(id)}
          >
            <AccordionSummary
              id={id}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${id}-content`}
            >
              <Typography variant="body2">{title?.join('-')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {expanded === id &&
                formItems?.map((settingKey) => {
                  let settingItem: boxjs.Setting = child[settingKey] || {
                    id: settingKey,
                    name: settingKey,
                    type: 'text',
                  };
                  return (
                    <React.Fragment key={settingItem.id}>
                      {renderFormItem(
                        {
                          ...settingItem,
                          formName: `[${index}].${settingItem?.id}`,
                        },
                        item,
                        form.register,
                      )}
                    </React.Fragment>
                  );
                })}
              <Button
                size="small"
                color="error"
                sx={{ width: '100%' }}
                variant="contained"
                onClick={() => {
                  const val = formValue.filter((_, key) => key !== index);
                  form.resetField(`${index}`);
                  handelChange(val);
                }}
              >
                删除
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}

      {formValue.length > 5 && (
        <Accordion
          expanded={false}
          onClick={() => {
            setLoadMore(!loadMore);
          }}
        >
          <AccordionSummary>
            <Typography
              color={'primary'}
              variant="body2"
              sx={{
                width: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loadMore ? (
                <>
                  收起 <ExpandLessIcon />
                </>
              ) : (
                <>
                  更多 <ExpandMoreIcon />
                </>
              )}
            </Typography>
          </AccordionSummary>
        </Accordion>
      )}
      <Accordion expanded={false}>
        <AccordionSummary>
          <Stack
            spacing={1}
            sx={{ width: 1 }}
            direction={'row'}
            alignItems={'center'}
            justifyContent="center"
          >
            <Button
              color="error"
              onClick={() => {
                handelChange([]);
              }}
            >
              清空
            </Button>
            <Button
              color="primary"
              onClick={() => {
                formDrawer.reset();
                setTitle('新增');
                setOpen(true);
              }}
            >
              新增
            </Button>
            <Button
              color="warning"
              onClick={() => {
                const formData = [...formValue];
                const response: any = form.getValues();
                Object.keys(response).forEach((key) => {
                  formData[parseInt(key)] = response[key];
                });

                $copy(JSON.stringify(formData));
                tip.alert({
                  open: true,
                  message: '复制成功',
                  type: 'success',
                });
              }}
            >
              复制
            </Button>
            <Button
              color="info"
              onClick={() => {
                formDrawer.reset();
                setTitle('导入');
                setOpen(true);
              }}
            >
              导入
            </Button>
          </Stack>
        </AccordionSummary>
      </Accordion>
    </>
  );
});

function FormType({
  setting,
  itemValue,
  register,
}: {
  register?: FieldValue<any>;
  setting?: boxjs.Setting;
  itemValue?: Record<string, string | null>;
}) {
  if (!setting) return null;
  return renderFormItem(
    { ...setting, formName: setting.id.replace('.', '*') },
    itemValue,
    register,
  );
}

export default FormType;
