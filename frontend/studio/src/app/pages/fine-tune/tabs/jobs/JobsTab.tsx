import { finetuneService } from "../../../../services";
import { useEffect, useState } from "react";
import { JobList } from "../../../../services/FinetuneService";
import { If } from "../../../../@core";
import {
  Button,
  DialogContentText,
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField
} from "@mui/material";
import { DialogBase } from "../../../common/DialogBase";

export const JobsTab = () => {
  const [data, setData] = useState<JobList | null>(null)
  const [showNewJob, setShowJob] = useState(false)
  const [training, setTraining] = useState("")
  const [validation, setValidation] = useState("")
  const { list } = finetuneService()

  useEffect(() => {
    list().then((res) => {
      setData(res)
    }).catch((error) => {
      console.error(error)
    })
  }, []);

  const newJob = () => {
    setShowJob(true)
  }

  const handleCloseNewJob = () => {
    setShowJob(false)
    setTraining("")
    setValidation("")
  }
  const handleTraining = (event: SelectChangeEvent) => {
    setTraining(event.target.value as string)
  }
  const handleValidation = (event: SelectChangeEvent) => {
    setValidation(event.target.value as string)
  }

  return (<>
    <Button variant="contained" onClick={newJob}>New Job</Button>
    <If condition={data !== null}>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </If>
    <DialogBase show={showNewJob}
                onClose={handleCloseNewJob}
                title="New Fine-tune job"
                actions={<>
                    <Button onClick={handleCloseNewJob}>Cancel</Button>
                    <Button variant="contained" onClick={handleCloseNewJob}>
                      Create
                    </Button>
                </>}>
      <DialogContentText sx={{ my: "15px" }}>
        Fill-out the next form for creating your job.
      </DialogContentText>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="training-jsonl-label">Training JSONL</InputLabel>
        <Select
          labelId="training-jsonl-label"
          value={training}
          label="Training JSONL"
          onChange={handleTraining}
        >
          <MenuItem value={"1"}>Value 1</MenuItem>
          <MenuItem value={"2"}>Value 2</MenuItem>
          <MenuItem value={"3"}>Value 3</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth label="Sufix model" variant="outlined" />
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="validation-jsonl-label">Validation JSONL</InputLabel>
        <Select
          labelId="validation-jsonl-label"
          value={validation}
          label="Validation JSONL"
          onChange={handleValidation}
        >
          <MenuItem value={"1"}>Value 1</MenuItem>
          <MenuItem value={"2"}>Value 2</MenuItem>
          <MenuItem value={"3"}>Value 3</MenuItem>
        </Select>
      </FormControl>
    </DialogBase>
  </>)
}