import { ReactNode } from 'react';
import { Box, CssBaseline } from "@mui/material";

export type Props = {
  header: ReactNode
  children: ReactNode
}

export const SimpleColumnLayout = ({
                                     header,
                                     children
                                   }: Props) => {
  return (<Box sx={{ display: 'flex' }}>
    <CssBaseline />
    { header }
    { children }
  </Box>)
}