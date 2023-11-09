import { useParams } from "react-router-dom";
import { finetuneService } from "../../../../services";
import { ReactNode, useEffect, useState } from "react";
import { FinetuneJob } from "../../../../services/FinetuneService";
import {
  Grid,
  Paper,
  Box,
  LinearProgress,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Case, If, Switch } from "../../../../@core";
import * as React from "react";

export interface LabelValueProps{
  if?: boolean
  label: ReactNode
  children?: ReactNode
}
export const LabelValue = (props: LabelValueProps) => {
  return (<>
    <If condition={props.if === undefined ? true: props.if} elseRender={<></>}>
      <Typography sx={{ marginBottom: "10px" }} variant="caption" color="text.secondary">
        {props.label}
      </Typography>
      <Typography sx={{ marginBottom: "10px" }}>
        {props.children}
      </Typography>
    </If>
  </>)
}

export const DetailsTab = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<FinetuneJob | null>(null)
  const params = useParams()
  const { retrieve } = finetuneService()

  const onInit = async () => {
    setLoading(true)
    setData(null)
    try {
      const res = await retrieve(params["id"]!!)
      setData(res)
    } catch (e) {
      setData(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    onInit().then()
  }, []);

  return (<>
    <Box sx={{ my: 5 }}>
      {data !== null &&
        <>
          <Switch select={data.fineTune.status}>
            <Case value="failed">
              <Alert severity="error">
                <AlertTitle>Something went wrong ({data.fineTune.error?.param}).</AlertTitle>
                { data.fineTune.error?.message } — <strong>{data.fineTune.error?.code}</strong>
              </Alert>
            </Case>
          </Switch>
        </>
      }
      <Paper elevation={1} sx={{ p: 3 }}>
        <If condition={loading}>
          <LinearProgress />
        </If>
        {data !== null &&
          <>
            <Grid container
                  spacing={2}>
              <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                <LabelValue label="Training file">
                  {data.fineTune.training_file}
                </LabelValue>
              </Grid>
              {data.fineTune.validation_file !== null &&
                (
                  <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                    <LabelValue label="Validation file">
                      {data.fineTune.validation_file}
                    </LabelValue>
                  </Grid>
                )
              }
              {data.fineTune.trained_tokens !== null &&
                (
                  <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                    <LabelValue label="Trained tokens">
                      {data.fineTune.trained_tokens}
                    </LabelValue>
                  </Grid>
                )
              }
              <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                <LabelValue label="Model">
                  {data.fineTune.model}
                </LabelValue>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                <LabelValue label="Status">
                  {data.fineTune.status}
                </LabelValue>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                <LabelValue label="Organization ID">
                  {data.fineTune.organization_id}
                </LabelValue>
              </Grid>
              {data.fineTune.fine_tuned_model !== null &&
                (
                  <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                    <LabelValue label="Fine-tuned model">
                      {data.fineTune.fine_tuned_model}
                    </LabelValue>
                  </Grid>
                )
              }
              <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                <LabelValue label="Hyper params">
                  N Epochs: {data.fineTune.hyperparameters.n_epochs}
                </LabelValue>
              </Grid>
              {data.fineTune.result_files.length > 0 &&
                (
                  <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                    <LabelValue label="Result files">
                      {JSON.stringify(data.fineTune.result_files, null, 2)}
                    </LabelValue>
                  </Grid>
                )
              }
              <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                <LabelValue label="Created">
                  {new Date(data.fineTune.created_at * 1000).toLocaleString()}
                </LabelValue>
              </Grid>
              {data.fineTune.finished_at !== null &&
                (
                  <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                    <LabelValue label="Finished">
                      {new Date(data.fineTune.finished_at * 1000).toLocaleString()}
                    </LabelValue>
                  </Grid>
                )
              }
            </Grid>
          </>
        }
      </Paper>
    </Box>
  </>)
}