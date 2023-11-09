import { AppBar, AppBarProps, Box, IconButton, styled, Toolbar, useScrollTrigger } from "@mui/material";
import React, {ReactElement} from "react";
import { LinkButton } from "../../../component/ListItemLink";
import { useNavigate } from "react-router-dom";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export type HeaderProps = {
    isMobile?: boolean
    open?: boolean
    openRightNavbar?: boolean
    rightDrawerWidth?: number
}

export const Header = ({ open, isMobile, openRightNavbar, rightDrawerWidth }: HeaderProps) => {
    const navigate = useNavigate()

    const help = () => {
        navigate("/about")
    }

    return (
        // component="nav"
        // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        <ElevationScroll>
        <AppBar
            position="fixed"
            elevation={0}>
            <Toolbar variant="dense">
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{
                        ...(open && { display: 'none' }),
                    }}>
                        <LinkButton color="#fff" to="/"
                                    text="FT Studio"/>
                    </Box>
                </Box>
                {/*<IconButton color="inherit">*/}
                {/*    <Badge badgeContent={4} color="secondary">*/}
                {/*        <NotificationsIcon fontSize="small"/>*/}
                {/*    </Badge>*/}
                {/*</IconButton>*/}
                {/*<IconButton onClick={help} color="inherit">*/}
                {/*    <HelpOutlineIcon fontSize="small"/>*/}
                {/*</IconButton>*/}
            </Toolbar>
        </AppBar>
        </ElevationScroll>
    )
}

export interface ElevationScrollProps {
    children: ReactElement
}

export const ElevationScroll = ({ children }: ElevationScrollProps) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    })
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    })
}

export interface NxBarProps extends AppBarProps {
    isMobile?: boolean
    open?: boolean
    drawerWidth?: number
    openRightDrawer?: boolean
    rightDrawerWidth?: number
}

export const NxAppBar = styled(AppBar, {
    shouldForwardProp: (prop) =>
        prop !== 'open' && prop !== 'isMobile' && prop !== 'drawerWidth' && prop !== 'openRightDrawer'
        && prop !== 'rightDrawerWidth',
})<NxBarProps>(({
                                                  theme,
                                                  open,
                                                  drawerWidth ,
                                                  isMobile,
                                                  openRightDrawer,
                                                  rightDrawerWidth
}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && !isMobile && {
        width: `calc(100% - ${drawerWidth ?? 240 }px)`,
        marginLeft: `${drawerWidth ?? 240}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(openRightDrawer && {
        width: `calc(100% - ${rightDrawerWidth ?? 0}px)`,
        marginRight: `${rightDrawerWidth ?? 0}px`
    }),
}))