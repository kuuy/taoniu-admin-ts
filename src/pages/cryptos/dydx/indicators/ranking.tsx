import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import dynamic from 'next/dynamic'
import Script from 'next/script'

import {NextPageWithLayout} from '~/src/pages/_app'
import DashboardLayout from '~/src/layouts/dashboard'
import Head from 'next/head'
import {Box, Button, Container, Divider, Stack, SvgIcon, Typography} from '@mui/material'

import {RankingContainer} from '~/src/sections/dashboard/indicators/ranking-container'
import {RankingListTable} from '~/src/sections/dashboard/indicators/ranking-list-table'
import {RankingListSearch} from '~/src/sections/dashboard/indicators/ranking-list-search'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {Ranking} from '~/src/types/indicator-ranking'
import {useMounted} from '~/src/hooks/use-mounted'
import {indicatorsApi} from '~/src/api/cryptos/dydx/indicators'

interface Filters {
  query?: string;
  interval?: string;
}

type SortDir = 'asc' | 'desc';

interface RankingSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

interface RankingSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

const useSearch = () => {
  const [search, setSearch] = useState<RankingSearchState>({
    filters: {
      query: undefined,
      interval: "1m",
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "createdAt",
    sortDir: "desc"
  })

  return {
    search,
    updateSearch: setSearch
  }
}

interface RankingStoreState {
  ranking: string[];
  rankingCount: number;
}

const fields = [
  // "r3",
  // "r2",
  "r1",
  "s1",
  // "s2",
  // "s3",
  "poc",
  "vah",
  "val",
  "poc_ratio",
  "profit_target",
  "stop_loss_point",
  "risk_reward_ratio",
  "take_profit_ratio",
]

const useRanking = (searchState: RankingSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<RankingStoreState>({
    ranking: [],
    rankingCount: 0
  })

  const getRanking = useCallback(async () => {
    try {
      const response = await indicatorsApi.ranking({
        symbols: "",
        interval: searchState.filters.interval ?? '1d',
        fields: fields.join(','),
        sort: "poc_ratio,-1",
        current: 1,
        pageSize: 100,
      })
      if (isMounted()) {
        setState({
          ranking: response.data ?? [],
          rankingCount: response.total ?? 0
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
  const { ranking, rankingCount } = useRanking(search)
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

  const handleSortChange = useCallback((sortDir: SortDir) => {
    updateSearch((prevState) => ({
      ...prevState,
      sortDir
    }))
  }, [updateSearch])

  const handlePageChange = useCallback((event: MouseEvent<HTMLButtonElement> | null, page: number) => {
    updateSearch((prevState) => ({
      ...prevState,
      page
    }))
  }, [updateSearch])

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateSearch((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }))
  }, [updateSearch])

  const handleRankingOpen = useCallback((indicatorId: string) => {
    // Close drawer if is the same indicator

    if (drawer.isOpen && drawer.data === indicatorId) {
      setDrawer({
        isOpen: false,
        data: ""
      })
      return
    }

    setDrawer({
      isOpen: true,
      data: indicatorId,
    })
  }, [drawer])

  const handleRankingClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: ""
    })
  }, [])

  return (
    <>
      <Head>
        <title>
          Dashboard: Ranking List | Devias Kit PRO
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
                    Indicators Ranking
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
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
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
              onRankingSelect={handleRankingOpen}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              fields={fields || []}
              ranking={ranking || []}
              rankingCount={rankingCount}
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
);

export default Page;
