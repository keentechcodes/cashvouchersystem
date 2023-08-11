import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { RequestsProvider } from 'src/contexts/RequestsContext';
import { CircularProgress, Box } from '@mui/material';
import ErrorBoundary from '/error-boundary';


// Inside MyApp component



const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => (
  <Box 
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"  // ensures the spinner is in the center of the viewport
  >
    <CircularProgress />
  </Box>
);

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          One Agno Medical Solutions Cash Voucher System
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RequestsProvider>
            <AuthConsumer>
              {(auth) =>
                auth.isLoading ? (
                  <SplashScreen />
                ) : (
                  <ErrorBoundary>
                    {getLayout(<Component {...pageProps} />)}
                  </ErrorBoundary>
                )
              }
            </AuthConsumer>
          </RequestsProvider>
        </ThemeProvider>
      </AuthProvider>
    </LocalizationProvider>
  </CacheProvider>
  );
};

export default App;
