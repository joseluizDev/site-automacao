import { Box, Grid } from '@mui/material';
import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

// components
import TopClientesFrequentes from './components/ProductPerformance';
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';


const Dashboard = () => {

  return (
    <PageContainer
      title="Dashboard"
      description="this is Dashboard"
    >
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <TopClientesFrequentes />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
