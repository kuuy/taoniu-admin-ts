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

import type { TradingInfo } from '~/src/types/binance/spot/tradings/trigger'

interface TriggerListTableProps {
  onTriggerSelect?: (TriggerId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  tradings: TradingInfo[];
}

export const TriggerListTable: FC<TriggerListTableProps> = (props) => {
  const {
    onTriggerSelect,
    onPageChange,
    onRowsPerPageChange,
    tradings,
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
              TriggerID
            </TableCell>
            <TableCell>
              Buy Price
            </TableCell>
            <TableCell>
              Sell Price
            </TableCell>
            <TableCell>
              Buy Quantity
            </TableCell>
            <TableCell>
              Sell Quantity
            </TableCell>
            <TableCell>
              Buy OrderID
            </TableCell>
            <TableCell>
              Sell OrderID
            </TableCell>
            <TableCell>
              Status
            </TableCell>
            <TableCell>
              Created At
            </TableCell>
            <TableCell>
              Updated At
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradings.map((trading) => {
            return (
              <TableRow
                hover
                key={trading.id}
                // onClick={() => onRankingSelect?.(symbol)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Typography>
                    {trading.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.symbol}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.trigger_id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.buy_price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.sell_price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.buy_quantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.sell_quantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.buy_order_id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.sell_order_id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.created_at}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trading.updated_at}
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

TriggerListTable.propTypes = {
  onTriggerSelect: PropTypes.func,
  tradings: PropTypes.array.isRequired,
}
