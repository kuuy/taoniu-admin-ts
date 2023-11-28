import type { ChangeEvent, FC } from 'react'
import {useCallback, useState} from 'react'
import PropTypes from 'prop-types'

import {
  Tab,
  Tabs,
} from '@mui/material';

import { useUpdateEffect } from '~/src/hooks/use-update-effect'

interface Filters {
  interval?: string
}

type TabValue = '1m' | '15m'  | '4h' | '1d';

interface TabOption {
  label: string;
  value: TabValue;
}

const tabOptions: TabOption[] = [
  {
    label: '1m',
    value: '1m',
  },
  {
    label: '15m',
    value: '15m',
  },
  {
    label: '4h',
    value: '4h',
  },
  {
    label: '1d',
    value: '1d',
  },
]

interface RankingListSearchProps {
  onFiltersChange?: (filters: Filters) => void
}

export const RankingListSearch: FC<RankingListSearchProps> = (props) => {
  const { onFiltersChange} = props
  const [currentTab, setCurrentTab] = useState<TabValue>('1m')
  const [filters, setFilters] = useState<Filters>({
    interval: "1m",
  })

  const handleFiltersChange = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersChange()
  }, [filters, handleFiltersChange])

  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: TabValue) => {
    setCurrentTab(tab)
    const interval = tab
    setFilters((prevState) => ({
      ...prevState,
      interval,
    }))
  }, [])

  return (
    <div>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabOptions.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
    </div>
  )
}

RankingListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
}
