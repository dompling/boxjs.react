import config from "@/utils/config";
import { history, useModel } from "@@/exports";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
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
import React, { useState } from "react";

const CusSpeedDial = styled(SpeedDial)(({ open }) => {
  return {
    "& .MuiSpeedDial-actions": {
      height: open ? "unset" : "0",
    },
  };
});

const BoxJSActions: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { initialState } = useModel("@@initialState");
  const { fetchAllData } = useModel("api");
  const boxjs = initialState?.boxdata.syscfgs.boxjs;
  const UI = initialState?.ui?.(initialState?.boxdata);
  const iconIndex = UI?.iconThemeIdx !== undefined ? UI?.iconThemeIdx : 1;
  if (initialState?.boxdata.usercfgs.isHideBoxIcon) return null;
  const icon = initialState?.boxdata?.syscfgs.envs?.find(
    (item) => item.id === initialState?.boxdata?.syscfgs.env
  );

  const actions = [
    ...(!initialState?.boxdata.usercfgs.isHideHelp
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
    ...(!initialState?.boxdata.usercfgs.isHideRefresh
      ? [
          {
            icon: <RefreshIcon sx={{ color: colors.red[400] }} />,
            name: "Refresh",
            onClick: () => {
              fetchAllData.run();
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

    ...(!initialState?.boxdata.usercfgs.isHideCoding
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
    <Box
      className="cus-draggable"
      sx={{
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: `12%`,
        right: 16,
        zIndex: 99,
      }}
    >
      <CusSpeedDial
        open={open}
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
          />
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
  );
};

export default BoxJSActions;
