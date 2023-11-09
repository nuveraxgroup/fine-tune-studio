import { Box, Button, Typography } from "@mui/material";
import {useAppContext} from "../../context/AppContext";
import {
  Grid,
} from '@mui/material';
import React from "react";
import { NavLink as NavLinkBase } from "react-router-dom";

export const Footer = () => {
    const { appVersion } = useAppContext()

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? "#ffffff"
                        : "#013338",
            }}
        >
          <Grid container
                spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Typography variant="h6">
                Fine-tune Studio {new Date().getFullYear()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`v${appVersion}`}
              </Typography>
            </Grid>
            {/*<Grid item xs={12} sm={12} md={12} lg={8} xl={8}>*/}
            {/*  <Typography variant="body1">*/}
            {/*    General*/}
            {/*  </Typography>*/}
            {/*  <Button component={NavLinkBase} to="/privacy">*/}
            {/*    Política de Privacidad*/}
            {/*  </Button>*/}
            {/*  <Button component={NavLinkBase} to="/terms">*/}
            {/*    Términos de uso del servicio*/}
            {/*  </Button>*/}
            {/*</Grid>*/}
          </Grid>
        </Box>
    )
}