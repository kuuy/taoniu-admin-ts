import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material'

import { BreadcrumbsSeparator } from '~/src/components/breadcrumbs-separator'
import { RouterLink } from '~/src/components/router-link'
import DashboardLayout from '~/src/layouts/dashboard'
import { paths } from '~/src/paths'
import { ProductCreateForm } from '~/src/sections/dashboard/product/product-create-form'
import {NextPageWithLayout} from '~/src/pages/_app'

const Page: NextPageWithLayout = () => {

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">
                Create a new product
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.index}
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.products.index}
                  variant="subtitle2"
                >
                  Products
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Create
                </Typography>
              </Breadcrumbs>
            </Stack>
            <ProductCreateForm />
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
)

export default Page
