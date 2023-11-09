import { defer, useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import {
  Grid, Typography
} from "@mui/material";
import { red } from "@mui/material/colors";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { SimpleCard } from "../common/SimpleCard";
import ScheduleIcon from '@mui/icons-material/Schedule';

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
          <Typography sx={{ my: 2 }} variant="h5">
            Menu
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SimpleCard link="/jsonl"
                          title="JSONL"
                          subtitle="Manage your JSONL files"
                          icon={<PsychologyAltIcon/>}
                          iconColor={red[500]}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <SimpleCard link="/fine-tune"
                          title="Fine-tune"
                          subtitle="Manage your Fine-tune jobs"
                          icon={<ScheduleIcon/>}
                          iconColor={red[500]}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
      </Grid>
    </StyledHome>
  );
}

export default Home;
