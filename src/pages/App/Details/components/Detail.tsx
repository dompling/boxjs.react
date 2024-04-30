import { useModel } from "@@/exports";
import { CopyAll } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import $copy from "copy-to-clipboard";
import React from "react";

const Detail: React.FC<{
  open?: boolean;
  session?: boxjs.sessions;
  onClose?: () => void;
  datas?: boxjs.Datas[];
}> = (props) => {
  const $tip = useModel("alert");
  return (
    // @ts-ignore
    <SwipeableDrawer
      anchor="bottom"
      swipeAreaWidth={0}
      open={props.open || false}
      container={() => window.document.body}
      onClose={() => props.onClose?.()}
      onOpen={() => props.onClose?.()}
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
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          px: 2,
          py: 2,
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <Typography>{props.session?.name || ""}</Typography>
        </Stack>
      </Box>
      <Box p={2} sx={{height:"100%",overflowY:"auto"}}>
        <List disablePadding>
          {props.datas?.map((item: any) => {
            return (
              <ListItem sx={{ p: 0 }} key={item.key}>
                <ListItemText
                  primary={
                    <>
                      <span
                        style={{
                          maxWidth: "85%",
                          display: "inline-block",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          height: "100%",
                          verticalAlign: "middle",
                        }}
                      >
                        {item.key}
                      </span>
                      {item.val && (
                        <IconButton
                          onClick={() => {
                            $copy(
                              typeof item.val === "object"
                                ? JSON.stringify(item.val)
                                : item.val
                            );
                            $tip.alert({
                              open: true,
                              message: "复制成功",
                              type: "success",
                            });
                          }}
                        >
                          <CopyAll fontSize="small" />
                        </IconButton>
                      )}
                    </>
                  }
                  primaryTypographyProps={{
                    noWrap: true,
                    variant: "caption",
                    sx: { fontWeight: "bold" },
                  }}
                  secondary={
                    <Typography
                      noWrap
                      color="grey"
                      variant="caption"
                      component={"div"}
                    >
                      {(typeof item.val === "object" && !!item.val
                        ? JSON.stringify(item.val)
                        : item.val) || "无数据"}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default Detail;
