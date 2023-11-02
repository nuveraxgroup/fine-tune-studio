import { useState } from "react";
import { ReportResponse } from "../../../../model/upload.model";
import Grid from '@mui/material/Grid';
import { Card, CardActions, CardContent, Typography } from "@mui/material";

export const DetailsTab = () => {
  const [data, setData] = useState<ReportResponse>(JSON.parse(`{
    "report": {
        "samples": 5,
        "tokens": [
            {
                "index": 0,
                "nMessages": 3,
                "messagesTokensSize": 45,
                "nTooLong": false,
                "assistantMessageLen": 10
            },
            {
                "index": 1,
                "nMessages": 9,
                "messagesTokensSize": 111,
                "nTooLong": false,
                "assistantMessageLen": 28
            },
            {
                "index": 2,
                "nMissingSystem": 1,
                "nMessages": 2,
                "messagesTokensSize": 26,
                "nTooLong": false,
                "assistantMessageLen": 9
            },
            {
                "index": 3,
                "nMissingUser": 1,
                "nMessages": 2,
                "messagesTokensSize": 28,
                "nTooLong": false,
                "assistantMessageLen": 4
            },
            {
                "index": 4,
                "nMessages": 3,
                "messagesTokensSize": 8032,
                "nTooLong": true,
                "assistantMessageLen": 8000
            }
        ],
        "messageDistribution": {
            "min": 2,
            "max": 9,
            "mean": 3.8,
            "median": 3,
            "p1": 2,
            "p90": 9
        },
        "tokensDistribution": {
            "min": 26,
            "max": 8032,
            "mean": 1648.4,
            "median": 45,
            "p1": 26,
            "p90": 8032
        },
        "assistantTokenDistribution": {
            "min": 4,
            "max": 8000,
            "mean": 1610.2,
            "median": 10,
            "p1": 4,
            "p90": 8000
        },
        "costEstimation": {
            "nBillingTokensInDataset": 4306,
            "nEpochs": 20,
            "totalTokens": 86120,
            "costEstimation": 0.68896
        }
    }
}`))

  return (<>
    <Typography sx={{ my: 2 }} variant="h5">
      Details
    </Typography>
    <Grid container
          spacing={2}>
      <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
      <Grid item xs={12} sm={12} md={10} lg={8} xl={4}>

        <Grid container
              spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Cost Estimation
                </Typography>
                <Typography sx={{ fontSize: "1.7rem", fontWeight: 400 }} variant="currency" component="span">
                  ${data.report.costEstimation?.costEstimation}
                </Typography>
                <Typography sx={{ mb: 1.5 }} component="span" color="text.secondary">
                  {" "}USD
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Total Tokens
                </Typography>
                <Typography variant="h5" component="div">
                  {data.report.costEstimation?.totalTokens}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Dataset Tokens
                </Typography>
                <Typography variant="h5" component="div">
                  {data.report.costEstimation?.nBillingTokensInDataset}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Grid>
      <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
    </Grid>
  </>)
}