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
  TableCell,
  TablePagination,
  TableRow, Theme,
  Typography
} from '@mui/material';

import {
  type SeverityPillColor,
  SeverityPill,
} from '~/src/components/severity-pill';

import type { Trading, TradingStatus } from '~/src/types/trading'

const statusMap: Record<TradingStatus, SeverityPillColor> = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error'
};

interface TradingListTableProps {
  onTradingSelect?: (tradingId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  tradings: Trading[];
  tradingsCount?: number;
  page?: number;
  rowsPerPage?: number;
}

export const TradingListTable: FC<TradingListTableProps> = (props) => {
  const {
    onTradingSelect,
    onPageChange,
    onRowsPerPageChange,
    tradings,
    tradingsCount,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Table>
        <TableBody>
          {tradings.map((trading) => {
            const createdAtMonth = format(trading.createdAt, 'LLL').toUpperCase();
            const createdAtDay = format(trading.createdAt, 'd');
            const totalAmount = numeral(trading.totalAmount).format(`${trading.currency}0,0.00`);
            const statusColor = statusMap[trading.status] || 'warning';

            return (
              <TableRow
                hover
                key={trading.id}
                onClick={() => onTradingSelect?.(trading.id)}
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
                      btradingRadius: 2,
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
                      {trading.number}
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
                    {trading.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={tradings.length}
        onPageChange={(): void => { }}
        onRowsPerPageChange={(): void => { }}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

TradingListTable.propTypes = {
  onTradingSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  tradings: PropTypes.array.isRequired,
  tradingsCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
