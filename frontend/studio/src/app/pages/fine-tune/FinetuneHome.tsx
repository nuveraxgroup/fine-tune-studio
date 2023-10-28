import { useNavigate } from "react-router-dom";
import { Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FinetuneTabs } from "./tabs/FinetuneTabs";


export const FinetuneHome = () => {
  const navigate = useNavigate()

  const onBack = () => {
    navigate("/")
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
        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
          Fine-tune
        </Typography>
      </Grid>
    </Grid>
    <FinetuneTabs/>
  </Grid>)
}