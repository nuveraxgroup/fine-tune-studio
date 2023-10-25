import { defer } from "react-router-dom";
import styled from '@emotion/styled';
import {
  Grid,
} from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HomeProps {}

const StyledHome = styled.div`
  margin-bottom: 70px;
`;

export const homeLoader = async () => {
  return defer({})
}

export function Home(props: HomeProps) {
  return (
    <StyledHome>
      <Grid container
            spacing={2}>
        <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
        <Grid item xs={12} sm={12} md={10} lg={8} xl={4}>
          <h1>Home</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
      </Grid>
    </StyledHome>
  );
}

export default Home;
