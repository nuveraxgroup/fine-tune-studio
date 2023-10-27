import { ReactNode, Suspense } from "react";
import { Box, LinearProgress } from "@mui/material";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
})

export const SuspenseTabPanel = ({
                            value,
                            index,
                            children,
                            ...other
                          }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {value === index && (
      <>
        <Suspense fallback={
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        }>
          {children}
        </Suspense>
      </>
    )}
  </div>
)