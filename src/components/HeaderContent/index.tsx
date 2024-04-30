import ProModal from "@/components/ProModal";
import config from "@/utils/config";
import { history, useLocation, useModel } from "@@/exports";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useDebounce } from "ahooks";
import QueueAnim from "rc-queue-anim";
import React, { useState } from "react";
import styles from "./index.less";

const CusListItem = styled(ListItem)(() => ({
  paddingLeft: 8,
}));

const ListItemTextDesc = styled(ListItemText)(() => ({
  "& .MuiListItemText-secondary": {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: `100%`,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  right: 0,
  top: 0,
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const HeaderContent: React.FC = () => {
  const { initialState, setInitialState } = useModel("@@initialState");
  const { loading, fetchSave } = useModel("api");
  const location = useLocation();
  const [keyword, setKeyword] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const debouncedKeyword = useDebounce(keyword, { wait: 500 });

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const boxdata = initialState?.boxdata;

  const icon = boxdata?.syscfgs.envs?.find(
    (item) => item.id === boxdata?.syscfgs.env
  );

  const UI = initialState?.ui?.(initialState?.boxdata);
  const iconIndex = UI?.iconThemeIdx !== undefined ? UI?.iconThemeIdx : 1;

  return (
    <QueueAnim
      appear={!!initialState?.boxdata.usercfgs.isAnimate}
      type={["top", "bottom"]}
      leaveReverse
    >
      {!boxdata?.usercfgs.isWaitToggleSearchBar ? (
        <Box className={styles.header_container}>
          <Paper
            sx={{
              borderRadius: 7,
              overflow: "hidden",
            }}
            key={"appbar"}
            elevation={3}
          >
            <AppBar position="static">
              <Toolbar
                sx={{
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? ""
                      : theme.palette.common.white,
                }}
              >
                {["/home", "/app", "/sub"].indexOf(location.pathname) === -1 ? (
                  <IconButton
                    color="primary"
                    onClick={() => history.back()}
                    sx={{ position: "relative", left: -10 }}
                  >
                    <ChevronLeftIcon
                      sx={{
                        width: 28,
                        height: 28,
                      }}
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    size="large"
                    edge="start"
                    sx={{ mr: 2 }}
                    color="primary"
                    onClick={handleClick}
                    aria-label="open drawer"
                  >
                    <Box sx={{ position: "relative" }}>
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
                      {loading && (
                        <CircularProgress
                          size={28}
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-14px",
                            marginLeft: "-14px",
                          }}
                        />
                      )}
                    </Box>
                  </IconButton>
                )}

                <Typography
                  color="primary"
                  variant="body1"
                  component={"span"}
                  sx={{ flexGrow: 1 }}
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  {boxdata
                    ? `${boxdata?.syscfgs.boxjs.id} - v${boxdata?.syscfgs.version}`
                    : "网络连接失败"}
                </Typography>

                <IconButton
                  color="primary"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  <TroubleshootIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            {loading && <LinearProgress />}
          </Paper>
        </Box>
      ) : null}

      <ProModal
        fullScreen
        fullWidth
        open={visible}
        footer={null}
        onClose={() => setVisible(false)}
        title={
          <AppBar
            position="static"
            className={styles.app_bar}
            sx={{ position: "fixed", top: 0, zIndex: 99 }}
          >
            <Toolbar sx={{ pl: 0 }}>
              <IconButton color="inherit" onClick={() => setVisible(false)}>
                <ChevronLeftIcon />
              </IconButton>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="请输入"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(value) => {
                    setKeyword(value.target.value);
                  }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        }
      >
        <List sx={{ padding: 0, pt: 5 }}>
          {initialState?.apps
            .filter((app) => {
              return (
                (app.name || app.id).indexOf(`${debouncedKeyword || ""}`) !== -1
              );
            })
            .map((app, index) => {
              const isFav = initialState?.boxdata?.usercfgs.favapps.find(
                (fav) => fav === app.id
              );
              UI?.loadAppBaseInfo(app);
              return (
                <React.Fragment key={`${app.id}-${index}`}>
                  <CusListItem
                    key={`${app.id}-${index}`}
                    secondaryAction={
                      !isFav ? (
                        <IconButton
                          edge="end"
                          aria-label="fav"
                          sx={{ padding: 0, paddingRight: `2px` }}
                          onClick={() => {
                            const isRun =
                              initialState?.boxdata.usercfgs.favapps.find(
                                (item) => item === app.id
                              );
                            if (isRun) return;
                            const usercfgs = initialState?.boxdata.usercfgs;
                            usercfgs?.favapps?.push(app.id);
                            fetchSave.run({
                              key: config.userCfgs,
                              val: JSON.stringify({ ...usercfgs }),
                            });
                          }}
                        >
                          <StarBorderIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          edge="end"
                          aria-label="cancelFav"
                          sx={{ padding: 0, paddingRight: `2px` }}
                          onClick={() => {
                            const isRun =
                              initialState?.boxdata.usercfgs.favapps.find(
                                (item) => item === app.id
                              );
                            if (!isRun) return;
                            const usercfgs = initialState?.boxdata.usercfgs;
                            fetchSave.run({
                              key: config.userCfgs,
                              val: JSON.stringify({
                                ...usercfgs,
                                favapps: usercfgs?.favapps?.filter(
                                  (item) => item !== app.id
                                ),
                              }),
                            });
                          }}
                        >
                          <StarIcon color="primary" />
                        </IconButton>
                      )
                    }
                  >
                    <ListItemButton
                      sx={{
                        padding: 0,
                        pr: "0 !important",
                      }}
                      onClick={() => {
                        setVisible(false);
                        history.push(`/app/${app.id}`);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={app.name[0]}
                          src={app.icon}
                          sx={{
                            boxShadow: (theme) => theme.shadows[1],
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemTextDesc
                        primary={app.name}
                        secondary={app.repo}
                      />
                    </ListItemButton>
                  </CusListItem>
                </React.Fragment>
              );
            })}
        </List>
      </ProModal>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 24,
              width: 10,
              height: 10,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {boxdata?.syscfgs.envs.map((item) => {
          return (
            <MenuItem
              key={item.id}
              onClick={(event) => {
                if (!initialState) return;
                initialState.boxdata.syscfgs.env = item.id;
                setInitialState({ ...initialState });
                handleClose();
              }}
            >
              <Avatar alt={item.id} src={item.icons[iconIndex]} />
              {item.id}
            </MenuItem>
          );
        })}
      </Menu>
    </QueueAnim>
  );
};

export default HeaderContent;
