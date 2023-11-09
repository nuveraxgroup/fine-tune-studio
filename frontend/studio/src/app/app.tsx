import styled from '@emotion/styled';

import { AppContext, AppState } from './@core';
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/Router";

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const state: AppState = {
    appVersion: "0.0.1-experimental"
  }

  return (
    <AppContext.Provider value={state}>
      <StyledApp>
        <RouterProvider
          future={{ v7_startTransition: true }}
          router={router} />
      </StyledApp>
    </AppContext.Provider>
  );
}

export default App;
