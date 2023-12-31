import type { Theme } from '@mui/material'
import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material'

import { RouterLink } from '~/src/components/router-link'
import { paths } from '~/src/paths'
import {appConfig} from '~/src/config'
import {NextPageWithLayout} from '~/src/pages/_app'

const Page: NextPageWithLayout = () => {
  const mdUp = useMediaQuery((theme: Theme) => {
    const {breakpoints} = theme
    return breakpoints.down('md')
  })

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          py: '80px'
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 6
            }}
          >
            <Box
              alt="Not authorized"
              component="img"
              src={`${appConfig.baseUrl}/assets/errors/error-401.png`}
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Typography
            align="center"
            variant={mdUp ? 'h1' : 'h4'}
          >
            401: Authorization required
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            You either tried some shady route or you came here by mistake. Whichever it is, try
            using the navigation.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6
            }}
          >
            <Button
              component={RouterLink}
              href={paths.index}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Page
