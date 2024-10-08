import { Box, Grid } from '@mui/material';
import React from 'react';

import TopClientesFrequentes from './components/ProductPerformance';
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Box>
              <SalesOverview />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <YearlyBreakup />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box>
            <TopClientesFrequentes />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
