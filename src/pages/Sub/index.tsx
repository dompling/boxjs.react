import AddSubs from "@/pages/Sub/components/AddSub";
import { colorText, getCommentTime } from "@/utils";
import config from "@/utils/config";
import { useModel, useSearchParams } from "@@/exports";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
  colors,
  styled,
} from "@mui/material";
import $copy from "copy-to-clipboard";
import update from "immutability-helper";
import QueueAnim from "rc-queue-anim";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider, XYCoord, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import styles from "./index.less";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    bottom: "30%",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "& .MuiBadge-colorSuccess": {
    color: colors.green[700],
    background: colors.green[700],
  },
  "& .MuiBadge-colorError": {
    color: colors.red[700],
    background: colors.red[700],
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1.4)",
      opacity: 0,
    },
  },
}));

const DotBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    color: "#fff",
  },
}));

const SubItem: React.FC<{
  index: number;
  appItem: boxjs.appSubCaches & boxjs.Appsub;
  data?: (boxjs.Appsub | undefined)[];
  setCards: any;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
}> = ({ appItem, index, findCard, moveCard, data, setCards }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { initialState } = useModel("@@initialState");
  const { fetchReloadAppSub, fetchSave } = useModel("api");
  const tip = useModel("alert");
  const [open, setOpen] = useState<boolean>(false);
  const id = appItem.url;

  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "grid",
      item: { id, originalIndex },

      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
      end: (item, monitor) => {
        const { id: droppedId } = item;
        const didDrop = monitor.didDrop();
        if (item.originalIndex === originalIndex) return;
        if (!didDrop) moveCard(droppedId, item.originalIndex);
        fetchSave.run([
          {
            key: config.userCfgs,
            val: JSON.stringify({
              ...initialState?.boxdata.usercfgs,
              appsubs: data,
            }),
          },
        ]);
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "grid",
      hover(item: any, monitor) {
        if (!divRef.current) return;
        const dragIndex = item.index;
        const hoverIndex = index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) return;

        // Determine rectangle on screen
        const hoverBoundingRect = divRef.current?.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        moveCard(item.id, hoverIndex);
        item.index = hoverIndex;

        // if (item.draggedId !== id) {
        //   const { index: overIndex } = findCard(id);

        // }
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;
  drag(drop(divRef));

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          确定要删除当前订阅吗？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <Stack direction="row" spacing={2}>
                <StyledBadge
                  variant="dot"
                  overlap="circular"
                  color={appItem.id ? "success" : "error"}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  sx={{ position: "relative" }}
                >
                  <Avatar
                    src={appItem.icon}
                    sx={{
                      border: "1px solid #e8e8e8",
                      width: 36,
                      height: 36,
                    }}
                  />
                  {(fetchReloadAppSub.fetches[appItem.id]?.loading ||
                    fetchReloadAppSub.fetches[`all`]?.loading) && (
                    <CircularProgress
                      size={40}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-23px",
                        marginLeft: "-20px",
                      }}
                    />
                  )}
                </StyledBadge>
                <Stack sx={{ overflow: "hidden", flex: "1 1" }}>
                  <Stack>
                    <Typography variant="body2" gutterBottom ref={divRef}>
                      {appItem.name}
                    </Typography>
                    <DotBadge
                      color="primary"
                      badgeContent={appItem?.apps?.length}
                      sx={{ top: -15, right: 13 }}
                    />
                  </Stack>
                  <Typography
                    noWrap
                    variant="body2"
                    sx={{ color: colors.grey[500], fontSize: 12 }}
                  >
                    {appItem.repo}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button
            color="error"
            onClick={() => {
              setOpen(false);
              const appsubs = initialState?.boxdata.usercfgs.appsubs;
              appsubs?.splice(index, 1);
              setCards(appsubs);
              if (initialState)
                fetchSave.run([
                  {
                    key: config.userCfgs,
                    val: JSON.stringify({
                      ...initialState?.boxdata.usercfgs,
                      appsubs,
                    }),
                  },
                ]);
            }}
            autoFocus
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        ref={preview}
        sx={{
          marginBottom: 2,
          boxSizing: "border-box",
          opacity,
          transform: isDragging ? `translate(0,0)` : "unset",
          zIndex: isDragging ? -1 : "unset",
          position: "relative",
        }}
      >
        <Paper
          className={styles.dynamics}
          elevation={3}
          sx={{
            width: 1,
            minHeight: 20,
            borderRadius: 4,
            padding: "20px 20px 12px 20px",
            boxSizing: "border-box",
          }}
        >
          <Box>
            <Stack direction="row" spacing={2}>
              <StyledBadge
                variant="dot"
                overlap="circular"
                color={appItem.id ? "success" : "error"}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{ position: "relative" }}
              >
                <Avatar
                  src={appItem.icon}
                  sx={{
                    border: "1px solid #e8e8e8",
                    width: 36,
                    height: 36,
                  }}
                />
                {(fetchReloadAppSub.fetches[appItem.id]?.loading ||
                  fetchReloadAppSub.fetches[`all`]?.loading) && (
                  <CircularProgress
                    size={40}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-23px",
                      marginLeft: "-20px",
                    }}
                  />
                )}
              </StyledBadge>
              <Stack sx={{ overflow: "hidden", flex: "1 1" }}>
                <Stack>
                  <Typography variant="body2" gutterBottom ref={divRef}>
                    {appItem.name}
                  </Typography>
                  <DotBadge
                    color="primary"
                    badgeContent={appItem?.apps?.length}
                    sx={{ top: -15, right: 13 }}
                  />
                </Stack>
                <Typography
                  noWrap
                  variant="body2"
                  sx={{ color: colors.grey[500], fontSize: 12 }}
                >
                  {appItem.repo}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Stack sx={{ marginTop: 1 }}>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <IconButton
                color="primary"
                component="label"
                onClick={() => {
                  $copy(appItem.url);
                  tip.alert({
                    open: true,
                    message: "复制成功",
                    type: "success",
                  });
                }}
              >
                <CopyAllIcon />
              </IconButton>
              <IconButton
                color="primary"
                component="label"
                onClick={() => {
                  $copy(appItem.repo);
                  tip.alert({
                    open: true,
                    message: "复制成功",
                    type: "success",
                  });
                  window.open(appItem.repo);
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                color="primary"
                component="label"
                onClick={() => {
                  $copy(
                    `${window.location.href}?add=${encodeURIComponent(
                      appItem.url
                    )}`
                  );
                  tip.alert({
                    open: true,
                    message: "复制成功",
                    type: "success",
                  });
                }}
              >
                <ShareIcon />
              </IconButton>
              <IconButton
                color="success"
                component="label"
                onClick={() => {
                  fetchReloadAppSub.run(appItem);
                }}
              >
                <RefreshIcon />
              </IconButton>
              <IconButton
                color="error"
                component="label"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
              <Typography
                noWrap
                gutterBottom
                variant="overline"
                sx={{
                  color: colors.grey[500],
                  marginLeft: "auto !important",
                }}
              >
                {getCommentTime(appItem.updateTime)}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

const DropRef: React.FC<{
  index: number;
  appItem: boxjs.appSubCaches & boxjs.Appsub;
  data?: (boxjs.Appsub | undefined)[];
  setCards: any;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
}> = React.forwardRef((props, ref: any) => (
  <div ref={ref}>
    <SubItem {...props} />
  </div>
));

function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState<boolean>(!!searchParams.get("add"));
  const { initialState } = useModel("@@initialState");
  const divRef = useRef<HTMLElement>();
  const [collectedProps, drop] = useDrop(() => ({
    accept: "grid",
    collect: (monitor) => ({
      dragItem: monitor.getItem(),
    }),
  }));

  const { fetchReloadAppSub } = useModel("api");
  const boxdata = initialState?.boxdata;

  const appsubs = boxdata?.usercfgs.appsubs || [];
  const appSubCaches = boxdata?.appSubCaches || {};
  const usercfgs = initialState?.boxdata.usercfgs;

  const [cards, setCards] = useState<boxjs.Appsub[]>(appsubs || []);
  const [mouse, setMouse] = useState<{ x: number; y: number }>();
  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${c?.url}` === `${id}`)[0];
      return {
        card,
        index: cards?.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );

  useEffect(() => {
    setSearchParams({});
    if (initialState?.isMobile) {
      document.body.addEventListener("touchmove", (event) => {
        setMouse({ x: event.touches[0].clientX, y: event.touches[0].clientY });
      });
    }
    if (appsubs.length !== cards.length) {
      setCards(appsubs);
    }
  }, [appsubs]);

  // @ts-ignore
  const dragItemId = collectedProps.dragItem?.id;
  const dragItem = { ...appSubCaches[dragItemId], url: dragItemId };
  const divClient = divRef.current?.getBoundingClientRect();

  return (
    <Box component={"div"}>
      <AddSubs open={open} onClose={() => setOpen(false)} />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5" sx={colorText(usercfgs?.bgimg)}>
          应用订阅
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <IconButton
            color="primary"
            component="label"
            onClick={() => {
              window.open(`https://docs.boxjs.app/awesome/subscriptions`);
            }}
          >
            <CloudCircleIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="label"
            onClick={() => {
              fetchReloadAppSub.run(undefined);
            }}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="label"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Stack>
      </Stack>
      <div ref={drop}>
        {cards.map((item, index) => {
          const appItem = { ...item, ...appSubCaches[item.url] } || {
            name: "匿名订阅",
            repo: item.url,
            apps: [],
          };

          return (
            <DropRef
              data={cards}
              index={index}
              key={item.url}
              appItem={appItem}
              findCard={findCard}
              moveCard={moveCard}
              setCards={setCards}
            />
          );
        })}
        <Box
          ref={divRef}
          component={"div"}
          sx={{
            display: dragItem.id && initialState?.isMobile ? "block" : "none",
            zIndex: -1,
            opacity: 0.5,
            position: "fixed",
            left: (mouse?.x || 0) - (divClient?.width || 100) / 2,
            top: (mouse?.y || 0) - (divClient?.height || 50) / 2,
          }}
        >
          <Paper
            className={styles.dynamics}
            elevation={3}
            sx={{
              width: 1,
              minHeight: 20,
              borderRadius: 4,
              padding: "20px 20px 12px 20px",
              boxSizing: "border-box",
            }}
          >
            <Stack direction="row" spacing={2}>
              <StyledBadge
                variant="dot"
                overlap="circular"
                color={dragItem.id ? "success" : "error"}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{ position: "relative" }}
              >
                <Avatar
                  src={dragItem.icon}
                  sx={{
                    border: "1px solid #e8e8e8",
                    width: 36,
                    height: 36,
                  }}
                />
              </StyledBadge>
              <Stack sx={{ flex: "1 1" }}>
                <Stack>
                  <Typography variant="body2" gutterBottom sx={{ flexGrow: 1 }}>
                    {dragItem.name}
                  </Typography>
                </Stack>
                <Typography
                  noWrap
                  variant="body2"
                  sx={{ color: colors.grey[500], fontSize: 12 }}
                >
                  订阅
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </div>
    </Box>
  );
}

export default function Sub() {
  const { initialState } = useModel("@@initialState");
  return (
    <QueueAnim
      interval={[100, 0]}
      appear={!!initialState?.boxdata.usercfgs.isAnimate}
    >
      <Box key={"container"} pt={2} component={"div"}>
        <DndProvider
          options={{ delay: 400 }}
          backend={initialState?.isMobile ? TouchBackend : HTML5Backend}
        >
          <Page />
        </DndProvider>
      </Box>
    </QueueAnim>
  );
}
