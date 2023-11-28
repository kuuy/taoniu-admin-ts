import type { FC } from 'react'
import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'

import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import InfoCircleIcon from '@untitled-ui/icons-react/build/esm/InfoCircle'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from '@mui/material';
import { applySort } from '~/src/utils/apply-sort'
import {appConfig} from '~/src/config'

type SortDir = 'asc' | 'desc';

const flagMap: Record<string, string> = {
  ca: `${appConfig.baseUrl}/assets/flags/flag-ca.svg`,
  de: `${appConfig.baseUrl}/assets/flags/flag-de.svg`,
  es: `${appConfig.baseUrl}/assets/flags/flag-es.svg`,
  ru: `${appConfig.baseUrl}/assets/flags/flag-ru.svg`,
  uk: `${appConfig.baseUrl}/assets/flags/flag-uk.svg`,
  us: `${appConfig.baseUrl}/assets/flags/flag-us.svg`
}

interface Visit {
  id: string
  name: string
  seoPercentage: number
  value: number
}

interface AnalyticsVisitsByCountryProps {
  visits: Visit[]
}

export const AnalyticsVisitsByCountry: FC<AnalyticsVisitsByCountryProps> = (props) => {
  const { visits } = props
  const [sort, setSort] = useState<SortDir>('desc')

  const sortedVisits = useMemo(
    () => {
      return applySort(visits, 'value', sort);
    },
    [visits, sort]
  )

  const handleSort = useCallback(
    (): void => {
      setSort((prevState) => {
        if (prevState === 'asc') {
          return 'desc'
        }

        return 'asc'
      })
    },
    []
  )

  return (
    <Card>
      <CardHeader
        title="Visits by Country"
        action={(
          <Tooltip title="Refresh rate is 24h">
            <SvgIcon color="action">
              <InfoCircleIcon />
            </SvgIcon>
          </Tooltip>
        )}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Country
            </TableCell>
            <TableCell sortDirection={sort}>
              <TableSortLabel
                active
                direction={sort}
                onClick={handleSort}
              >
                Value
              </TableSortLabel>
            </TableCell>
            <TableCell>
              SEO
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedVisits.map((visit) => {
            const visits = numeral(visit.value).format('0,0');
            const flag = flagMap[visit.id];

            return (
              <TableRow
                key={visit.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <Box
                      sx={{
                        height: 16,
                        width: 16,
                        '& img': {
                          height: 16,
                          width: 16
                        }
                      }}
                    >
                      <img
                        alt={visit.name}
                        src={flag}
                      />
                    </Box>
                    <Typography
                      sx={{ ml: 1 }}
                      variant="subtitle2"
                    >
                      {visit.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {visits}
                </TableCell>
                <TableCell>
                  {visit.seoPercentage}%
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
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
          See more
        </Button>
      </CardActions>
    </Card>
  )
}

AnalyticsVisitsByCountry.propTypes = {
  visits: PropTypes.array.isRequired,
}
