import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import PastExpenses from 'src/sections/reimbursementrequest/PastExpenses';

const Page = () => (
    <>
    <Head>
        <title>
            Expenses | One Agno Medical Solutions
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
                        Cash Reimbursement
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
                            <PastExpenses />
                        </Grid>
                        <Grid
                        xs={12}
                        md={12}
                        lg={12}
                        >
                            
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
