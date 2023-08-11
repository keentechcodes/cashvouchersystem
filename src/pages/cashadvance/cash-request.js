import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CashRequestForm from 'src/sections/advancerequest/CashRequestForm';
import SalaryDeductionTable from 'src/sections/advancerequest/SalaryDeductionTable';
import CashAdvanceTable from 'src/sections/advancerequest/CashAdvanceTable';
import CashAdvanceApproval from 'src/pages/cashadvance/ca-approval';
import { useAuth } from 'src/hooks/use-auth';
// import { CashAdvanceProvider } from '../../contexts/CashAdvanceContext';

const Page = () => {
  const { user } = useAuth();

  return (
    <>
      {/* <CashAdvanceProvider> */}
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
                  {user.id === 1 && <CashAdvanceTable />}
                </Grid>
                <Grid 
                xs={12} 
                md={12} 
                lg={12}>
                  <div>
                    {/* USER ID = 1 is ADMIN*/}
                    {/*<SalaryDeductionTable />*/}
                  </div>
                </Grid>
                <Grid 
                xs={12} 
                md={12} 
                lg={12}>
                  <div>
                    {user.id !== 1 && <CashAdvanceApproval />}
                  </div>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
      {/* </CashAdvanceProvider> */}
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
