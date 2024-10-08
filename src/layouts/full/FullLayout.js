import { Container, styled } from '@mui/material';
import React, { useState } from "react";
import { Outlet } from 'react-router-dom';


import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <MainWrapper
      className='mainwrapper'
    >
      <Sidebar isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)} />
      <PageWrapper
        className="page-wrapper"
      >
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container sx={{
          paddingTop: "20px",
          maxWidth: '1200px',
          width: '100%',
          minWidth: '90%',
        }}
        >
          <Outlet
          />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
