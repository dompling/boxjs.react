import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "@/components/HeaderContent";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  IconButton,
  Input,
  InputProps,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useDebounce } from "ahooks";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const ProFormModalSelect: React.FC<
  {
    name?: string;
    value?: string;
    defaultValue?: string;
    items?: { label: string; key: string }[] | string[];
    onChange?: (value: any) => void;
  } & InputProps
> = forwardRef(({ defaultValue,  items, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const [searchValue, setSearch] = useState<string>("");
  const debouncedValue = useDebounce(searchValue, { wait: 100 });

  let options = [...(items || [])];
  options = options.filter((item) => {
    if (!debouncedValue) return true;
    if (typeof item === "string") {
      return item.indexOf(debouncedValue) > -1 || !debouncedValue;
    }
    return (
      item.key.indexOf(debouncedValue) > -1 ||
      item.label.indexOf(debouncedValue) > -1
    );
  });

  useImperativeHandle(ref, () => {
    return { value };
  });

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onClose = () => {
    setOpen(false);
    setSearch("");
  };

  const handelChange = (val?: string) => {
    setValue(val);
    props.onChange?.({ target: { name: props.name, value: val } });
  };

  return (
    <>
      <Input
        {...props}
        value={value}
        onChange={(event) => {
          handelChange(event.target.value);
        }}
        size="small"
        type={"text"}
        endAdornment={
          <IconButton
            size="small"
            aria-label={props.name}
            onClick={() => {
              setOpen(true);
            }}
          >
            <KeyboardDoubleArrowRightIcon
              fontSize="small"
              sx={{ color: (theme) => theme.palette.primary.main }}
            />
          </IconButton>
        }
      />
      <Dialog
        open={open}
        onClose={() => onClose()}
        sx={{ mt: 15, mb: 15, "& .MuiDialog-paper": { width: `100%` } }}
      >
        <AppBar
          position="static"
          sx={{ background: (theme) => theme.palette.primary.main }}
        >
          <Toolbar>
            <Search>
              <StyledInputBase
                placeholder="请输入"
                inputProps={{ "aria-label": "search" }}
                onChange={(value) => {
                  setSearch(value.target.value);
                }}
              />
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            </Search>
          </Toolbar>
        </AppBar>
        <List
          subheader={<li />}
          sx={{
            position: "relative",
            overflow: "auto",
            minHeight: 300,
            "& ul": { padding: 0 },
          }}
        >
          <RadioGroup
            name="radio-buttons-group"
            onChange={(_, val) => {
              handelChange(val);
            }}
          >
            {options.length > 0 ? (
              options.map((item) => {
                let option = { label: "", key: "" };
                if (typeof item === "string") {
                  option.label = item;
                  option.key = item;
                } else {
                  option = { ...item };
                }
                return (
                  <ListItem sx={{ p: 0, pl: 3, pr: 3 }} key={option.key}>
                    <ListItemText
                      id={option.key}
                      primary={
                        <FormControlLabel
                          value={option.key}
                          control={<Radio />}
                          label={option.label}
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              width: "80%",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "noWrap",
                            },
                          }}
                        />
                      }
                      primaryTypographyProps={{
                        noWrap: true,
                        variant: "caption",
                        sx: { fontWeight: "bold" },
                      }}
                      secondary={
                        typeof item !== "string" && (
                          <Typography
                            noWrap
                            color="grey"
                            variant="caption"
                            component={"div"}
                          >
                            {option.key}
                          </Typography>
                        )
                      }
                    />
                  </ListItem>
                );
              })
            ) : (
              <ListItem sx={{ height: 290, textAlign: "center" }}>
                <ListItemText primary={"未找到相关结果"} />
              </ListItem>
            )}
          </RadioGroup>
        </List>
        <DialogActions sx={{ borderTop: `1px solid rgba(0, 0, 0, .125)` }}>
          <Button color="inherit" onClick={() => onClose()}>
            取消
          </Button>
          <Button onClick={() => onClose()} autoFocus>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
export default ProFormModalSelect;
