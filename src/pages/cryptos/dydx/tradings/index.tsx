import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import dynamic from 'next/dynamic'
import Script, {handleClientScriptLoad} from 'next/script'

import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'

import {
  ResolutionString,
} from "~/public/assets/charting_library"

import {TradingViewProps} from '~/src/components/charts/tradingview'
import {NextPageWithLayout} from '~/src/pages/_app'
import DashboardLayout from '~/src/layouts/dashboard'
import Head from 'next/head'
import {Box, Button, Container, Divider, Stack, SvgIcon, Typography} from '@mui/material'
import {TradingContainer} from '~/src/sections/dashboard/tradings/trading-container'
import {TradingListTable} from '~/src/sections/dashboard/tradings/trading-list-table'
import {TradingListSearch} from '~/src/sections/dashboard/tradings/trading-list-search'
import {Trading} from '~/src/types/trading'
import {useMounted} from '~/src/hooks/use-mounted'
import {TradingDrawer} from '~/src/sections/dashboard/tradings/trading-drawer'
import {indicatorsApi} from '~/src/api/cryptos/dydx/indicators'
import {IndicatorsResult} from '~/src/types/indicator'
import {appConfig} from '~/src/config'

interface Filters {
  query?: string;
  status?: string;
}

type SortDir = 'asc' | 'desc';

interface TradingsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

interface TradingsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

const useSearch = () => {
  const [search, setSearch] = useState<TradingsSearchState>({
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

interface TradingsStoreState {
  tradings: Trading[]
  tradingsCount: number
}

const useTradings = (searchState: TradingsSearchState) => {
  const isMounted = useMounted()
  const [state, setState] = useState<TradingsStoreState>({
    tradings: [],
    tradingsCount: 0
  })

  const getTradings = useCallback(async () => {
    try {
      // const response = await tradingsApi.getTradings(searchState)
      //
      // if (isMounted()) {
      //   setState({
      //     tradings: response.data,
      //     tradingsCount: response.count
      //   })
      // }
    } catch (err) {
      console.error(err)
    }
  }, [searchState, isMounted])

  useEffect(() => {
      getTradings()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState])

  return state
}

const TradingView = dynamic(
  () =>
    import("~/src/components/charts/tradingview").then((mod) => mod.TradingView),
  { ssr: false }
)

const Page:NextPageWithLayout = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const { search, updateSearch } = useSearch()
  const { tradings, tradingsCount } = useTradings(search)
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: ""
  })
  const [isScriptReady, setIsScriptReady] = useState(false)

  const handleOnIndicatorsLoading = useCallback(
    async (
      symbol: string,
      interval:string,
      fields: string[],
    ): Promise<any> => {
      return new Promise((resolve, reject) => {
        indicatorsApi.gets({
          symbols: symbol,
          interval: interval,
          fields: fields.join(','),
        }).then((response) => {
          if (!response.success) {
            throw new Error(response.error!)
          }

          const data = response.data![0].split(",").map((value) => {
            return Number(value)
          })

          const indicators: Record<string, number> = {}
          for (let i = 0; i < fields.length; i++) {
            indicators[fields[i]] = data[i]
          }

          resolve(indicators)
        }).catch((error) => {
          reject(new Error("internal server error"))
        })
      })
    },
    [indicatorsApi],
  )

  const tradingViewProps: Partial<TradingViewProps> = {
    theme: "Dark",
    symbol: "BTC-USD",
    interval: "1D" as ResolutionString,
    library_path: `${appConfig.baseUrl}/assets/charting_library/`,
    locale: "en",
    datafeed_url: "/api/cryptos/v1/dydx/tradingview/datafeed",
    fullscreen: false,
    autosize: true,
    onIndicatorsLoading: handleOnIndicatorsLoading,
  }

  const currentTrading = useMemo(() => {
    if (!drawer.data) {
      return undefined
    }

    return tradings.find((trading) => trading.id === drawer.data)
  }, [drawer, tradings])

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

  const handleTradingOpen = useCallback((tradingId: string) => {
    // Close drawer if is the same trading

    if (drawer.isOpen && drawer.data === tradingId) {
      setDrawer({
        isOpen: false,
        data: ""
      })
      return
    }

    setDrawer({
      isOpen: true,
      data: tradingId,
    })
  }, [drawer])

  const handleTradingClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: ""
    })
  }, [])

  return (
    <>
      <Head>
        <title>
          Dashboard: Trading List | Devias Kit PRO
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
          <TradingContainer open={drawer.isOpen}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    BTC-USD
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
            <Box sx={{ height: 800 }}>
              <Script
                src={`${appConfig.baseUrl}/assets/datafeeds/udf/dist/bundle.js`}
                strategy="lazyOnload"
                onReady={() => {
                  setIsScriptReady(true);
                }}
              />
              {isScriptReady && <TradingView {...tradingViewProps} />}
            </Box>
            <Divider />
            <TradingListSearch
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              sortBy={search.sortBy ?? ''}
              sortDir={search.sortDir ?? 'asc'}
            />
            <Divider />
            <TradingListTable
              onTradingSelect={handleTradingOpen}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              tradings={tradings || []}
              tradingsCount={tradingsCount}
              page={search.page}
              rowsPerPage={search.rowsPerPage}
            />
          </TradingContainer>
          <TradingDrawer
            container={rootRef.current}
            onClose={handleTradingClose}
            open={drawer.isOpen}
            trading={currentTrading}
          />
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
