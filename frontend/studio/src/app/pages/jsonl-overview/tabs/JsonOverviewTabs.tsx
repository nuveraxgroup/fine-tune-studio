import { lazy, SyntheticEvent, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { a11yProps, SuspenseTabPanel } from "../../../component";

const Details =
  lazy(() => import('./details/DetailsTab')
    .then(({ DetailsTab }) => ({ default: DetailsTab })))

const Samples =
  lazy(() => import('./samples/SamplesTab')
    .then(({ SamplesTab }) => ({ default: SamplesTab })))

export const JsonOverviewTabs = () => {
  const [tab, setTab] = useState(0)
  const onChangeTab = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  }
  return (<>
    <Box sx={{ fontSize: "10px", borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tab} onChange={onChangeTab}>
        <Tab label="Details" {...a11yProps(0)}/>
        <Tab label="Samples" {...a11yProps(1)}/>
      </Tabs>
    </Box>
    <SuspenseTabPanel value={tab} index={0}>
      <Details/>
    </SuspenseTabPanel>
    <SuspenseTabPanel value={tab} index={1}>
      <Samples/>
    </SuspenseTabPanel>
  </>)
}