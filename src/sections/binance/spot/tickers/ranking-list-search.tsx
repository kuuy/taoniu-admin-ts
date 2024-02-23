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
} from '@mui/material';
import { useUpdateEffect } from '~/src/hooks/use-update-effect'

interface Filters {
  query?: string;
  interval?: string;
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
];

type SortDir = 'asc' | 'desc';

interface SortOption {
  label: string;
  value: SortDir;
}

const sortOptions: SortOption[] = [
  {
    label: 'Newest',
    value: 'desc'
  },
  {
    label: 'Oldest',
    value: 'asc'
  }
];

interface RankingListSearchProps {
  onFiltersChange?: (filters: Filters) => void;
  onSortChange?: (sort: SortDir) => void;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export const RankingListSearch: FC<RankingListSearchProps> = (props) => {
  const { onFiltersChange, onSortChange, sortBy = 'createdAt', sortDir = 'asc' } = props;
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [currentTab, setCurrentTab] = useState<TabValue>('1m');
  const [filters, setFilters] = useState<Filters>({
    query: undefined,
    interval: undefined,
  });

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: TabValue) => {
    setCurrentTab(tab)
    const interval = tab
    setFilters((prevState) => ({
      ...prevState,
      interval
    }))
  }, [])

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
    </div>
  );
};

RankingListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc'])
};
