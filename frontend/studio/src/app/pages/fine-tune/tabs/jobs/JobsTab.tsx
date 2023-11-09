import { finetuneService, uploadService } from "../../../../services";
import { useEffect, useMemo, useState } from "react";
import ScheduleIcon from '@mui/icons-material/Schedule';
import { ErrorJob, JobList } from "../../../../services/FinetuneService";
import { Case, If, Switch } from "../../../../@core";
import {
  Button,
  DialogContentText,
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography
} from "@mui/material";
import { DialogBase } from "../../../common/DialogBase";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import EnhancedTable, { Column, Row } from "../../../common/TableBase";
import * as React from "react";
import { LocalFiles, UploadToOpenAI } from "../../../../services/UploadService";
import ErrorIcon from '@mui/icons-material/Error';
import { red, green } from "@mui/material/colors";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";

interface Data extends Row{
  training_file: string
  status: string
  model: string
  finished_at?: number | null
  created_at: number
  error?: ErrorJob | null
}

interface NewJob {
  training: string
  validation?: string
  suffix?: string
}

interface CreateJonDialogProps {
  show: boolean
  onClose: (newJobData?: NewJob) => void
}
const CreateJonDialog = (props: CreateJonDialogProps) => {
  const [jsonlFiles, setJsonlFiles] = useState<LocalFiles | null>(null)
  const [training, setTraining] = useState("")
  const [validation, setValidation] = useState("")
  const [suffix, setSuffix] = useState("")
  const { localFiles } = uploadService()
  const onInit = async () => {
    const files = await localFiles()
    setJsonlFiles(files)
  }
  const handleTraining = (event: SelectChangeEvent) => {
    setTraining(event.target.value as string)
  }
  const handleValidation = (event: SelectChangeEvent) => {
    setValidation(event.target.value as string)
  }
  useEffect(() => {
    if (props.show) {
      onInit().then()
    } else {
      setTraining("")
      setValidation("")
      setSuffix("")
    }
  }, [props.show]);

  const onConfirm = () => {
    if (training !== "") {
      props.onClose({
        training,
        suffix: suffix !== "" ? suffix: undefined,
        validation: validation !== "" ? validation: undefined
      })
    }
  }

  return (<>
    <DialogBase show={props.show}
                onClose={() => props.onClose()}
                title="New Fine-tune job"
                actions={<>
                  <Button onClick={() => props.onClose()}>Cancel</Button>
                  <Button disabled={training === ""} variant="contained" onClick={onConfirm}>
                    Create
                  </Button>
                </>}>
      <DialogContentText sx={{ my: "15px" }}>
        Fill-out the next form for creating your job.
      </DialogContentText>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="training-jsonl-label">Training JSONL*</InputLabel>
        <Select
          labelId="training-jsonl-label"
          value={training}
          label="Training JSONL*"
          onChange={handleTraining}
        >
          {jsonlFiles !== null ? (
            jsonlFiles.files.map((e, i) => (
              <MenuItem key={i} value={e.name}>{e.name}</MenuItem>
            ))): (<div>Empty values</div>)
          }
        </Select>
      </FormControl>
      <Typography sx={{ my: 2 }} variant="body1">
        Optional fields
      </Typography>
      <TextField fullWidth label="Sufix model" variant="outlined"
                 value={suffix}
                 onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                   setSuffix(event.target.value);
                 }}/>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="validation-jsonl-label">Validation JSONL</InputLabel>
        <Select
          labelId="validation-jsonl-label"
          value={validation}
          label="Validation JSONL"
          onChange={handleValidation}
        >
          <MenuItem value="">None</MenuItem>
          {jsonlFiles !== null ? (
            jsonlFiles.files.map((e, i) => (
              <MenuItem key={i} value={e.name}>{e.name}</MenuItem>
            ))): (<div>Empty values</div>)
          }
        </Select>
      </FormControl>
    </DialogBase>
  </>)
}

export const JobsTab = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<Data[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [showNewJob, setShowJob] = useState(false)
  const [selected, setSelected] = useState<readonly string[]>([])
  const { list, del } = finetuneService()
  const { push } = uploadService()

  const onInit = async () => {
    setLoading(true)
    setData(null)
    try{
      const lt = await list()
      setData(lt.page.data.map((e) => (
        {
          id: e.id,
          training_file: e.training_file,
          status: e.status,
          model: e.model,
          finished_at: e.finished_at,
          created_at: e.created_at,
          error: e.error
        }
      )))
      setLoading(false)
    } catch (e) {
      setData(null)
      setLoading(false)
    }
  }

  useEffect(() => {
    onInit().then()
  }, []);

  const newJob = () => {
    setShowJob(true)
  }

  const handleCloseNewJob = async (newJobData?: NewJob) => {
    setLoading(true)
    setShowJob(false)
    if (newJobData) {
      const obj: UploadToOpenAI = {
        trainingFile: newJobData.training
      }
      if (newJobData.validation) {
        obj.validationFIle = newJobData.validation
      }
      if (newJobData.suffix) {
        obj.suffix = newJobData.suffix
      }
      const res = await push(obj)
      await onInit()
    }
    setLoading(false)
  }

  const generateColumns = (): Column<Data>[] => {
    return [
      {
        property: "training_file",
        label: 'Training File',
        sort: true
      },
      {
        property: "status",
        label: 'Status',
        sort: true,
        custom: (data, property) => {
          return (<>
            <Switch select={property} otherwise={property}>
              <Case value={"failed"}>
                <Tooltip title={data.error?.message}>
                  <ErrorIcon fontSize="small" sx={{ color: red[500] ?? "" }}/>
                </Tooltip>
              </Case>
              <Case value={"validating_files"}>
                <InsertPageBreakIcon fontSize="small" color="action"/>
              </Case>
              <Case value={"running"}>
                <PlayCircleIcon fontSize="small" color="action"/>
              </Case>
              <Case value={"succeeded"}>
                <CheckCircleIcon fontSize="small" sx={{ color: green[500] ?? "" }}/>
              </Case>
            </Switch>
          </>)
        }
      },
      {
        property: "model",
        label: 'Model',
        sort: true
      },
      {
        property: "created_at",
        label: 'Created',
        sort: true,
        custom: (_data, property) => {
          const date = new Date(Number(property) * 1000)
          return (<>
            <Tooltip title={date.toLocaleString()}>
              <div>{ date.toLocaleDateString() }</div>
            </Tooltip>
          </>)
        }
      },
      {
        property: "finished_at",
        label: 'Finished',
        sort: true,
        custom: (_data, property) => {
          if (property !== null) {
            const date = new Date(Number(property) * 1000)
            return (<>
              <Tooltip title={date.toLocaleString()}>
                <div>{ date.toLocaleDateString() }</div>
              </Tooltip>
            </>)
          }
          return <>Unknown</>
        }
      }
    ];
  }

  const columns: readonly Column<Data>[] = useMemo(() => generateColumns(), [])

  const onChangeSelection = (values: readonly string[]) => {
    setSelected(values)
  }

  const onRowClick = (data: Data) => {
    navigate(`/fine-tune/${data.id}`)
  }
  return (<>
    <EnhancedTable
      data={data}
      onChangeSelection={onChangeSelection}
      columns={columns}
      onRowClick={onRowClick}
      loading={loading}
      actions={<>
        <Button variant="contained" onClick={newJob} startIcon={<ScheduleIcon />}>
          New
        </Button>
        <Tooltip title="Refresh">
          <IconButton onClick={onInit}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </>}
      title="Fine-tune jobs"/>
    <CreateJonDialog show={showNewJob} onClose={handleCloseNewJob}/>
  </>)
}