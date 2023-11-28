import { Box, Button, Card, Stack, Typography } from '@mui/material'
import {FC} from 'react'
import {appConfig} from '~/src/config'

export const CryptoUpgrade: FC = (props) => (
  <Card {...props}>
    <Stack
      alignItems="center"
      spacing={2}
      sx={{ p: 3 }}
    >
      <Box
        sx={{
          width: 100,
          '& img': {
            width: '100%'
          }
        }}
      >
        <img src={`${appConfig.baseUrl}/assets/iconly/iconly-glass-tick.svg`} />
      </Box>
      <Typography
        align="center"
        variant="h6"
      >
        Upgrade your account to PRO.
      </Typography>
      <Typography
        align="center"
        variant="body2"
      >
        Unlock exclusive features like Test Networks, Test Swaps, and more.
      </Typography>
      <Button variant="contained">
        Upgrade
      </Button>
    </Stack>
  </Card>
);
