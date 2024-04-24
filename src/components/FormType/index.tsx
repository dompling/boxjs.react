import { IOSSwitch } from "@/components/IOSSwitch";
import ProFormModalSelect from "@/components/ProFormModalSelect";
import ProFormSelectAppKey from "@/components/ProFormSelectAppKey";
import { history, useModel } from "@@/exports";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Drawer,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  useFormControl,
} from "@mui/material";
import $copy from "copy-to-clipboard";
import lodash from "lodash";
import QueueAnim from "rc-queue-anim";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { ChromePicker } from "react-color";
import {
  Controller,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import styles from "./index.less";

function CusFormHelperText({ text, ...props }: any) {
  const { focused } = useFormControl() || {};
  const helperText = React.useMemo(() => {
    if (focused) return text;

    return "";
  }, [focused]);

  return (
    <QueueAnim type={["top", "bottom"]} leaveReverse style={{ minHeight: 25 }}>
      {focused ? (
        <FormHelperText key={text} {...props}>
          {helperText}
        </FormHelperText>
      ) : null}
    </QueueAnim>
  );
}

function getOption(data: string | { label: string; key: string }) {
  let options = { label: "", key: "" };

  if (typeof data === "string") {
    options.label = data;
    options.key = data;
  } else {
    options = data;
  }
  return options;
}

const FormPickerColor: React.FC<{
  name?: string;
  value?: string;
  defaultValue?: string | null;
  onChange?: (value: any) => void;
}> = forwardRef(({ value, defaultValue, name, onChange }, ref) => {
  const [data, setValue] = useState<string | null | undefined>(defaultValue);

  const pickerProps: { color?: any } = {};
  pickerProps.color = data;

  useImperativeHandle(ref, () => {
    return { value };
  });

  useEffect(() => {
    setValue(value);
  }, [value]);

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

const renderFormItem = (data: boxjs.Setting, form?: UseFormReturn<any>) => {
  data.name = (data.disabled ? "🈲 手动填写-" : "") + data.name;
  const formName = data.id.replaceAll(".", "~");
  const formItemProps = {
    name: data.formName || formName,
    control: form?.control,
    rules: { pattern: data.pattern },
  };

  return (
    <>
      {(["text", "number"].includes(data.type) || !data.type) && (
        <FormControl size="small" sx={{ width: 1 }} variant="standard">
          <InputLabel htmlFor={data.id}>{data.name}</InputLabel>
          <Controller
            {...formItemProps}
            render={({ field, formState }) => {
              return (
                <>
                  <Input
                    id={data.id}
                    size="small"
                    type={data.type}
                    disabled={data.disabled}
                    placeholder={data.placeholder}
                    {...field}
                  />
                  <CusFormHelperText
                    text={data.desc}
                    error={!!formState.errors[field.name]}
                  />
                </>
              );
            }}
          />
        </FormControl>
      )}

      {data.type === "textarea" && !data.child && (
        <Controller
          {...formItemProps}
          render={({ field, formState }) => {
            return (
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
                error={!!formState.errors[field.name]}
                {...field}
              />
            );
          }}
        />
      )}

      {data.child && (
        <FormControl size="small" sx={{ width: 1 }} variant="standard">
          <InputLabel
            htmlFor={data.id}
            sx={{
              position: "unset",
              transform: "unset",
              mb: 2,
            }}
          >
            {data.name}
          </InputLabel>
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <FormList name={formItemProps.name} form={form} setting={data} />
          <CusFormHelperText text={data.desc} />
        </FormControl>
      )}

      {data.type === "boolean" && (
        <Stack>
          <Controller
            {...formItemProps}
            render={({ field }) => {
              return (
                <FormControlLabel
                  label={data.name}
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      disabled={data.disabled}
                      checked={field.value === "true" || field.value === true}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                />
              );
            }}
          />
          <FormHelperText sx={{ minHeight: 20 }}>{data.desc}</FormHelperText>
        </Stack>
      )}

      {data.type === "checkboxes" && (
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">{data.name}</FormLabel>

          <Controller
            {...formItemProps}
            render={({ field }) => {
              const isStr = typeof field.value === "string";
              const fieldValue =
                (isStr && field.value ? field.value.split(",") : field.value) ||
                [];

              return (
                <>
                  {data.items?.map((checkbox) => {
                    const options = getOption(checkbox);
                    return (
                      <FormControlLabel
                        key={options.key}
                        control={
                          <Checkbox
                            checked={fieldValue?.includes(options.key)}
                            onChange={(e) => {
                              let newValue: string[] = fieldValue;
                              if (e.target.checked) {
                                newValue.push(options.key);
                              } else {
                                newValue = newValue.filter(
                                  (f) => f != options.key
                                );
                              }

                              field.onChange(
                                isStr ? newValue.join(",") : newValue
                              );
                            }}
                          />
                        }
                        label={options.label}
                        disabled={data.disabled}
                      />
                    );
                  })}
                </>
              );
            }}
          />
          <FormHelperText sx={{ minHeight: 20 }}>{data.desc}</FormHelperText>
        </FormControl>
      )}

      {[
        "modalSelects",
        "cacheKey",
        "text",
        "textarea",
        "selects",
        "boolean",
        "radios",
        "checkboxes",
        "colorpicker",
        "number",
      ].indexOf(data.type) === -1 && (
        <FormControl size="small" sx={{ width: 1 }} variant="standard">
          <InputLabel htmlFor={data.id}>{data.name}</InputLabel>
          <Controller
            {...formItemProps}
            render={({ field, formState }) => {
              return (
                <>
                  <Input
                    id={data.id}
                    size="small"
                    type={data.type}
                    disabled={data.disabled}
                    placeholder={data.placeholder}
                    {...field}
                  />
                  <CusFormHelperText
                    text={data.desc}
                    error={!!formState.errors[field.name]}
                  />
                </>
              );
            }}
          />
        </FormControl>
      )}

      {data.type === "radios" && (
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">{data.name}</FormLabel>
          <Controller
            {...formItemProps}
            render={({ field }) => {
              return (
                <RadioGroup {...field}>
                  {data.items?.map((radio) => {
                    const options = getOption(radio);
                    return (
                      <FormControlLabel
                        key={options.key}
                        value={options.key}
                        label={options.label}
                        control={<Radio />}
                        disabled={data.disabled}
                      />
                    );
                  })}
                </RadioGroup>
              );
            }}
          />
          <FormHelperText sx={{ minHeight: 20 }}>{data.desc}</FormHelperText>
        </FormControl>
      )}

      {data.type === "selects" && (
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor={data.id}>{data.name}</InputLabel>
          <Controller
            {...formItemProps}
            render={({ field }) => {
              return (
                <Select
                  placeholder="请选择"
                  sx={{ width: `100%` }}
                  MenuProps={{ sx: { maxHeight: 300 } }}
                  {...field}
                >
                  {data.items?.map((item, index) => {
                    const options = getOption(item);
                    return (
                      <MenuItem
                        key={`${options.key}_${index}`}
                        value={options.key}
                      >
                        {options.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              );
            }}
          />
          <CusFormHelperText text={data.desc} />
        </FormControl>
      )}

      {data.type === "modalSelects" && (
        <FormControl sx={{ m: 1 }} variant="standard">
          <Controller
            {...formItemProps}
            render={({ field, formState }) => {
              return (
                <>
                  <InputLabel htmlFor={data.id} shrink={!!field.value}>
                    {data.name}
                  </InputLabel>
                  <ProFormModalSelect
                    inputProps={{ shrink: "true" }}
                    {...field}
                    items={data.items}
                  />
                  <CusFormHelperText
                    text={data.desc}
                    error={!!formState.errors[field.name]}
                  />
                </>
              );
            }}
          />
        </FormControl>
      )}

      {data.type === "cacheKey" && (
        <FormControl size="small" sx={{ width: 1 }} variant="standard">
          <Controller
            {...formItemProps}
            render={({ field, formState }) => {
              return (
                <>
                  <InputLabel htmlFor={data.id} shrink={!!field.value}>
                    {data.name}
                  </InputLabel>
                  <ProFormSelectAppKey {...field} />
                  <CusFormHelperText
                    text={data.desc}
                    error={!!formState.errors[field.name]}
                  />
                </>
              );
            }}
          />
        </FormControl>
      )}
      {data.type === "colorpicker" && (
        <FormControl size="small" sx={{ width: 1 }} variant="standard">
          <InputLabel
            htmlFor={data.id}
            sx={{
              position: "unset",
              transform: "unset",
              mb: 2,
            }}
          >
            {data.name}
          </InputLabel>
          <Controller
            {...formItemProps}
            render={({ field }) => {
              return (
                <FormPickerColor
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              );
            }}
          />
          <CusFormHelperText text={data.desc} />
        </FormControl>
      )}
    </>
  );
};

const FormList: React.FC<{
  name: string;
  form?: UseFormReturn<any>;
  setting?: boxjs.Setting;
}> = ({ setting, form, name }) => {
  const { fields, append, remove } = useFieldArray({
    name: name,
    control: form?.control,
  });

  const { fetchRunScript } = useModel("api");

  const formDrawer = useForm();
  const tip = useModel("alert");

  const [drawerTitle, setTitle] = useState<string>("");
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  let maxKeys = 0,
    formItems: string[] = [];
  fields.forEach(({ id, ...item }: any) => {
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
  const formValues = fields.filter((_, index) =>
    !loadMore ? index < 4 : true
  );

  const handelDrawerClose = () => {
    setOpen(false);
    formDrawer.reset();
  };

  const renderChildScripts = () => {
    return setting?.childScripts ? (
      <List disablePadding>
        {setting?.childScripts?.map((item, index) => {
          return (
            <ListItem
              key={item.name}
              sx={{ padding: 0, mb: 2 }}
              secondaryAction={
                <IconButton
                  edge="end"
                  sx={{ mr: -3.5 }}
                  aria-label={item.name}
                  onClick={() => {
                    if (fetchRunScript.loading) return;
                    const params =
                      form?.control._formValues[name][index] ||
                      formDrawer.getValues();
                    fetchRunScript.run({
                      url: item.script,
                      isRemote: true,
                      argument:
                        typeof params === "object"
                          ? JSON.stringify(params)
                          : params,
                    });
                  }}
                >
                  {fetchRunScript.loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <PlayCircleFilledIcon />
                  )}
                </IconButton>
              }
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                component={"span"}
                onClick={() => {
                  history.push(`/code?url=${item.script}`);
                }}
              >
                {`${index + 1}.${item.name}`}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    ) : null;
  };

  return (
    <>
      <Drawer anchor={"bottom"} open={open} onClose={() => handelDrawerClose()}>
        <Box
          sx={{
            pt: 1,
            pb: 1,
            borderBottom: 1,
            borderColor: "divider",
            boxShadow: (theme) => theme.shadows[2],
            position: "fixed",
            width: `100%`,
            bgcolor: "inherit",
            zIndex: 99,
          }}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Typography sx={{ flexGrow: 1, pl: 1 }}>
              {drawerTitle}-{setting?.name}
            </Typography>
            <Button
              color="primary"
              onClick={() => {
                const val = formDrawer.getValues();
                if (val["*JSON*"]) {
                  try {
                    form?.setValue(name, JSON.parse(val["*JSON*"]));
                    return handelDrawerClose();
                  } catch (e) {
                    return tip.alert({
                      open: true,
                      message: "JSON 格式错误",
                      type: "error",
                    });
                  }
                }
                Object.keys(val).forEach((key) => {
                  if (val[key] === undefined) val[key] = "";
                });
                append(val);
                handelDrawerClose();
              }}
            >
              保存
            </Button>
          </Stack>
        </Box>
        <Stack sx={{ pt: 10, pl: 2, pr: 2, height: `60vh`, maxHeight: `60vh` }}>
          {renderChildScripts()}
          {formItems && drawerTitle === "新增" ? (
            formItems?.map((settingKey, index) => {
              let settingItem: boxjs.Setting = child[settingKey] || {
                id: `[${index}].${settingKey}`,
                name: settingKey,
                type: "text",
              };
              return (
                <React.Fragment key={settingItem.id}>
                  {renderFormItem(settingItem, formDrawer)}
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
              placeholder={"请输入 JSON 数组"}
              helperText={
                <pre>{` JSON 格式数组示例值\n${JSON.stringify(
                  [
                    { key: 1, val: 1 },
                    { key: 2, val: 2 },
                  ],
                  null,
                  ` `
                )}`}</pre>
              }
              {...formDrawer.register("*JSON*")}
            />
          )}
        </Stack>
      </Drawer>
      {formValues.map((item: Record<string, any>, index: number) => {
        const title = setting?.primary
          ? setting?.primary.map((tit) => item[tit] || index + 1)
          : [setting?.name, index + 1];
        const id = `${setting?.id}-${index}`;
        if (!loadMore && index > 4) return null;

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
              <Typography variant="body2">{title?.join("-")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderChildScripts()}
              {expanded === id &&
                formItems?.map((settingKey) => {
                  let settingItem: boxjs.Setting = child[settingKey] || {
                    type: "text",
                    id: settingKey,
                    name: settingKey,
                  };

                  return (
                    <React.Fragment key={settingItem.id}>
                      {renderFormItem(
                        {
                          ...settingItem,
                          formName: `${name}.${index}.${settingKey}`,
                        },
                        form
                      )}
                    </React.Fragment>
                  );
                })}
              <Button
                size="small"
                color="error"
                sx={{ width: "100%" }}
                variant="contained"
                onClick={() => {
                  remove(index);
                  setExpanded(false);
                }}
              >
                删除
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}

      {fields.length > 5 && (
        <Accordion
          expanded={false}
          onClick={() => {
            setLoadMore(!loadMore);
          }}
        >
          <AccordionSummary>
            <Typography
              color={"primary"}
              variant="body2"
              sx={{
                width: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
            direction={"row"}
            alignItems={"center"}
            justifyContent="center"
          >
            <Button
              color="error"
              onClick={() => {
                form?.setValue(name, []);
              }}
            >
              清空
            </Button>
            <Button
              color="primary"
              onClick={() => {
                formDrawer.reset();
                setTitle("新增");
                setOpen(true);
              }}
            >
              新增
            </Button>
            <Button
              color="warning"
              onClick={() => {
                $copy(JSON.stringify(fields));
                tip.alert({
                  open: true,
                  message: "复制成功",
                  type: "success",
                });
              }}
            >
              复制
            </Button>
            <Button
              color="info"
              onClick={() => {
                formDrawer.reset();
                setTitle("导入");
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
};

function FormType({
  form,
  setting,
}: {
  form?: UseFormReturn<any>;
  setting?: boxjs.Setting;
  itemValue?: Record<string, string | null>;
}) {
  if (!setting) return null;
  return renderFormItem({ ...setting }, form);
}

export default FormType;
