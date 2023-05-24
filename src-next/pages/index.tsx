import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '../src/components/container/PageContainer';

// components
import SalesOverview from '../src/components/dashboard/SalesOverview';
import YearlyBreakup from '../src/components/dashboard/YearlyBreakup';
import RecentTransactions from '../src/components/dashboard/RecentTransactions';
import ProductPerformance from '../src/components/dashboard/ProductPerformance';
import Blog from '../src/components/dashboard/Blog';
import MonthlyEarnings from '../src/components/dashboard/MonthlyEarnings';
import FullLayout from '../src/layouts/full/FullLayout';

// Database
import Database from "tauri-plugin-sql-api";


export default function Home() {

  useEffect(() => {
    const dbConnect = async () => {
      const db = await Database.load("postgres://postgres:DB_PASSWORD@localhost/PORT")
      await db.execute(`CREATE TABLE accounts(
        user_id serial PRIMARY KEY,
        username VARCHAR (50) UNIQUE NOT NULL,
        password VARCHAR (50) NOT NULL,
        email VARCHAR (255) UNIQUE NOT NULL,
        created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP
      )`);
      const data = await db.execute('SELECT * FROM accounts')
      console.log("DATA => ", data)
    }
    dbConnect()
  }, [])

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};