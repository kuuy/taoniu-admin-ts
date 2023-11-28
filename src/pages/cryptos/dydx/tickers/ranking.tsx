import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import dynamic from 'next/dynamic'
import Script from 'next/script'

import {NextPageWithLayout} from '~/src/pages/_app'
import DashboardLayout from '~/src/layouts/dashboard'
import Head from 'next/head'
import {Box, Button, Container, Divider, Stack, SvgIcon, Typography} from '@mui/material'

import {RankingContainer} from '~/src/sections/dydx/tickers/ranking-container'
import {RankingListTable} from '~/src/sections/dydx/tickers/ranking-list-table'
import {RankingListSearch} from '~/src/sections/dydx/tickers/ranking-list-search'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {useMounted} from '~/src/hooks/use-mounted'
import {tickersApi} from '~/src/api/cryptos/dydx/tickers'

interface Filters {
  interval?: string
}

interface PaginateSearchState {
  filters: Filters
  fields: string[]
  page: number
  rowsPerPage: number
  sort: string
}

const useSearch = () => {
  const [search, setSearch] = useState<PaginateSearchState>({
    filters: {
      interval: "1m",
    },
    fields: [
      "price",
      "open",
      "high",
      "low",
      "volume",
      "quota",
      "change",
    ],
    page: 0,
    rowsPerPage: 15,
    sort: "change,-1",
  })

  return {
    search,
    updateSearch: setSearch,
  }
}

interface PaginateResultState {
  count: number
  data: string[]
}

const usePaginate = (searchState: PaginateSearchState) => {
  const isMounted = useMounted()
  const [state, setState] = useState<PaginateResultState>({
    count: 0,
    data: [],
  })
  // const { subscribe } = useSocket()

  const getRanking = useCallback(async () => {
    try {
      const response = await tickersApi.ranking({
        symbols: undefined,
        fields: searchState.fields.join(','),
        sort: searchState.sort,
        current: searchState.page+1,
        pageSize: searchState.rowsPerPage,
      })
      if (isMounted()) {
        // subscribe("/dydx", {
        //   "topic": "tickers",
        //   "symbols": [
        //     "MAGIC-USDT",
        //     "QTUM-USDT",
        //   ]
        // })
        setState({
          data: response.data ?? [],
          count: response.total ?? 0,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [searchState, isMounted])

  useEffect(() => {
      getRanking()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState])

  return state
}

const Page:NextPageWithLayout = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const { search, updateSearch } = useSearch()
  const { data, count } = usePaginate(search)
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: ""
  })

  const handleFiltersChange = useCallback((filters: Filters) => {
    setDrawer({
      isOpen: false,
      data: ""
    })
    updateSearch((prevState) => ({
      ...prevState,
      filters
    }))
  }, [updateSearch])

  const handlePageChange = useCallback((event: MouseEvent<HTMLButtonElement> | null, page: number) => {
    updateSearch((prevState) => ({
      ...prevState,
      page,
    }))
  }, [updateSearch])

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateSearch((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }))
  }, [updateSearch])

  return (
    <>
      <Head>
        <title>
          Tickers Ranking
        </title>
      </Head>
      <Divider />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0
          }}
        >
          <RankingContainer>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Tickers Ranking
                  </Typography>
                </div>
                <div>
                  <Button
                    startIcon={(
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Add
                  </Button>
                </div>
              </Stack>
            </Box>
            <Divider />
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={4}
              sx={{ pr: 3 }}
            >
              <RankingListSearch
                onFiltersChange={handleFiltersChange}
              />
              <Box>
                <Button
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </Box>
            </Stack>
            <Divider />
            <RankingListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              fields={search.fields}
              data={data || []}
              count={count}
              page={search.page}
              rowsPerPage={search.rowsPerPage}
            />
          </RankingContainer>
        </Box>
      </Box>
    </>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default Page
