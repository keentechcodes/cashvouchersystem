import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CashRequestForm from 'src/sections/advancerequest/CashRequestForm';
import SalaryDeductionTable from 'src/sections/advancerequest/SalaryDeductionTable';
import CashAdvanceTable from 'src/sections/advancerequest/CashAdvanceTable';



const Page = () => (
  <>
    <Head>
      <title>
        Cash Advance Request Form | One Agno Medical Solutions
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container 
      maxWidth="lg" 
      sx={{ width: '100%' }}>
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Cash Advance Request
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
                <CashRequestForm />
              </Grid>
              <Grid 
              xs={12} 
              md={12} 
              lg={12}>
                {/*<SalaryDeductionTable />*/}
              </Grid>
              <Grid 
              xs={12} 
              md={12} 
              lg={12}>
                <CashAdvanceTable />
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
