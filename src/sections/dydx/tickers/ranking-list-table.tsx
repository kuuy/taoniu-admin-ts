import {
  type FC,
  type ChangeEvent,
  type MouseEvent,
} from 'react'

import PropTypes from 'prop-types'

import {
  Table,
  TableBody,
  TableCell, TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'

interface RankingListTableProps {
  onRankingSelect?: (RankingId: string) => void
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void
  fields: string[]
  data: string[]
  count?: number
  page?: number
  rowsPerPage?: number
}

export const RankingListTable: FC<RankingListTableProps> = (props) => {
  const {
    onRankingSelect,
    onPageChange = () => {},
    onRowsPerPageChange = () => {},
    fields,
    data,
    count = 0,
    page = 0,
    rowsPerPage = 0,
    ...other
  } = props

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
          {data.map((data) => {
            const values = data.split(",")
            const symbol = values.shift()

            return (
              <TableRow
                hover
                key={symbol}
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[15, 30]}
      />
    </div>
  )
}

RankingListTable.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  data: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}
