import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {NextPageWithLayout} from '~/src/pages/_app'
import DashboardLayout from '~/src/layouts/dashboard'
import Head from 'next/head'
import {Box, Button, Container, Divider, Stack, SvgIcon, Typography} from '@mui/material'

import {PositionContainer} from '~/src/sections/dydx/positions/position-container'
import {PositionListTable} from '~/src/sections/dydx/positions/position-list-table'
import {PositionListSearch} from '~/src/sections/dydx/positions/position-list-search'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {useMounted} from '~/src/hooks/use-mounted'
import {positionsApi} from '~/src/api/cryptos/dydx/positions'
import {Position} from '~/src/types/position'

interface Filters {
  query?: string;
  side?: number;
}

type SortDir = 'asc' | 'desc';

interface PositionsSearchState {
  filters: Filters;
  sortBy?: string;
  sortDir?: SortDir;
}

const useSearch = () => {
  const [search, setSearch] = useState<PositionsSearchState>({
    filters: {
      query: undefined,
      side: 1,
    },
    sortBy: "entry_amount",
    sortDir: "desc"
  })

  return {
    search,
    updateSearch: setSearch
  }
}

interface PositionStoreState {
  positions: Position[];
}

const useGets = (searchState: PositionsSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<PositionStoreState>({
    positions: [],
  })

  const gets = useCallback(async () => {
    try {
      const response = await positionsApi.gets({
        side: searchState.filters.side ?? 1,
      })
      if (isMounted()) {
        // if (typeof searchState.sortBy !== 'undefined' && typeof searchState.sortDir !== 'undefined') {
        //   response.data = applySort(
        //     response.data ?? [],
        //     searchState.sortBy,
        //     searchState.sortDir,
        //   )
        // }
        // setState({
        //   positions: response.data ?? [],
        // })
      }
    } catch (err) {
      console.error(err)
    }
  }, [searchState, isMounted])

  useEffect(() => {
      gets()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState],
  )

  return state
}

const Page:NextPageWithLayout = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const { search, updateSearch } = useSearch()
  const { positions } = useGets(search)
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

  const handlePositionOpen = useCallback((indicatorId: string) => {
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

  const handlePositionClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: ""
    })
  }, [])

  return (
    <>
      <Head>
        <title>
          Dashboard: Position List | Devias Kit PRO
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
          <PositionContainer>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Positions List
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
              <PositionListSearch
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
            <PositionListTable
              onPositionSelect={handlePositionOpen}
              onRowsPerPageChange={handleRowsPerPageChange}
              positions={positions ?? []}
            />
          </PositionContainer>
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
