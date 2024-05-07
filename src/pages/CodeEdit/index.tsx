import footerStyle from "@/components/FooterToolNav/index.less";
import headerStyle from "@/components/HeaderContent/index.less";
import { request, useModel, useRequest, useSearchParams } from "@@/exports";
import { javascript } from "@codemirror/lang-javascript";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import moment from "moment";
import * as monaco from "monaco-editor";
import QueueAnim from "rc-queue-anim";
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

  const footerRect =
    (document
      .getElementsByClassName(footerStyle.footer_container)?.[0]
      ?.getBoundingClientRect().height || 100) + 30;

  const headerRect =
    (document
      .getElementsByClassName(headerStyle.header_container)?.[0]
      ?.getBoundingClientRect().height || 160) + 60;
  const calc = footerRect + headerRect;

  useEffect(() => {
    if (queryUrl) fetchUrl.run(queryUrl);
  }, []);

  return (
    <QueueAnim interval={[100, 0]} appear={!!initialState?.boxdata.usercfgs.isAnimate}>
      <Box key={"container"} pt={2}>
        <Paper>
          <Stack
            sx={{ p: 1 }}
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction="row" alignItems={"center"} gap={1}>
              <Typography variant="h6">脚本编辑器</Typography>
              <Stack alignItems={"center"} direction="row" spacing={2}>
                <CloudUploadIcon
                  color="primary"
                  sx={{ fontSize: 24 }}
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                />
                <CloudDownloadIcon
                  color="primary"
                  sx={{ fontSize: 24 }}
                  onClick={() => {
                    const blob = new Blob([initialValue], {
                      type: "text/plain;charset=utf-8;",
                    });
                    const now = moment().format("YYYY_MM_DD_HH_mm_ss");
                    const urls = queryUrl?.split("/") || [];
                    const urlFileName = urls[urls.length - 1] || "未知名称";
                    let fileName = `${urlFileName.replace(
                      ".js",
                      ""
                    )}_${now}.js`;
                    let objectUrl = URL.createObjectURL(blob);
                    let link = document.createElement("a");
                    link.href = objectUrl;
                    link.setAttribute("download", fileName);
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                  }}
                />
              </Stack>
            </Stack>

            <Stack
              alignItems={"center"}
              sx={{ position: "relative" }}
              onClick={() => {
                if (!initialValue) return;
                if (fetchRunScript.loading) return;
                fetchRunScript.run({ script: initialValue });
              }}
            >
              {fetchRunScript.loading ? (
                <CircularProgress size={24} />
              ) : (
                <PlayCircleFilledIcon color="primary" sx={{ fontSize: 24 }} />
              )}
            </Stack>
          </Stack>

          {initialState?.isMobile ? (
            <CodeMirror
              value={initialValue}
              style={{ fontSize: 12 }}
              maxWidth="100%"
              extensions={[javascript()]}
              height={`calc(100vh - ${calc}px)`}
              theme={initialState?.mode === "dark" ? "dark" : "light"}
              onChange={(value) => setValue(value)}
            />
          ) : (
            <MonacoEditor
              width="100%"
              value={fetchUrl.loading ? `//...Loading` : initialValue}
              height={`calc(100vh - ${calc - 90}px)`}
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
    </QueueAnim>
  );
};

export default CodeEdit;
