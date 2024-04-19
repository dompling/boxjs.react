import ToggleColorMode from "@/components/Theme";
import { useModel } from "@@/exports";
import { CircularProgress, Stack } from "@mui/material";

export default function () {
  const { initialState } = useModel("@@initialState");
  let bgimg = initialState?.boxdata?.usercfgs?.bgimg;
  const bgimgs = initialState?.boxdata?.usercfgs?.bgimgs
    ?.split(`\n`)
    ?.map((item) => {
      const [name = "", url = ""] = item?.split(",") || [];
      return { name, url };
    });

  if (bgimg === "跟随系统") {
    const hasdark = bgimgs?.find(
      (bgimg) => bgimg.name == "暗黑" || bgimg.name == "dark"
    );
    const haslight = bgimgs?.find(
      (bgimg) => bgimg.name == "明亮" || bgimg.name == "light"
    );
    const darkbgimg = hasdark ? hasdark.url : ``;
    const lightbgimg = haslight ? haslight.url : ``;

    initialState?.mode === "dark" ? (bgimg = darkbgimg) : (bgimg = lightbgimg);
  }

  return (
    <ToggleColorMode>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          p: 0,
          m: 0,
          minHeight: "100vh",
          minWidth: `100vw`,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "transparent",
          backgroundImage: bgimg
            ? `linear-gradient(to bottom,rgba(0,0,0,.2) 0,transparent 76px), url(${bgimg}?_=${initialState?.random})`
            : undefined,
        }}
      >
        <CircularProgress />
      </Stack>
    </ToggleColorMode>
  );
}
