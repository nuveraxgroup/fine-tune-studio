import { MainLayout } from "../common/MainLayout";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (<MainLayout>
    <Box component="div" sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '85vh',
      flexGrow: 1,
      p: 3
    }}>
      <Outlet />
    </Box>
  </MainLayout>)
}