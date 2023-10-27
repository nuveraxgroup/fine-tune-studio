import { defer, useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import {
  Avatar,
  Card, CardActionArea, CardHeader,
  Grid
} from "@mui/material";
import { red } from "@mui/material/colors";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HomeProps {}

const StyledHome = styled.div`
  margin-bottom: 70px;
`;

export const homeLoader = async () => {
  return defer({})
}

export function Home(props: HomeProps) {
  const navigate = useNavigate()
  const nav = (link: string) => {
    navigate(link)
  }

  return (
    <StyledHome>
      <Grid container
            spacing={2}>
        <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
        <Grid item xs={12} sm={12} md={10} lg={8} xl={4}>
          <h1>Home</h1>

          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => nav("/jsonl")}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    <PsychologyAltIcon/>
                  </Avatar>
                }
                title="JSONL"
                subheader="Manage your JSONL files"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
      </Grid>
    </StyledHome>
  );
}

export default Home;
