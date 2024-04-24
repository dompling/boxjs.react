import footerStyle from "@/components/FooterToolNav/index.less";
import headerStyle from "@/components/HeaderContent/index.less";
import config from "@/utils/config";
import { history, useModel } from "@@/exports";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Avatar,
  Box,
  SpeedDial,
  SpeedDialAction,
  colors,
  styled,
} from "@mui/material";
import lodash from "lodash";
import React, { CSSProperties, useEffect, useRef, useState } from "react";

const CusSpeedDial = styled(SpeedDial)(({ open }) => {
  return {
    "& .MuiSpeedDial-actions": {
      height: open ? "unset" : "0",
    },
  };
});

const BoxJSActions: React.FC = () => {
  const actionRef = useRef<HTMLDivElement>();
  const [isDrag, setDrag] = useState(false);
  const [open, setOpen] = useState(false);
  const { fetchSave } = useModel("api");

  const { initialState } = useModel("@@initialState");

  const boxjs = initialState?.boxdata.syscfgs.boxjs;
  const usercfgs = initialState?.boxdata?.usercfgs;

  const [actionStyle, setActionStyle] = useState<CSSProperties>(
    usercfgs?.actions_position || {}
  );

  const UI = initialState?.ui?.(initialState?.boxdata);
  const iconIndex = UI?.iconThemeIdx !== undefined ? UI?.iconThemeIdx : 1;

  const icon = initialState?.boxdata?.syscfgs.envs?.find(
    (item) => item.id === initialState?.boxdata?.syscfgs.env
  );

  const half = window?.innerWidth / 2;

  const headerRect =
    (document
      .getElementsByClassName(headerStyle.header_container)?.[0]
      ?.getBoundingClientRect().height || 160) + 30;

  const footerRect =
    (document
      .getElementsByClassName(footerStyle.footer_container)?.[0]
      ?.getBoundingClientRect().height || 100) + 15;

  const handelDragMove = (event: React.TouchEvent | any) => {
    if (open) return;
    event.stopPropagation();
    if (!actionRef.current) return;
    const touch = event.touches[0];
    const styles: CSSProperties = {
      left: "unset",
      top: "unset",
      bottom: "unset",
      right: "unset",
    };
    //需要移动的x和y坐标
    styles.left =
      touch.clientX - actionRef.current?.getBoundingClientRect().width / 2;

    styles.bottom =
      window.innerHeight -
      (touch.clientY + actionRef.current?.getBoundingClientRect().height / 2);

    if (styles.bottom <= footerRect) {
      styles.bottom = footerRect;
    }

    if (styles.bottom >= window.innerHeight - headerRect) {
      styles.bottom = window.innerHeight - headerRect;
    }

    setActionStyle(styles);
  };

  useEffect(() => {
    if (!open) {
      actionRef.current?.addEventListener("touchmove", handelDragMove, {
        passive: false,
      });
    }

    return () => {
      actionRef.current?.removeEventListener("touchmove", handelDragMove);
    };
  }, [open]);

  const actions = [
    ...(!usercfgs?.isHideHelp
      ? [
          {
            icon: <QuestionMarkIcon sx={{ color: colors.amber[400] }} />,
            name: "Help",
            onClick: () => {
              window.open(`https://docs.boxjs.app/`);
            },
          },
        ]
      : []),
    ...(!usercfgs?.isHideRefresh
      ? [
          {
            icon: <RefreshIcon sx={{ color: colors.red[400] }} />,
            name: "Refresh",
            onClick: () => {
              window.location.reload();
            },
          },
        ]
      : []),
    {
      icon: <DataObjectIcon sx={{ color: colors.indigo[400] }} />,
      name: "database",
      onClick: () => {
        history.push("/database");
      },
    },

    ...(initialState?.boxdata.syscfgs.env === "Surge"
      ? [
          {
            icon: (
              <Avatar
                alt="BoxJs"
                src={icon?.icons[iconIndex] || config.logo}
                sx={{
                  width: 28,
                  height: 28,
                  border: 1,
                  borderColor: "white",
                }}
              />
            ),
            name: "actions",
            onClick: () => {
              history.push("/actions");
            },
          },
        ]
      : []),

    ...(!usercfgs?.isHideCoding
      ? [
          {
            icon: <CodeIcon sx={{ color: colors.orange[400] }} />,
            name: "Code",
            onClick: () => {
              history.push("/code");
            },
          },
        ]
      : []),
  ];

  return (
    <>
      {isDrag && (
        <div
          style={{
            position: "fixed",
            zIndex: 98,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
      <Box
        ref={actionRef}
        className="cus-draggable"
        sx={{
          touchAction: "none",
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "fixed",
          bottom: 100,
          right: 16,
          zIndex: 99,
          ...actionStyle,
        }}
        component={"div"}
        onTouchStart={(event) => {
          if (open) return;
          setDrag(true);
          event.stopPropagation();
        }}
        onTouchEnd={(event) => {
          setDrag(false);
          if (open) return;
          event.stopPropagation();
          if (lodash.isEqual(actionStyle, usercfgs?.actions_position)) return;
          const newState = { ...actionStyle };
          if (Number(newState.left) > half) {
            newState.left = "unset";
            newState.right = 16;
          } else {
            newState.left = 16;
            newState.right = "unset";
          }

          setActionStyle(newState);

          fetchSave.run({
            key: `@${config.userCfgs}.actions_position`,
            val: newState,
          });
        }}
      >
        <CusSpeedDial
          open={open && !isDrag}
          onClose={(e) => {
            setOpen(false);
            e.preventDefault();
          }}
          onClick={(e) => {
            setOpen(!open);
            e.preventDefault();
          }}
          FabProps={{ size: "medium" }}
          ariaLabel="SpeedDial controlled open example"
          icon={
            <Avatar
              alt="BoxJS"
              src={boxjs?.icons[iconIndex]}
              sx={{ width: 1, height: 1 }}
            >
              <LinkOffIcon color="error" />
            </Avatar>
          }
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </CusSpeedDial>
      </Box>
    </>
  );
};

export default BoxJSActions;
