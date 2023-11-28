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

import type { Trigger } from '~/src/types/binance/futures/trigger'

interface TriggerListTableProps {
  onTriggerSelect?: (TriggerId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  triggers: Trigger[];
}

export const TriggerListTable: FC<TriggerListTableProps> = (props) => {
  const {
    onTriggerSelect,
    onPageChange,
    onRowsPerPageChange,
    triggers,
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
          {triggers.map((trigger) => {
            return (
              <TableRow
                hover
                key={trigger.id}
                // onClick={() => onRankingSelect?.(symbol)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Typography>
                    {trigger.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trigger.symbol}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trigger.side}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trigger.capital}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trigger.price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trigger.take_price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trigger.stop_price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trigger.timestamp}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {trigger.status}
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
  triggers: PropTypes.array.isRequired,
}
