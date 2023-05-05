import { request, useLocation, useModel, useRequest } from "@@/exports";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Box, Paper, Stack, Typography } from "@mui/material";
import * as monaco from "monaco-editor";
import { useEffect, useState } from "react";
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

export default function CodeEdit() {
  const { initialState } = useModel("@@initialState");
  const { fetchRunScript } = useModel("api");
  const location = useLocation();
  const value =
    initialState?.boxdata?.syscfgs.env === "Surge" &&
    initialState?.boxdata.usercfgs.httpapi
      ? surgejs_demo.join("\n")
      : envjs_demo.join("\n");

  const [initialValue, setValue] = useState(value);
  const fetchUrl = useRequest((url) => request(url), {
    manual: true,
    formatResult: (res) => res,
    onSuccess: (response) => {
      setValue(response);
    },
  });

  useEffect(() => {
    const state: any = location.state;
    if (state?.url) fetchUrl.run(state.url);
  }, []);

  return (
    <Box pt={2}>
      <Paper>
        <Stack
          sx={{ p: 1 }}
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6">脚本编辑器</Typography>
          <Box
            component={"span"}
            onClick={() => {
              if (!initialValue) return;
              fetchRunScript.run({ script: initialValue });
            }}
          >
            <PlayCircleOutlineIcon color="primary" />
          </Box>
        </Stack>

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
            selectOnLineNumbers: true,
            minimap: { enabled: false },
          }}
        />
      </Paper>
    </Box>
  );
}
