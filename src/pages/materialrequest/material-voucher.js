import React from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import MaterialVoucherTable from 'src/sections/materialrequest/MaterialVoucherTable';

const Page = () => (
  <>
    <Head>
      <title>
        Material Voucher | One Agno Medical Solutions
      </title>
    </Head>
    <Box 
      component="main"
      sx={{
          flexGrow: 1,
          py: 8
      }}>
        <Container maxWidth="lg"
          sx={{width: '100%'}}>
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Material Voucher
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}>
                <Grid
                  xs={12}
                  md={12}
                  lg={12}>
                  <MaterialVoucherTable />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
