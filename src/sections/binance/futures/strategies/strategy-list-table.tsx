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

import type { Strategy } from '~/src/types/binance/futures/strategy'

interface StrategyListTableProps {
  onStrategySelect?: (StrategyId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  strategies: Strategy[];
}

export const StrategyListTable: FC<StrategyListTableProps> = (props) => {
  const {
    onStrategySelect,
    onPageChange,
    onRowsPerPageChange,
    strategies,
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
              Indicator
            </TableCell>
            <TableCell>
              Signal
            </TableCell>
            <TableCell>
              Price
            </TableCell>
            <TableCell>
              Timestamp
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {strategies.map((strategy) => {
            return (
              <TableRow
                hover
                key={strategy.id}
                // onClick={() => onRankingSelect?.(symbol)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Typography>
                    {strategy.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {strategy.symbol}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {strategy.indicator}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {strategy.signal}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {strategy.price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {strategy.timestamp}
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

StrategyListTable.propTypes = {
  onStrategySelect: PropTypes.func,
  strategies: PropTypes.array.isRequired,
}
