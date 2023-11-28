import {
  type FC,
  type ChangeEvent,
  type MouseEvent,
} from "react"

import PropTypes from 'prop-types'
import { format } from 'date-fns'
import numeral from 'numeral'

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow, Theme,
  Typography
} from "@mui/material"

import {
  type SeverityPillColor,
  SeverityPill,
} from "~/src/components/severity-pill"
import type { Indicator, IndicatorStatus } from '~/src/types/indicator'

const statusMap: Record<IndicatorStatus, SeverityPillColor> = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error',
}

interface IndicatorListTableProps {
  onIndicatorSelect?: (IndicatorId: string) => void
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void
  Indicators: Indicator[]
  IndicatorsCount?: number
  page?: number
  rowsPerPage?: number
}

export const IndicatorListTable: FC<IndicatorListTableProps> = (props) => {
  const {
    onIndicatorSelect,
    onPageChange,
    onRowsPerPageChange,
    Indicators,
    IndicatorsCount,
    page,
    rowsPerPage,
    ...other
  } = props

  return (
    <div {...other}>
      <Table>
        <TableBody>
          {Indicators.map((Indicator) => {
            const createdAtMonth = format(Indicator.createdAt, 'LLL').toUpperCase();
            const createdAtDay = format(Indicator.createdAt, 'd');
            const totalAmount = numeral(Indicator.totalAmount).format(`${Indicator.currency}0,0.00`);
            const statusColor = statusMap[Indicator.status] || 'warning';

            return (
              <TableRow
                hover
                key={Indicator.id}
                onClick={() => onIndicatorSelect?.(Indicator.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme: Theme) => theme.palette.mode === 'dark'
                        ? 'neutral.800'
                        : 'neutral.200',
                      bIndicatorRadius: 2,
                      maxWidth: 'fit-content',
                      ml: 3,
                      p: 1
                    }}
                  >
                    <Typography
                      align="center"
                      variant="subtitle2"
                    >
                      {createdAtMonth}
                    </Typography>
                    <Typography
                      align="center"
                      variant="h6"
                    >
                      {createdAtDay}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">
                      {Indicator.number}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Total of
                      {' '}
                      {totalAmount}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color={statusColor}>
                    {Indicator.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={Indicators.length}
        onPageChange={(): void => { }}
        onRowsPerPageChange={(): void => { }}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  )
}

IndicatorListTable.propTypes = {
  onIndicatorSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  Indicators: PropTypes.array.isRequired,
  IndicatorsCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}
