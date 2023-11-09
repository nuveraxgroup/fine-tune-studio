import { ThemeOptions } from '@mui/material/styles';
import {createTheme} from "@mui/material";

declare module '@mui/material/styles' {
    interface TypographyVariants {
        currency: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        currency?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        currency: true;
    }
}

export const PRIMARY_COLOR = '#02505A';
export const PRIMARY_COLOR_LIGHT = '#05cce8';
export const PRIMARY_COLOR_DARK = '#013338';
// export const PRIMARY_COLOR_MUTED = '#e6fbfb';
export const PRIMARY_COLOR_MUTED = '#8cc7c7';
export const PRIMARY_COLOR_CONTRAST_TEXT = '#defdfd';
export const SECONDARY_COLOR = '#f7ac34';
export const SECONDARY_COLOR_LIGHT = '#f3c67e';
export const SECONDARY_COLOR_DARK = '#a76600';
export const SECONDARY_COLOR_CONTRAST_TEXT = '#4c2d00';
export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#02505A',
            dark: '#013338',
            light: '#05cce8',
        },
        secondary: {
            main: '#f7ac34',
            dark: '#a76600',
            light: '#f3c67e',
        },
        background: {
            paper: '#ffffff',
            default: '#f4ffff',
        },
        divider: 'rgba(1,51,56,0.2)',
        text: {
            primary: '#013338',
            secondary: 'rgba(1,51,56,0.6)',
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: [
            'Roboto Condensed',
          'Eczar'
        ].join(','),
        fontSize: 16,
        currency: {
            fontFamily: 'Eczar',
            fontSize: 16,
        }
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    // Map the new variant to render a <h1> by default
                    currency: 'div',
                },
            },
        },
    },
};

export const customTheme = createTheme(themeOptions)