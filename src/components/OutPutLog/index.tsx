import {
  Box,
  SwipeableDrawer,
  Typography,
  colors,
  styled,
} from "@mui/material";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : colors.grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  boxShadow: theme.shadows[1],
}));

const OutPut: React.FC<{
  open?: boolean;
  value: any;
  onClose: () => void;
}> = (props) => {
  if (!props.value) return null;
  return (
    <div>
      {/* @ts-ignore */}
      <SwipeableDrawer
        anchor="bottom"
        swipeAreaWidth={0}
        open={props.open || false}
        container={() => window.document.body}
        onClose={() => props.onClose()}
        onOpen={() => props.onClose()}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          zIndex: 9999,
          "& .MuiDrawer-paperAnchorBottom": {
            maxHeight: `60%`,
            minHeight: `30%`,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            overflow: "hidden",
          },
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: 0,
            visibility: "visible",
            right: 0,
            left: 0,
            boxShadow: (theme) => theme.shadows[1],
          }}
        >
          <Puller onClick={() => props.onClose()} />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            运行结果
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            mt: 7,
            overflow: "auto",
          }}
        >
          <Typography
            variant="caption"
            color={"grey"}
            component={"p"}
            sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", pt: 2 }}
          >
            {props.value?.output || JSON.stringify(props.value || "暂无结果")}
          </Typography>
        </StyledBox>
      </SwipeableDrawer>
    </div>
  );
};

export default OutPut;
