import type { ChangeEvent, FC, FormEvent } from 'react'
import {useCallback, useRef, useState} from 'react'
import PropTypes from 'prop-types'

import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField
} from "@mui/material"

import { useUpdateEffect } from '~/src/hooks/use-update-effect'

interface Filters {
  query?: string
  status?: string
}

type TabValue = 'all' | 'canceled' | 'complete' | 'pending' | 'rejected'

interface TabOption {
  label: string;
  value: TabValue;
}

const tabOptions: TabOption[] = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Canceled',
    value: 'canceled'
  },
  {
    label: 'Completed',
    value: 'complete'
  },
  {
    label: 'Pending',
    value: 'pending'
  },
  {
    label: 'Rejected',
    value: 'rejected'
  }
]

type SortDir = 'asc' | 'desc'

interface SortOption {
  label: string
  value: SortDir
}

const sortOptions: SortOption[] = [
  {
    label: 'Newest',
    value: 'desc',
  },
  {
    label: 'Oldest',
    value: 'asc',
  },
]

interface IndicatorListSearchProps {
  onFiltersChange?: (filters: Filters) => void
  onSortChange?: (sort: SortDir) => void
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

export const IndicatorListSearch: FC<IndicatorListSearchProps> = (props) => {
  const { onFiltersChange, onSortChange, sortBy = 'createdAt', sortDir = 'asc' } = props;
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [currentTab, setCurrentTab] = useState<TabValue>('all');
  const [filters, setFilters] = useState<Filters>({
    query: undefined,
    status: undefined
  });

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: TabValue) => {
    setCurrentTab(tab);
    // const status = tab === 'all' ? undefined : tab;
    //
    // setFilters((prevState) => ({
    //   ...prevState,
    //   status
    // }));
  }, []);

  const handleQueryChange = useCallback((event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // const query = queryRef.current?.value || '';
    // setFilters((prevState) => ({
    //   ...prevState,
    //   query
    // }));
  }, []);

  const handleSortChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    // const sortDir = event.target.value as SortDir;
    // onSortChange?.(sortDir);
  }, [onSortChange]);

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
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={3}
        sx={{ p: 3 }}
      >
        <Box
          component="form"
          onSubmit={handleQueryChange}
          sx={{ flexGrow: 1 }}
        >
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            name="IndicatorNumber"
            placeholder="Search by Indicator number"
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            )}
          />
        </Box>
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sortDir}
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
    </div>
  );
};

IndicatorListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc'])
}
