import styles from "@/layouts/index.less";
import { Alert, AlertColor, Slide, Snackbar } from "@mui/material";
import React, {
  createRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface IOpen {
  message: string;
  type?: "error" | "warning" | "info" | "success";
}

interface INotifyRef {
  open: (p: IOpen) => void;
  close: () => void;
}

export const Toast = createRef<null | INotifyRef>();

const Notification: React.FC = () => {
  const [state, setState] = useState(false);
  const time = useRef<any>(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertColor>("info");

  const open = useCallback(({ message, type }: IOpen) => {
    type && setType(type);
    setMessage(message);
    setState(true);
  }, []);

  useEffect(() => {
    if (state) {
      time.current = setTimeout(() => {
        setState(false);
      }, 2000);
    }
    return () => {
      clearTimeout(time.current);
      time.current = null;
    };
  }, [state, type]);

  useImperativeHandle(Toast, () => ({ close, open }), [close, open]);

  return (
    <>
      <Snackbar
        open={state}
        autoHideDuration={2000}
        className={styles.alert}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert sx={{ width: "100%" }} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notification;
