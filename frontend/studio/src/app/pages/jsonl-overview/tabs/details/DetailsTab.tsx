import { ReactNode, useState } from "react";
import { ReportResponse } from "../../../../model/upload.model";
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography } from "@mui/material";
import { NumericFormat } from 'react-number-format';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TokenIcon from '@mui/icons-material/Token';
import DatasetIcon from '@mui/icons-material/Dataset';
import NumbersIcon from '@mui/icons-material/Numbers';
import { LabelValueProps } from "../../../ft-overview/tabs/details/DetailsTab";
import { If } from "../../../../@core";
import * as React from "react";

export interface LabelValueProps{
  label: ReactNode
  children?: ReactNode
}
export const LabelValue = (props: LabelValueProps) => {
  return (<>
    <Typography sx={{ marginBottom: "10px" }} variant="caption" color="text.secondary">
      {props.label}
    </Typography>
    <Typography sx={{ marginBottom: "10px" }}>
      {props.children}
    </Typography>
  </>)
}

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
    <Grid container
          spacing={2}>
      <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
      <Grid item xs={12} sm={12} md={10} lg={8} xl={4}>
        <Typography sx={{ my: 2 }} variant="h5">
          Cost
        </Typography>
        <Grid container
              spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <AttachMoneyIcon fontSize="small" color="action"/>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Cost Estimation
                    </Typography>
                  </Grid>
                </Grid>
                <Typography sx={{ fontSize: "1.7rem", fontWeight: 400 }} variant="currency" component="span">
                  <NumericFormat value={data.report.costEstimation?.costEstimation} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={'$'} />
                </Typography>
                <Typography sx={{ mb: 1.5 }} component="span" color="text.secondary">
                  {" "}USD
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <TokenIcon fontSize="small" color="action"/>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Total Tokens
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h5" component="div">
                  <NumericFormat
                    value={data.report.costEstimation?.totalTokens}
                    displayType={'text'}
                    thousandSeparator={true} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <DatasetIcon fontSize="small" color="action"/>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Dataset Tokens
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h5" component="div">
                  <NumericFormat
                    value={data.report.costEstimation?.nBillingTokensInDataset}
                    displayType={'text'}
                    thousandSeparator={true} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <NumbersIcon fontSize="small" color="action"/>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Epochs
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h5" component="div">
                  <NumericFormat
                    value={data.report.costEstimation?.nEpochs}
                    displayType={'text'}
                    thousandSeparator={true} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Grid>
      <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>

      <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
      <Grid item xs={12} sm={12} md={10} lg={8} xl={4}>
        <Typography sx={{ my: 2 }} variant="h5">
          Tokens
        </Typography>
        <Card>
          <CardContent>
            <Grid container
                  spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={4} xl={3}>
                <LabelValue label="# Mensages">
                  { data.report?.tokens[0].nMessages }
                </LabelValue>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
    </Grid>
  </>)
}