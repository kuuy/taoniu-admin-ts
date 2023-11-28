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

interface RankingListTableProps {
  onRankingSelect?: (RankingId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  fields: string[];
  ranking: string[];
  rankingCount?: number;
  page?: number;
  rowsPerPage?: number;
}

export const RankingListTable: FC<RankingListTableProps> = (props) => {
  const {
    onRankingSelect,
    onPageChange,
    onRowsPerPageChange,
    fields,
    ranking,
    rankingCount,
    page,
    rowsPerPage,
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
            {fields.map((field, i) => (
              <TableCell key={i}>
                {field}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((data) => {
            const values = data.split(",")
            const symbol = values.shift()

            return (
              <TableRow
                hover
                key={symbol}
                // onClick={() => onRankingSelect?.(symbol)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Typography>
                    {symbol}
                  </Typography>
                </TableCell>
                {values.map((value, i) => {
                  if (fields[i] == "change") {
                    value = `${(Number(value) * 100).toFixed(2)}%`
                  }
                  return (
                    <TableCell key={i}>
                      {value}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={ranking.length}
        onPageChange={(): void => { }}
        onRowsPerPageChange={(): void => { }}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

RankingListTable.propTypes = {
  onRankingSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  ranking: PropTypes.array.isRequired,
  rankingCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
