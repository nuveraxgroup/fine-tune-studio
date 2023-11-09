import { LoaderFunctionArgs, defer, useNavigate, useParams } from "react-router-dom";
import { Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FTOverviewTabs } from "./tabs/FTOverviewTabs";

export const ftOverviewHomeLoader = async ({ params }: LoaderFunctionArgs) => {
  // params["idDocument"]
  return defer({})
}


export const FTOverviewHome = () => {
  const params = useParams()
  const navigate = useNavigate()

  const onBack = () => {
    navigate("/fine-tune")
  }

  return (<Grid sx={{ mb: "80px" }}>
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <IconButton
          onClick={onBack}
          size="small">
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography sx={{ marginTop: "10px", marginBottom: "5px" }} variant="h6" component="h3">
          Overview
        </Typography>
        <Typography sx={{ marginBottom: "10px" }} variant="body2" color="text.secondary">
          Fine-tune Job: { params["id"] }
        </Typography>
      </Grid>
    </Grid>
    <FTOverviewTabs/>
  </Grid>)
}