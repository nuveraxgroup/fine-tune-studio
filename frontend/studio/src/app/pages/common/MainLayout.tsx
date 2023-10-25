import { ReactNode, useState } from "react";
import { Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Footer, Header, NxMain, SimpleColumnLayout } from "../../@core";

export interface MainLayoutProps {
  children: ReactNode
}


export const MainLayout = ({
                             children
                           }: MainLayoutProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [openNavbar, _setOpenNavbar] = useState(!matches)

  return (<SimpleColumnLayout
    header={<Header />}>
    <NxMain isMobile={matches} open={openNavbar}>
      <Toolbar variant="dense"/>
      { children }
      <Footer/>
    </NxMain>
  </SimpleColumnLayout>)
}