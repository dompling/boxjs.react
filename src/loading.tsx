import { CircularProgress, Stack } from '@mui/material';

export default function () {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ p: 0, m: 0, minHeight: "100vh", minWidth: `100vw` }}
    >
      <CircularProgress />
    </Stack>
  );
}
