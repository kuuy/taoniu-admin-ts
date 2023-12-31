import { useCallback, useEffect, useState } from 'react'

import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { Avatar, Box, Chip, Container, Link, Stack, SvgIcon, Typography } from '@mui/material'

import { customersApi } from '~/src/api/customers'
import { RouterLink } from '~/src/components/router-link'
import { useMounted } from '~/src/hooks/use-mounted'
import DashboardLayout from '~/src/layouts/dashboard'
import { paths } from '~/src/paths'
import { CustomerEditForm } from '~/src/sections/dashboard/customer/customer-edit-form'
import type { Customer } from '~/src/types/customer'
import { getInitials } from '~/src/utils/get-initials'
import {NextPageWithLayout} from '~/src/pages/_app'

const useCustomer = (): Customer | null => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState<Customer | null>(null);

  const handleCustomerGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomer();

      if (isMounted()) {
        setCustomer(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleCustomerGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return customer;
}

const Page: NextPageWithLayout = () => {
  const customer = useCustomer();

  if (!customer) {
    return null;
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.customers.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex'
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    Customers
                  </Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: 'column',
                  md: 'row'
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Avatar
                    src={customer.avatar}
                    sx={{
                      height: 64,
                      width: 64
                    }}
                  >
                    {getInitials(customer.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {customer.email}
                    </Typography>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Typography variant="subtitle2">
                        user_id:
                      </Typography>
                      <Chip
                        label={customer.id}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <CustomerEditForm customer={customer} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
