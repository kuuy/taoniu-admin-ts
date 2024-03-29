import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {NextPageWithLayout} from '~/src/pages/_app'
import DashboardLayout from '~/src/layouts/dashboard'
import Head from 'next/head'
import {Box, Button, Container, Divider, Stack, SvgIcon, Typography} from '@mui/material'

import {ScalpingContainer} from '~/src/sections/binance/spot/tradings/scalping/scalping-container'
import {ScalpingListTable} from '~/src/sections/binance/spot/tradings/scalping/scalping-list-table'
import {ScalpingListSearch} from '~/src/sections/binance/spot/tradings/scalping/scalping-list-search'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {useMounted} from '~/src/hooks/use-mounted'
import {scalpingApi} from '~/src/api/cryptos/binance/spot/tradings/scalping'
import {TradingInfo} from '~/src/types/binance/spot/tradings/scalping'
import {applySort} from '~/src/utils/apply-sort'

interface Filters {
  query?: string
  side?: number
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
      side: undefined,
    },
    sortBy: "entry_amount",
    sortDir: "desc"
  })

  return {
    search,
    updateSearch: setSearch
  }
}

interface ScalpingStoreState {
  tradings: TradingInfo[];
}

const useListings = (searchState: StrategiesSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<ScalpingStoreState>({
    tradings: [],
  })

  const listings = useCallback(async () => {
    try {
      const response = await scalpingApi.listings({
        symbol: "",
        side: searchState.filters.side,
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
          tradings: (response.data ?? []) as TradingInfo[],
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
  const { tradings } = useListings(search)
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

  const handleScalpingOpen = useCallback((indicatorId: string) => {
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

  const handleScalpingClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: ""
    })
  }, [])

  return (
    <>
      <Head>
        <title>
          Dashboard: Scalping Tradings List | Devias Kit PRO
        </title>
      </Head>
      <Divider />
      <Box
        ref={rootRef}
        sx={{
          bottom: 0,
          display: 'flex',
          left: 0,
          scalping: 'absolute',
          right: 0,
          top: 0
        }}
      >
        <ScalpingContainer>
          <Box sx={{ p: 3 }}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <div>
                <Typography variant="h4">
                  Scalping Tradings List
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
            <ScalpingListSearch
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
          <ScalpingListTable
            onScalpingSelect={handleScalpingOpen}
            tradings={tradings ?? []}
          />
        </ScalpingContainer>
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
