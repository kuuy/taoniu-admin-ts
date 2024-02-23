import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {NextPageWithLayout} from '~/src/pages/_app'
import DashboardLayout from '~/src/layouts/dashboard'
import Head from 'next/head'
import {Box, Button, Container, Divider, Stack, SvgIcon, Typography} from '@mui/material'

import {PlanContainer} from '~/src/sections/binance/spot/plans/plan-container'
import {PlanListTable} from '~/src/sections/binance/spot/plans/plan-list-table'
import {PlanListSearch} from '~/src/sections/binance/spot/plans/plan-list-search'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {useMounted} from '~/src/hooks/use-mounted'
import {plansApi} from '~/src/api/cryptos/binance/spot/plans'
import {Plan} from '~/src/types/binance/spot/plan'
import {applySort} from '~/src/utils/apply-sort'

interface Filters {
  query?: string;
  side?: number;
}

type SortDir = 'asc' | 'desc';

interface PlansSearchState {
  filters: Filters;
  sortBy?: string;
  sortDir?: SortDir;
}

const useSearch = () => {
  const [search, setSearch] = useState<PlansSearchState>({
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

interface PlanStoreState {
  plans: Plan[];
}

const useListings = (searchState: PlansSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<PlanStoreState>({
    plans: [],
  })

  const listings = useCallback(async () => {
    try {
      const response = await plansApi.listings({
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
          plans: (response.data ?? []) as Plan[],
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
  const { plans } = useListings(search)
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

  const handlePlanOpen = useCallback((indicatorId: string) => {
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

  const handlePlanClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: ""
    })
  }, [])

  return (
    <>
      <Head>
        <title>
          Dashboard: Plan List | Devias Kit PRO
        </title>
      </Head>
      <Divider />
      <Box
        ref={rootRef}
        sx={{
          bottom: 0,
          display: 'flex',
          left: 0,
          plan: 'absolute',
          right: 0,
          top: 0
        }}
      >
        <PlanContainer>
          <Box sx={{ p: 3 }}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <div>
                <Typography variant="h4">
                  Plans List
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
            <PlanListSearch
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
          <PlanListTable
            onPlanSelect={handlePlanOpen}
            plans={plans ?? []}
          />
        </PlanContainer>
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
