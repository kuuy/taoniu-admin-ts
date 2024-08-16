import {
  type FC,
  type ChangeEvent,
  type MouseEvent,
} from 'react';

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
} from '@mui/material';

import {
  type SeverityPillColor,
  SeverityPill,
} from '~/src/components/severity-pill';

import type { Position } from '~/src/types/position'

interface PositionListTableProps {
  onPositionSelect?: (PositionId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  positions: Position[];
}

export const PositionListTable: FC<PositionListTableProps> = (props) => {
  const {
    onPositionSelect,
    onPageChange,
    onRowsPerPageChange,
    positions,
    ...other
  } = props;

  return (
    <div {...other}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="200">
              Symbol
            </TableCell>
            <TableCell>
              Capital
            </TableCell>
            <TableCell>
              Leverage
            </TableCell>
            <TableCell>
              Entry Price
            </TableCell>
            <TableCell>
              Entry Quantity
            </TableCell>
            <TableCell>
              Entry Amount
            </TableCell>
            <TableCell>
              Notional
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position) => {
            return (
              <TableRow
                hover
                key={position.symbol}
                // onClick={() => onRankingSelect?.(symbol)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Typography>
                    {position.symbol}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {position.capital}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {position.leverage}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {position.entry_price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {position.entry_quantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {position.entry_amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {position.notional}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

PositionListTable.propTypes = {
  onPositionSelect: PropTypes.func,
  positions: PropTypes.array.isRequired,
};
