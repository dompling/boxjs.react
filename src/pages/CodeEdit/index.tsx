import { request, useModel, useRequest, useSearchParams } from "@@/exports";
import { javascript } from "@codemirror/lang-javascript";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import UploadIcon from "@mui/icons-material/UploadFile";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import * as monaco from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";

export { monaco };

const envjs_demo = [
  "/** ",
  " * 注意: ",
  " * 在这里你可以使用完整的 EnvJs 环境",
  " * ",
  " * 同时: ",
  " * 你`必须`手动调用 $done()",
  " * ",
  " * 因为: ",
  " * BoxJs 不为主动执行的脚本调用 $done()",
  " * 而把 $done 的时机完全交由脚本控制",
  " * ",
  " * 最后: ",
  " * 这段脚本是可以直接运行的!",
  " */ ",
  'const host = $.getdata("boxjs_host")',
  'console.log("输出的内容是返回给浏览器的!")',
  "$.msg($.name, host)",
  "$.done()",
  "// $done() 或 $.done() 都可以",
];
const surgejs_demo = [
  "/** ",
  " * 注意: ",
  " * 你正在使用 Surge HTTP-API 环境",
  " * ",
  " * 在这里：你不可以使用 EnvJs",
  " * 请确保：你的脚本能被 Surge 独立运行",
  " * ",
  " * 最后: ",
  " * 这段脚本是可以直接运行的!",
  " */ ",
  'const host = $persistentStore.read("boxjs_host")',
  'const msgs = [""]',
  "",
  'msgs.push("这是日志的内容")',
  'msgs.push("BoxJs host: " + host)',
  "",
  'console.log(msgs.join("\\n"))',
  "$done()",
];

const CodeEdit: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const $tip = useModel("alert");
  const { initialState } = useModel("@@initialState");
  const { fetchRunScript } = useModel("api");
  const [searchParams] = useSearchParams();
  const queryUrl = searchParams.get("url");

  const value =
    initialState?.boxdata?.syscfgs.env === "Surge" &&
    initialState?.boxdata.usercfgs.httpapi
      ? surgejs_demo.join("\n")
      : envjs_demo.join("\n");

  const [initialValue, setValue] = useState(queryUrl ? "" : value);
  const fetchUrl = useRequest((url) => request(url), {
    manual: true,
    formatResult: (res) => res,
    onSuccess: (response) => {
      setValue(response);
    },
  });

  useEffect(() => {
    if (queryUrl) fetchUrl.run(queryUrl);
  }, []);

  // @ts-ignore
  return (
    <Box pt={2}>
      <Paper>
        <Stack
          sx={{ p: 1 }}
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction="row" alignItems={"center"} gap={1}>
            <Typography variant="h6">脚本编辑器</Typography>
            <Stack
              onClick={() => {
                inputRef.current?.click();
              }}
              alignItems={"center"}
              direction="row"
            >
              <UploadIcon color="primary" sx={{ fontSize: 24 }} />
            </Stack>
          </Stack>

          <Stack
            alignItems={"center"}
            sx={{ position: "relative" }}
            onClick={() => {
              if (!initialValue) return;
              fetchRunScript.run({ script: initialValue });
            }}
          >
            <PlayCircleFilledIcon color="primary" sx={{ fontSize: 24 }} />
            {fetchRunScript.loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Stack>
        </Stack>

        {initialState?.isMobile ? (
          <CodeMirror
            value={initialValue}
            style={{ fontSize: 12 }}
            maxWidth="100%"
            extensions={[javascript()]}
            height={`calc(100vh - 240px)`}
            theme={initialState?.mode === "dark" ? "dark" : "light"}
            onChange={(value) => setValue(value)}
          />
        ) : (
          <MonacoEditor
            width="100%"
            value={fetchUrl.loading ? `//...Loading` : initialValue}
            height={`calc(100vh - 200px)`}
            theme={initialState?.mode === "dark" ? "vs-dark" : "vs"}
            onChange={(editorValue) => {
              setValue(editorValue);
            }}
            options={{
              fontSize: 12,
              tabSize: 2,
              contextmenu: false,
              selectOnLineNumbers: true,
              minimap: { enabled: false },
            }}
          />
        )}
      </Paper>
      <input
        ref={inputRef}
        type={"file"}
        style={{ display: "none" }}
        onChange={() => {
          const files = inputRef.current?.files;
          if (!files?.length)
            return $tip.alert({ message: "请选择文件", type: "error" });
          const reader = new FileReader(); //新建一个FileReader
          reader.readAsText(files[0], "UTF-8"); //读取文件
          reader.onload = async (evt) => {
            //读取完文件之后会回来这里
            const fileString: any = evt?.target?.result; // 读取文件内容
            try {
              setValue(fileString);
            } catch (e) {
              console.log(e);
            }
          };
        }}
      />
    </Box>
  );
};

export default CodeEdit;