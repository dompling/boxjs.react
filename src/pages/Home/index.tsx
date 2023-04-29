import { history, useModel } from '@@/exports';
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  overflow: 'hidden',
  background: 'unset',
  boxShadow: 'unset',
  borderRadius: 0,
}));

export default function Page() {
  const { initialState } = useModel('@@initialState');
  const UI = initialState?.ui(initialState.boxdata);
  const favApp = initialState?.apps.filter((item) => {
    return initialState?.boxdata?.usercfgs.favapps.indexOf(item.id) > -1;
  });

  return (
    <Box pt={4}>
      <Grid container spacing={4}>
        {favApp?.map((item) => {
          UI?.loadAppBaseInfo(item);
          return (
            <Grid
              key={`${item.id}/${item.author}/${item.name}`}
              item
              xs={4}
              sm={3}
              md={2}
            >
              <Item
                onClick={() => {
                  history.push(`/app/${item.id}/${item.author}`);
                }}
              >
                <Stack
                  spacing={1}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Avatar
                    variant="square"
                    alt={item.name}
                    src={item.icon}
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: (theme) => theme.shadows[4],
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 10,
                      color: initialState?.boxdata.usercfgs.bgimg
                        ? '#fff'
                        : 'unset',
                      width: `100%`,
                      fontWeight: 'bold',
                      textShadow: initialState?.boxdata.usercfgs.bgimg
                        ? 'black 0.1em 0.1em 0.2em'
                        : 'unset',
                    }}
                    noWrap
                  >
                    {item.name}
                  </Typography>
                </Stack>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
