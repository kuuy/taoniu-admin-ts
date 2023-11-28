import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import { Box, Button, Divider, Stack, SvgIcon, Typography } from '@mui/material'

import type { ChangeEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Head from 'next/head'

import { ordersApi } from '~/src/api/orders'
import { useMounted } from '~/src/hooks/use-mounted'
import DashboardLayout from '~/src/layouts/dashboard'
import { OrderDrawer } from '~/src/sections/dashboard/order/order-drawer'
import { OrderListContainer } from '~/src/sections/dashboard/order/order-list-container'
import { OrderListSearch } from '~/src/sections/dashboard/order/order-list-search'
import { OrderListTable } from '~/src/sections/dashboard/order/order-list-table'
import {NextPageWithLayout} from '~/src/pages/_app'
import { Order } from '~/src/types/order'

interface Filters {
  query?: string;
  status?: string;
}

type SortDir = 'asc' | 'desc';

interface OrdersSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

interface OrdersSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

const useSearch = () => {
  const [search, setSearch] = useState<OrdersSearchState>({
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

interface OrdersStoreState {
  orders: Order[];
  ordersCount: number;
}

const useOrders = (searchState: OrdersSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<OrdersStoreState>({
    orders: [],
    ordersCount: 0
  });

  const getOrders = useCallback(async () => {
    try {
      const response = await ordersApi.getOrders(searchState)

      if (isMounted()) {
        setState({
          orders: response.data,
          ordersCount: response.count
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [searchState, isMounted])

  useEffect(() => {
      getOrders()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState])

  return state
}

const Page:NextPageWithLayout = () => {
  const rootRef = useRef(null)
  const { search, updateSearch } = useSearch()
  const { orders, ordersCount } = useOrders(search)
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: ""
  })
  const currentOrder = useMemo(() => {
    if (!drawer.data) {
      return undefined
    }

    return orders.find((order) => order.id === drawer.data)
  }, [drawer, orders])

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

  const handleOrderOpen = useCallback((orderId: string) => {
    // Close drawer if is the same order

    if (drawer.isOpen && drawer.data === orderId) {
      setDrawer({
        isOpen: false,
        data: ""
      })
      return
    }

    setDrawer({
      isOpen: true,
      data: orderId,
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
        component="main"
        ref={rootRef}
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0
          }}
        >
          <OrderListContainer open={drawer.isOpen}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Orders
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
            <OrderListSearch
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              sortBy={search.sortBy}
              sortDir={search.sortDir}
            />
            <Divider />
            <OrderListTable
              onOrderSelect={handleOrderOpen}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              orders={orders || []}
              ordersCount={ordersCount}
              page={search.page}
              rowsPerPage={search.rowsPerPage}
            />
          </OrderListContainer>
          <OrderDrawer
            container={rootRef.current}
            onClose={handleOrderClose}
            open={drawer.isOpen}
            order={currentOrder}
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
)

export default Page
