import { Box, Tab, Tabs } from "@mui/material";
import { lazy, SyntheticEvent, useState } from "react";
import { a11yProps, SuspenseTabPanel } from "../../../component";

const Upload =
  lazy(() => import('./upload/UploadTab')
    .then(({ UploadTab }) => ({ default: UploadTab })))

const Local =
  lazy(() => import('./local/LocalTab')
    .then(({ LocalTab }) => ({ default: LocalTab })))

export const JsonlTabs = () => {
  const [tab, setTab] = useState(0)
  const onChangeTab = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  }
  return (<>
    <Box sx={{ fontSize: "10px", borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tab} onChange={onChangeTab}>
        <Tab label="Files" {...a11yProps(0)}/>
        <Tab label="Upload" {...a11yProps(1)}/>
      </Tabs>
    </Box>
    <SuspenseTabPanel value={tab} index={0}>
      <Local/>
    </SuspenseTabPanel>
    <SuspenseTabPanel value={tab} index={1}>
      <Upload/>
    </SuspenseTabPanel>
  </>)
}