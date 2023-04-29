import { CircularProgress, Stack } from '@mui/material';

export default function () {
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ p: 0, m: 0, w: 1, h: 1 }}
    >
      <CircularProgress />
    </Stack>
  );
}
