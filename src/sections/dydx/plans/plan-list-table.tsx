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

import type { Plan } from '~/src/types/dydx/plan'

interface PlanListTableProps {
  onPlanSelect?: (PlanId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  plans: Plan[];
}

export const PlanListTable: FC<PlanListTableProps> = (props) => {
  const {
    onPlanSelect,
    onPageChange,
    onRowsPerPageChange,
    plans,
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
              Price
            </TableCell>
            <TableCell>
              Quantity
            </TableCell>
            <TableCell>
              Amount
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
          {plans.map((plan) => {
            return (
              <TableRow
                hover
                key={plan.id}
                // onClick={() => onRankingSelect?.(symbol)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Typography>
                    {plan.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {plan.symbol}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {plan.side}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {plan.price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {plan.quantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {plan.amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {plan.timestamp}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {plan.status}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}

PlanListTable.propTypes = {
  onPlanSelect: PropTypes.func,
  plans: PropTypes.array.isRequired,
}
