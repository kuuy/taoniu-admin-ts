import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {NextPageWithLayout} from '~/src/pages/_app'
import DashboardLayout from '~/src/layouts/dashboard'
import Head from 'next/head'
import {Box, Button, Container, Divider, Stack, SvgIcon, Typography} from '@mui/material'

import {StrategyContainer} from '~/src/sections/dydx/strategies/strategy-container'
import {StrategyListTable} from '~/src/sections/dydx/strategies/strategy-list-table'
import {StrategyListSearch} from '~/src/sections/dydx/strategies/strategy-list-search'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {useMounted} from '~/src/hooks/use-mounted'
import {strategiesApi} from '~/src/api/cryptos/dydx/strategies'
import {Strategy} from '~/src/types/dydx/strategy'
import {applySort} from '~/src/utils/apply-sort'

interface Filters {
  query?: string
  signal?: number
}

type SortDir = 'asc' | 'desc'

interface StrategiesSearchState {
  filters: Filters
  sortBy?: string
  sortDir?: SortDir
}

const useSearch = () => {
  const [search, setSearch] = useState<StrategiesSearchState>({
    filters: {
      query: undefined,
      signal: undefined,
    },
    sortBy: "entry_amount",
    sortDir: "desc"
  })

  return {
    search,
    updateSearch: setSearch
  }
}

interface StrategyStoreState {
  strategies: Strategy[];
}

const useListings = (searchState: StrategiesSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<StrategyStoreState>({
    strategies: [],
  })

  const listings = useCallback(async () => {
    try {
      const response = await strategiesApi.listings({
        symbol: "",
        signal: searchState.filters.signal,
        status: "",
        current: 1,
        pageSize: 50,
      })
      if (isMounted()) {
        if (typeof searchState.sortBy !== 'undefined' && typeof searchState.sortDir !== 'undefined') {
          response.data = applySort(
            response.data ?? [],
            searchState.sortBy,
            searchState.sortDir,
          )
        }
        setState({
          strategies: (response.data ?? []) as Strategy[],
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [searchState, isMounted])

  useEffect(() => {
      listings()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState],
  )

  return state
}

const Page:NextPageWithLayout = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const { search, updateSearch } = useSearch()
  const { strategies } = useListings(search)
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

  const handleStrategyOpen = useCallback((indicatorId: string) => {
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

  const handleStrategyClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: ""
    })
  }, [])

  return (
    <>
      <Head>
        <title>
          Dashboard: Strategy List | Devias Kit PRO
        </title>
      </Head>
      <Divider />
      <Box
        ref={rootRef}
        sx={{
          bottom: 0,
          display: 'flex',
          left: 0,
          strategy: 'absolute',
          right: 0,
          top: 0
        }}
      >
        <StrategyContainer>
          <Box sx={{ p: 3 }}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <div>
                <Typography variant="h4">
                  Strategies List
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
            <StrategyListSearch
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              sortBy=""
              sortDir="desc"
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
          <StrategyListTable
            onStrategySelect={handleStrategyOpen}
            strategies={strategies ?? []}
          />
        </StrategyContainer>
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
