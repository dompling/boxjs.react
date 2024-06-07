import ProFrom from "@/components/ProForm";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Slide,
  colors,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import styles from "./index.less";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProModal: React.FC<
  {
    loading?: boolean;
    onClose?: () => void;
    title?: any;
    children: React.ReactNode;
    onSubmit?: (formValue: any) => void;
    form?: UseFormReturn<any>;
    footer?: null | React.ReactNode;
  } & Omit<DialogProps, "title">
> = ({
  footer,
  loading,
  onClose,
  title,
  children,
  onSubmit,
  form,
  ...props
}) => {
  return (
    <Dialog
      key="Dialog"
      maxWidth="xs"
      TransitionComponent={Transition}
      sx={{ "& .MuiDialog-paper": { minWidth: "80%" } }}
      className={props.fullScreen ? styles.fullScreen : ""}
      {...props}
    >
      {props.open && (
        <ProFrom
          form={form}
          onSubmit={(formValue) => {
            onSubmit?.(formValue);
          }}
        >
          {title && typeof title === "string" ? (
            <DialogTitle
              key="title"
              className={styles.header_container}
              sx={{ fontSize: `1rem`, padding: 1.5 }}
            >
              {title}
            </DialogTitle>
          ) : (
            <Box className={styles.header_container}>{title}</Box>
          )}
          <DialogContent dividers key="content">
            {props.open ? children : null}
          </DialogContent>
          <DialogActions key="action">
            {footer !== undefined ? (
              footer
            ) : (
              <>
                <Button
                  sx={{ color: colors.grey[600] }}
                  aria-label="delete"
                  onClick={() => {
                    onClose?.();
                  }}
                >
                  取消
                </Button>
                <Button type={"submit"}>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    `确定`
                  )}
                </Button>
              </>
            )}
          </DialogActions>
        </ProFrom>
      )}
    </Dialog>
  );
};
export default ProModal;
