import { Button, Paper, Typography, useTheme } from "@mui/material";
import { useRef, useState, DragEvent, ChangeEvent } from "react";
import UploadIcon from "@mui/icons-material/Upload";

export type ExtraProps = {
  [key: string]: string
}

export interface DragAndDropInputProps{
  multi?: boolean
  accept?: string[]
  extra?: ExtraProps
  onFiles?: (files: File[], extra?: ExtraProps) => void
  limit?: number
}

export const DragAndDropInput = ({
                                   multi = true,
                                   accept = ["*"],
                                   extra,
                                   onFiles,
                                   limit = 3
                                 }: DragAndDropInputProps) => {
  const theme = useTheme()
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onUploadFiles = (files: FileList) => {
    const fileArray: File[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)
      if (file) {
        if (fileArray.length < limit) {
          fileArray.push(file)
        } else {
          break;
        }
      }
    }
    if (onFiles) {
      onFiles(fileArray, extra)
    }
  }

  const onUploadSingle = (files: FileList) => {
    const fileArray: File[] = []
    const file = files.item(0)
    if (file && file.name.endsWith(accept[0])) {
      fileArray.push(file)
    }
    if (onFiles) {
      onFiles(fileArray, extra)
    }
  }

  const onDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && multi) {
      onUploadFiles(e.dataTransfer.files);
    }
    if (e.dataTransfer.files && !multi) {
      onUploadSingle(e.dataTransfer.files);
    }
  }

  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0] && multi) {
      onUploadFiles(e.target.files);
    }
    if (e.target.files && !multi) {
      onUploadSingle(e.target.files);
    }
  }

  const onClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  return (<Paper
    sx={{ marginBottom: "30px" }}
    variant="outlined" square>
    <form style={{
      height: "16rem",
      width: "100%",
      maxWidth: "100%",
      textAlign: "center",
      position: "relative"
    }} onDragEnter={onDrag}
          onSubmit={(e) => e.preventDefault()}>
      <input
        onChange={onChangeFiles}
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept={accept?.join(", ")}
        multiple={multi} />
      <label
        htmlFor="input-file-upload"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: dragActive ? theme.palette.secondary.light: theme.palette.background.default
        }}>
        <div>
          <Typography sx={{ marginTop: "10px", marginBottom: "10px" }}>
            Drag and drop your JSONL file
          </Typography>
          <Button variant="outlined"
                  onClick={onClick}
                  disableElevation
                  startIcon={<UploadIcon />}>
            Upload file
          </Button>
        </div>
      </label>
      { dragActive && <div id="drag-file-element"
                           style={{
                             position: "absolute",
                             width: "100%",
                             height: "100%",
                             top: "0px",
                             right: "0px",
                             bottom: "0px",
                             left: "0px"
                           }}
                           onDragEnter={onDrag}
                           onDragLeave={onDrag}
                           onDragOver={onDrag}
                           onDrop={onDrop}></div> }
    </form>
  </Paper>)
}