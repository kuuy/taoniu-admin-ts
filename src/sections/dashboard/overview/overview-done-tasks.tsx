import type { FC } from 'react'
import PropTypes from 'prop-types'

import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material'

import { appConfig } from '~/src/config'

interface OverviewDoneTasksProps {
  amount: number;
}

export const OverviewDoneTasks: FC<OverviewDoneTasksProps> = (props) => {
  const { amount } = props

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3,
        }}
      >
        <div>
          <img
            src={`${appConfig.baseUrl}/assets/iconly/iconly-glass-tick.svg`}
            width={48}
          />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Done Tasks
          </Typography>
          <Typography
            color="text.primary"
            variant="h4"
          >
            {amount}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          See all tasks
        </Button>
      </CardActions>
    </Card>
  )
}

OverviewDoneTasks.propTypes = {
  amount: PropTypes.number.isRequired
}
