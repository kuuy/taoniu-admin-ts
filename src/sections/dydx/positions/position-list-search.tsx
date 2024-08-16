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
  side?: number;
}

type TabValue = '1' | '2';

interface TabOption {
  label: string;
  value: TabValue;
}

const tabOptions: TabOption[] = [
  {
    label: 'Long',
    value: '1'
  },
  {
    label: 'Short',
    value: '2'
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

interface IndicatorListSearchProps {
  onFiltersChange?: (filters: Filters) => void;
  onSortChange?: (sort: SortDir) => void;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export const PositionListSearch: FC<IndicatorListSearchProps> = (props) => {
  const { onFiltersChange, onSortChange, sortBy = 'createdAt', sortDir = 'asc' } = props;
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [currentTab, setCurrentTab] = useState<TabValue>('1');
  const [filters, setFilters] = useState<Filters>({
    query: undefined,
    side: undefined
  });

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: TabValue) => {
    setCurrentTab(tab);
    const side = tab === '1' ? undefined : Number(tab);

    setFilters((prevState) => ({
      ...prevState,
      side,
    }))
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
    </div>
  );
};

PositionListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc'])
};
