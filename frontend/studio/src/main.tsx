import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { ThemeProvider } from '@emotion/react';
import { customTheme } from "./app/@theme/colors";

const root = ReactDOM.createRoot(
  document.getElementById('studio-app') as HTMLElement
);
root.render(
  <ThemeProvider theme={customTheme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
