import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {NextPageWithLayout} from '~/src/pages/_app'
import DashboardLayout from '~/src/layouts/dashboard'
import Head from 'next/head'
import {Box, Button, Container, Divider, Stack, SvgIcon, Typography} from '@mui/material'

import {OrderContainer} from '~/src/sections/binance/spot/orders/order-container'
import {OrderListTable} from '~/src/sections/binance/spot/orders/order-list-table'
import {OrderListSearch} from '~/src/sections/binance/spot/orders/order-list-search'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {useMounted} from '~/src/hooks/use-mounted'
import {ordersApi} from '~/src/api/cryptos/binance/spot/orders'
import {Order} from '~/src/types/binance/spot/order'
import {applySort} from '~/src/utils/apply-sort'

interface Filters {
  query?: string;
  positionSide?: string;
}

type SortDir = 'asc' | 'desc';

interface OrdersSearchState {
  filters: Filters;
  sortBy?: string;
  sortDir?: SortDir;
}

const useSearch = () => {
  const [search, setSearch] = useState<OrdersSearchState>({
    filters: {
      query: undefined,
      positionSide: "LONG",
    },
    sortBy: "entry_amount",
    sortDir: "desc"
  })

  return {
    search,
    updateSearch: setSearch
  }
}

interface OrderStoreState {
  orders: Order[];
}

const useListings = (searchState: OrdersSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<OrderStoreState>({
    orders: [],
  })

  const listings = useCallback(async () => {
    try {
      const response = await ordersApi.listings({
        symbol: "",
        positionSide: searchState.filters.positionSide ?? "LONG",
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
          orders: (response.data ?? []) as Order[],
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
  const { orders } = useListings(search)
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

  const handleOrderOpen = useCallback((indicatorId: string) => {
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

  const handleOrderClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: ""
    })
  }, [])

  return (
    <>
      <Head>
        <title>
          Dashboard: Order List | Devias Kit PRO
        </title>
      </Head>
      <Divider />
      <Box
        ref={rootRef}
        sx={{
          bottom: 0,
          display: 'flex',
          left: 0,
          order: 'absolute',
          right: 0,
          top: 0
        }}
      >
        <OrderContainer>
          <Box sx={{ p: 3 }}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <div>
                <Typography variant="h4">
                  Orders List
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
            <OrderListSearch
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
          <OrderListTable
            onOrderSelect={handleOrderOpen}
            orders={orders ?? []}
          />
        </OrderContainer>
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
