import type { FC } from 'react'
import PropTypes from 'prop-types'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material'
import {appConfig} from '~/src/config'

interface OverviewPendingIssuesProps {
  amount: number;
}

export const OverviewPendingIssues: FC<OverviewPendingIssuesProps> = (props) => {
  const { amount } = props;

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row'
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3
        }}
      >
        <div>
          <img
            src={`${appConfig.baseUrl}/assets/iconly/iconly-glass-info.svg`}
            width={48}
          />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Pending Issues
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
          See all issues
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewPendingIssues.propTypes = {
  amount: PropTypes.number.isRequired
};
