import {
  type FC,
  type ChangeEvent,
  type MouseEvent,
} from 'react'

import PropTypes from 'prop-types'
import { format } from 'date-fns'
import numeral from 'numeral'
import {
  Box,
  Table,
  TableBody,
  TableCell, TableHead,
  TablePagination,
  TableRow, Theme,
  Typography
} from '@mui/material'

import type { Scalping } from '~/src/types/binance/spot/analysis/tradings/scalping'

interface ScalpingListTableProps {
  onScalpingSelect?: (ScalpingId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  scalping: Scalping[];
}

export const ScalpingListTable: FC<ScalpingListTableProps> = (props) => {
  const {
    onScalpingSelect,
    onPageChange,
    onRowsPerPageChange,
    scalping,
    ...other
  } = props;

  return (
    <div {...other}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="200">
              ID
            </TableCell>
            <TableCell>
              Day
            </TableCell>
            <TableCell>
              Buys Count
            </TableCell>
            <TableCell>
              Sells Count
            </TableCell>
            <TableCell>
              Buys Amount
            </TableCell>
            <TableCell>
              Sells Amount
            </TableCell>
            <TableCell>
              Profit
            </TableCell>
            <TableCell>
              Additive Profit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scalping.map((scalping) => {
            return (
              <TableRow
                hover
                key={scalping.id}
                // onClick={() => onRankingSelect?.(symbol)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Typography>
                    {scalping.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.day}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.buys_count}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.sells_count}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.buys_amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.sells_amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.profit}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.additive_profit}
                  </Typography>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

ScalpingListTable.propTypes = {
  onScalpingSelect: PropTypes.func,
  scalping: PropTypes.array.isRequired,
}
