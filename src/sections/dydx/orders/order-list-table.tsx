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

import type { Order } from '~/src/types/dydx/order'

interface OrderListTableProps {
  onOrderSelect?: (OrderId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  orders: Order[];
}

export const OrderListTable: FC<OrderListTableProps> = (props) => {
  const {
    onOrderSelect,
    onPageChange,
    onRowsPerPageChange,
    orders,
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
              OrderID
            </TableCell>
            <TableCell>
              Type
            </TableCell>
            <TableCell>
              PositionSide
            </TableCell>
            <TableCell>
              Side
            </TableCell>
            <TableCell>
              Price
            </TableCell>
            <TableCell>
              Quantity
            </TableCell>
            <TableCell>
              OpenTime
            </TableCell>
            <TableCell>
              UpdateTime
            </TableCell>
            <TableCell>
              ReduceOnly
            </TableCell>
            <TableCell>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            return (
              <TableRow
                hover
                key={order.id}
                // onClick={() => onRankingSelect?.(symbol)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Typography>
                    {order.symbol}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {order.order_id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {order.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {order.position_side}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {order.side}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {order.price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {order.quantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {order.open_time}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {order.update_time}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {order.reduce_only}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {order.status}
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

OrderListTable.propTypes = {
  onOrderSelect: PropTypes.func,
  orders: PropTypes.array.isRequired,
};
