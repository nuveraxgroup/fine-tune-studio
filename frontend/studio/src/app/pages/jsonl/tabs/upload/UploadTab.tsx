import { DragAndDropInput } from "./DragAndDropInput";
import { useState } from "react";
import { Grid } from "@mui/material";
import { FileInfo } from "../../../../component";
import { uploadService } from "../../../../services";

export const UploadTab = () => {
  const { jsonl } = uploadService()
  const [files, setFiles] = useState<File[]>([])
  const onFiles = async (files: File[]) => {
    setFiles(files)
    const res = await jsonl({
      file: files[0]
    })
    console.log("res", res)
  }
  return (<>
    <h5>Upload files</h5>
    <DragAndDropInput onFiles={onFiles} multi={false} accept={[".jsonl"]}/>

    <Grid container spacing={2}>
      {files.map(
        (e, i) => (
          <Grid key={i} item xs={12} md={6}>
            <FileInfo file={e}/>
          </Grid>
        ))
      }
    </Grid>
  </>)
}