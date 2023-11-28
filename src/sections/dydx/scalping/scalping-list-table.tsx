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

import type { Scalping } from '~/src/types/dydx/scalping'

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
              Symbol
            </TableCell>
            <TableCell>
              Side
            </TableCell>
            <TableCell>
              Capital
            </TableCell>
            <TableCell>
              Price
            </TableCell>
            <TableCell>
              Take Price
            </TableCell>
            <TableCell>
              Stop Price
            </TableCell>
            <TableCell>
              Timestamp
            </TableCell>
            <TableCell>
              Status
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
                    {scalping.symbol}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.side}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.capital}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.take_price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.stop_price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.timestamp}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {scalping.status}
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
