import { ReactNode, useState, MouseEvent } from "react";
import { ReportResponse } from "../../../../model/upload.model";
import Grid from '@mui/material/Grid';
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TokenIcon from '@mui/icons-material/Token';
import DatasetIcon from '@mui/icons-material/Dataset';
import NumbersIcon from '@mui/icons-material/Numbers';
import * as React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DeblurIcon from '@mui/icons-material/Deblur'
import Plot from 'react-plotly.js'
import BarChartIcon from '@mui/icons-material/BarChart'

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
const histogramMenu = [
  {  }
]
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

  const [sampleIndex, setSampleIndex] = useState(0)
  const [anchorIndexMenu, setAnchorIndexMenu] = useState<null | HTMLElement>(null)
  const [anchorHistogramMenu, setAnchorHistogramMenu] = useState<null | HTMLElement>(null)

  const onChangeSampleIndex = (index: number) => {
    setSampleIndex(index)
    onCloseIndexMenu()
  }

  const onOpenIndexMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorIndexMenu(event.currentTarget)
  }

  const onOpenHistogramMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorHistogramMenu(event.currentTarget)
  }

  const onCloseIndexMenu = () => {
    setAnchorIndexMenu(null)
  }

  const onCloseHistogramMenu = () => {
    setAnchorHistogramMenu(null)
  }

  return (<>
    <Grid container
          spacing={2}>
      {data.report?.costEstimation &&
        <>
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
                        <DeblurIcon fontSize="small" color="action"/>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Samples
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="h5" component="div">
                      <NumericFormat
                        value={data.report.samples}
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
        </>
      }
      {data.report?.tokens && data.report?.tokens.length > 0 &&
        <>
          <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
          <Grid item xs={12} sm={12} md={10} lg={8} xl={4}>
            <Typography sx={{ my: 2 }} variant="h5">
              Tokens
            </Typography>
            <Button startIcon={<DeblurIcon />}
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={onOpenIndexMenu}
            >
              Sample: #{sampleIndex + 1}
            </Button>
            <Menu anchorEl={anchorIndexMenu}
                  onClose={onCloseIndexMenu}
                  open={Boolean(anchorIndexMenu)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  slotProps={{
                    paper: {
                      style: {
                        maxHeight: "200px"
                      }
                    }
                  }}>
              {data.report?.tokens.map((e, i) => (
                <MenuItem key={i}
                          selected={i === sampleIndex}
                          onClick={() => onChangeSampleIndex(i)}>
                  <ListItemIcon>
                    <DeblurIcon />
                  </ListItemIcon>
                  <ListItemText>
                    Sample #{i + 1}
                  </ListItemText>
                </MenuItem>
              ))
              }
            </Menu>
            {data.report?.tokens[sampleIndex].nTooLong &&
              <Alert severity="error">
                <AlertTitle>
                  Sample too long
                </AlertTitle>
                Max sample size 4,096
              </Alert>
            }
            {data.report?.tokens[sampleIndex].nMissingSystem &&
              <Alert severity="error">
                <AlertTitle>
                  Missing system messages
                </AlertTitle>
                { data.report?.tokens[sampleIndex].nMissingSystem } missing system messages
              </Alert>
            }
            {data.report?.tokens[sampleIndex].nMissingUser &&
              <Alert severity="error">
                <AlertTitle>
                  Missing user messages
                </AlertTitle>
                { data.report?.tokens[sampleIndex].nMissingUser } missing user messages
              </Alert>
            }
            <Card>
              <CardContent>
                <Grid container
                      spacing={2}>
                  <Grid item xs={6} sm={6} md={6} lg={4} xl={3}>
                    <LabelValue label="# Messages">
                      { data.report?.tokens[sampleIndex].nMessages }
                    </LabelValue>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={4} xl={3}>
                    <LabelValue label="Total Tokens">
                      { data.report?.tokens[sampleIndex].messagesTokensSize }
                    </LabelValue>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={4} xl={3}>
                    <LabelValue label="Assistant Tokens">
                      { data.report?.tokens[sampleIndex].assistantMessageLen }
                    </LabelValue>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
        </>
      }
      {data.report?.messageDistribution &&
        <>
          <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
          <Grid item xs={12} sm={12} md={10} lg={8} xl={4}>
            <Typography sx={{ my: 2 }} variant="h5">
              Messages
            </Typography>
            <Button startIcon={<BarChartIcon />}
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={onOpenHistogramMenu}
            >
              Histogram
            </Button>
            <Menu anchorEl={anchorHistogramMenu}
                  onClose={onCloseHistogramMenu}
                  open={Boolean(anchorHistogramMenu)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  slotProps={{
                    paper: {
                      style: {
                        maxHeight: "200px"
                      }
                    }
                  }}>
            </Menu>
            <Card>
              <CardContent>
                <Plot
                  data={[
                    {
                      x: (data.report.tokens === undefined ? []: data.report.tokens.map((e) => e.nMessages)),
                      type: 'histogram'
                    }
                  ]}
                  layout={ {
                    title: 'Distribution Histogram',
                    xaxis: {title: "Messages Count"},
                    yaxis: {title: "Frecuency"}
                  } }
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
        </>
      }
      {data.report?.tokensDistribution &&
        <>
          <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
          <Grid item xs={12} sm={12} md={10} lg={8} xl={4}>
            <Typography sx={{ my: 2 }} variant="h5">
              Message Tokens
            </Typography>
            <Plot
              data={[
                {
                  x: (data.report.tokens === undefined ? []: data.report.tokens.map((e) => e.messagesTokensSize)),
                  type: 'histogram'
                }
              ]}
              layout={ {
                title: 'Distribution Histogram',
                xaxis: {title: "Message Tokens"},
                yaxis: {title: "Frecuency"}
              } }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
        </>
      }
      {data.report?.assistantTokenDistribution &&
        <>
          <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
          <Grid item xs={12} sm={12} md={10} lg={8} xl={4}>
            <Typography sx={{ my: 2 }} variant="h5">
              Assistant Tokens
            </Typography>
            <Plot
              data={[
                {
                  x: (data.report.tokens === undefined ? []: data.report.tokens.map((e) => e.assistantMessageLen)),
                  type: 'histogram'
                }
              ]}
              layout={ {
                title: 'Distribution Histogram',
                xaxis: {title: "Assistant Tokens"},
                yaxis: {title: "Frecuency"}
              } }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={2} xl={4}></Grid>
        </>
      }
    </Grid>
  </>)
}