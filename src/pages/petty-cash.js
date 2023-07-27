import { useCallback, useState } from 'react';
import Head from 'next/head';
import BanknotesIcon from '@heroicons/react/24/solid/BanknotesIcon';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AddCashDetails }  from 'src/sections/petty-cash/add-cash-details';
import { RecordExpensesDetails }  from 'src/sections/petty-cash/record-expenses-details';
import { CheckBalance }  from 'src/sections/petty-cash/check-balance';

const Page = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  }

  const openPettyCashPage = () => {
    if (activeButton === 'add-cash-button') {
      return <AddCashDetails />;
    } else if (activeButton === 'record-expenses-button') {
      return <RecordExpensesDetails />;
    } else if (activeButton === 'check-balance-button') {
      return <CheckBalance />;
    } else {
      return null;
    }
  };

  return (
    <>
      <Head>
        <title>
          Petty Cash System
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="x1">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Petty Cash System
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PlusIcon/>
                      </SvgIcon>
                    )}
                    id="add-cash-button"
                    onClick={() => handleClick('add-cash-button')}
                  >
                    Add Cash
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <BanknotesIcon/>
                      </SvgIcon>
                    )}
                    id="record-expenses-button"
                    onClick={() => handleClick('record-expenses-button')}
                  >
                    Record Expenses
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ChartBarIcon/>
                      </SvgIcon>
                    )}
                    id="check-balance-button"
                    onClick={() => handleClick('check-balance-button')}
                  >
                    Check Balance
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            {openPettyCashPage()}
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
