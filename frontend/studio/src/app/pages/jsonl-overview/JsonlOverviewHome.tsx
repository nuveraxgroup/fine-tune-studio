import { useNavigate, useParams } from "react-router-dom";
import { Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { JsonOverviewTabs } from "./tabs/JsonOverviewTabs";

export const JsonlOverviewHome = () => {
  const params = useParams()
  const navigate = useNavigate()
  const onBack = () => {
    navigate("/jsonl")
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
          JSONL File: { params["id"] }
        </Typography>
      </Grid>
    </Grid>
    <JsonOverviewTabs/>

  </Grid>)
}