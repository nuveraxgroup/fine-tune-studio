import {Box, styled, Toolbar} from "@mui/material";
import {ReactNode} from "react";
import {Footer} from "./Footer";

export type MainContentProps = {
    children: ReactNode
}

export const MainContent = ({ children }: MainContentProps) => {
    return (<>
        <Box component="main" sx={{
            overflowX: 'hidden',
            overflowY: "visible",
            width: "100%"
        }}>
            <Toolbar variant="dense"/>
            {children}
            <Footer/>
        </Box>
    </>)
}

export interface NxMainProps {
    isMobile?: boolean
    open?: boolean;
    drawerWidth?: number
}

export const NxMain =
    styled('main')
    <NxMainProps>(({ theme}) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }), marginLeft: 0,
}))