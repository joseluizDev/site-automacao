import { Box, Drawer, useMediaQuery } from '@mui/material';
import { Logo, Sidebar } from 'react-mui-sidebar';
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';

const MSidebar = (props) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const sidebarWidth = '270px';

  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };


  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: 'border-box',
              ...scrollbarStyles,
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Sidebar
              width={'270px'}
              collapsewidth="80px"
              open={props.isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              <Logo
                img={'https://static.whatsapp.net/rsrc.php/yZ/r/JvsnINJ2CZv.svg'} />
              <Box>
                <SidebarItems />
                <Upgrade />
              </Box>
            </Sidebar >
          </Box>
        </Drawer >
      </Box >
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <Sidebar
        width={'270px'}
        collapsewidth="80px"
        isCollapse={false}
        mode="light"
        direction="ltr"
        themeColor="#5d87ff"
        themeSecondaryColor="#49beff"
        showProfile={false}
      >
        <Logo img={'https://static.whatsapp.net/rsrc.php/yZ/r/JvsnINJ2CZv.svg'} />
        <SidebarItems />
        <Upgrade />
      </Sidebar>
    </Drawer>
  );
};
export default MSidebar;
