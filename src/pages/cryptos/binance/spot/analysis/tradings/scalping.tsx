import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {NextPageWithLayout} from '~/src/pages/_app'
import DashboardLayout from '~/src/layouts/dashboard'
import Head from 'next/head'
import {Box, Button, Container, Divider, Stack, SvgIcon, Typography} from '@mui/material'

import {ScalpingContainer} from '~/src/sections/binance/spot/analysis/tradings/scalping-container'
import {ScalpingListTable} from '~/src/sections/binance/spot/analysis/tradings/scalping-list-table'
import {ScalpingListSearch} from '~/src/sections/binance/spot/analysis/tradings/scalping-list-search'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {useMounted} from '~/src/hooks/use-mounted'
import {scalpingApi} from '~/src/api/cryptos/binance/spot/analysis/tradings/scalping'
import {Scalping} from '~/src/types/binance/spot/analysis/tradings/scalping'
import {applySort} from '~/src/utils/apply-sort'
import {Order} from '~/src/types/binance/futures/order'

interface Filters {
  query?: string
}

type SortDir = 'asc' | 'desc';

interface ScalpingsSearchState {
  filters: Filters;
  sortBy?: string;
  sortDir?: SortDir;
}

const useSearch = () => {
  const [search, setSearch] = useState<ScalpingsSearchState>({
    filters: {
      query: undefined,
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
  scalping: Scalping[];
}

const useGets = (searchState: ScalpingsSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<ScalpingStoreState>({
    scalping: [],
  })

  const listings = useCallback(async () => {
    try {
      const response = await scalpingApi.listings({
        current: 1,
        pageSize: 50,
      })
      if (isMounted()) {
        // if (typeof searchState.sortBy !== 'undefined' && typeof searchState.sortDir !== 'undefined') {
        //   response.data = applySort(
        //     response.data ?? [],
        //     searchState.sortBy,
        //     searchState.sortDir,
        //   )
        // }
        setState({
          scalping: (response.data ?? []) as Scalping[],
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
  const { scalping } = useGets(search)
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

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateSearch((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
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
          Dashboard: Scalping List | Taoniu
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
                    Scalpings List
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
              onRowsPerPageChange={handleRowsPerPageChange}
              scalping={scalping ?? []}
            />
          </ScalpingContainer>
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
