import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import dynamic from 'next/dynamic'
import Script from 'next/script'

import {NextPageWithLayout} from '~/src/pages/_app'
import DashboardLayout from '~/src/layouts/dashboard'
import Head from 'next/head'
import {Box, Button, Container, Divider, Stack, SvgIcon, Typography} from '@mui/material'

import {IndicatorContainer} from '~/src/sections/dashboard/indicators/indicator-container'
import {IndicatorListTable} from '~/src/sections/dashboard/indicators/indicator-list-table'
import {IndicatorListSearch} from '~/src/sections/dashboard/indicators/indicator-list-search'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {Indicator} from '~/src/types/indicator'
import {useMounted} from '~/src/hooks/use-mounted'

interface Filters {
  query?: string;
  status?: string;
}

type SortDir = 'asc' | 'desc';

interface IndicatorsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

interface IndicatorsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

const useSearch = () => {
  const [search, setSearch] = useState<IndicatorsSearchState>({
    filters: {
      query: undefined,
      status: undefined
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

interface IndicatorsStoreState {
  indicators: Indicator[];
  indicatorsCount: number;
}

const useIndicators = (searchState: IndicatorsSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<IndicatorsStoreState>({
    indicators: [],
    indicatorsCount: 0
  });

  const getIndicators = useCallback(async () => {
    try {
      // const response = await indicatorsApi.getIndicators(searchState)
      //
      // if (isMounted()) {
      //   setState({
      //     indicators: response.data,
      //     indicatorsCount: response.count
      //   })
      // }
    } catch (err) {
      console.error(err)
    }
  }, [searchState, isMounted])

  useEffect(() => {
      getIndicators()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState])

  return state
}

const Page:NextPageWithLayout = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const { search, updateSearch } = useSearch()
  const { indicators, indicatorsCount } = useIndicators(search)
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: ""
  })
  const [isScriptReady, setIsScriptReady] = useState(false)

  const currentIndicator = useMemo(() => {
    if (!drawer.data) {
      return undefined
    }

    return indicators.find((indicator) => indicator.id === drawer.data)
  }, [drawer, indicators])

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

  const handleIndicatorOpen = useCallback((indicatorId: string) => {
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

  const handleIndicatorClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: ""
    })
  }, [])

  return (
    <>
      <Head>
        <title>
          Dashboard: Indicator List | Devias Kit PRO
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
          <IndicatorContainer>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Indicators
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
          </IndicatorContainer>
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
