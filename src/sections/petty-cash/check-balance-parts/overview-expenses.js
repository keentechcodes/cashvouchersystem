<<<<<<< HEAD
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, CardHeader, Stack, SvgIcon, Typography, useTheme } from '@mui/material';
import { Chart } from 'src/components/chart';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';

const useChartOptions = (labels) => {
  const theme = useTheme();

  const colorPalette = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    theme.palette.secondary.main,
  ];

  const uniqueColors = labels.map((_, index) => {
    return colorPalette[index % colorPalette.length];
  });

  return {
    chart: {
      background: 'transparent',
    },
    colors: uniqueColors,
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const transformLabel = (label) => {
  // Split the label by '-', capitalize each word, and join them back
  return label.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Move iconMap object to this file
const iconMap = {
  Desktop: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Tablet: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Phone: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  )
};

export const OverviewExpenses = (props) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = useMemo(() => useChartOptions(labels), [labels]);

  return (
    <Card sx={sx}>

      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {/* {chartSeries.map((item, index) => {
            const label = labels[index];

            return (
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {iconMap[label]} {/* Use the iconMap object here */}
                {/* <Typography
                  sx={{ my: 1 }}
                  variant="h6"
                >
                  {label}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  {item}
                </Typography>
              </Box>
            );
          })} */}
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewExpenses.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
};

export default OverviewExpenses;
=======
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, CardHeader, Stack, SvgIcon, Typography, useTheme } from '@mui/material';
import { Chart } from 'src/components/chart';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';

const useChartOptions = (labels) => {
  const theme = useTheme();

  const colorPalette = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    theme.palette.secondary.main,
  ];

  const uniqueColors = labels.map((_, index) => {
    return colorPalette[index % colorPalette.length];
  });

  return {
    chart: {
      background: 'transparent',
    },
    colors: uniqueColors,
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const transformLabel = (label) => {
  // Split the label by '-', capitalize each word, and join them back
  return label.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Move iconMap object to this file
const iconMap = {
  Desktop: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Tablet: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Phone: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  )
};

export const OverviewExpenses = (props) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = useMemo(() => useChartOptions(labels), [labels]);

  return (
    <Card sx={sx}>

      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {chartSeries.map((item, index) => {
            const label = labels[index];

            return (
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {iconMap[label]} {/* Use the iconMap object here */}
                <Typography
                  sx={{ my: 1 }}
                  variant="h6"
                >
                  {label}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  {item}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewExpenses.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
};

export default OverviewExpenses;
>>>>>>> f2c0da94f41ff23ab30a6bedc8aec818b4da28de
