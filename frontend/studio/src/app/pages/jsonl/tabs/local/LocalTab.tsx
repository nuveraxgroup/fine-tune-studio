import { uploadService } from "../../../../services";
import { ChangeEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { If } from "../../../../@core";
import { Avatar, Button, Card, CardActionArea, CardHeader, Grid, Typography } from "@mui/material";
import { LocalFiles } from "../../../../services/UploadService";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EnhancedTable, { Column, Row } from "../../../common/TableBase";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadIcon from '@mui/icons-material/Upload';
import { useNavigate } from "react-router-dom";

interface Data extends Row{
  name: string
}

export const LocalTab = () => {
  const { localFiles, jsonl, jsonlDel } = uploadService()
  const [data, setData] = useState<Data[] | null>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<readonly string[]>([])
  const navigate = useNavigate()
  // const onDel = (data: Data) => {
  //   console.log("data", data)
  // }

  const generateColumns = (): Column<Data>[] => {
    return [
      {
        property: "name",
        label: 'Name',
        sort: true
      },
      // {
      //   label: 'Action',
      //   custom: (rowData, property?: any) => {
      //     return (<>
      //       <Tooltip title="Refresh">
      //       <IconButton onClick={(event) => {
      //         event.stopPropagation()
      //         onDel(rowData)
      //       }}>
      //         <RefreshIcon />
      //       </IconButton>
      //     </Tooltip>
      //     </>)
      //   }
      // }
    ];
  }

  const columns: readonly Column<Data>[] = useMemo(() => generateColumns(), [])

  const onInit = async () => {
    setData(null)
    setLoading(true)
    try {
      const res = await localFiles()
      const dt: Data[] = res.files.map((e, i) => {
        return { id: `file-${i}`, name: e.name }
      })
      setData(dt)
    } catch (error) {
      setData(null)
    }
    setLoading(false)
  }

  const onUploadClick = () => {
    if (inputFileRef.current !== null) {
      inputFileRef.current.click()
    }
  }

  const onUploadFiles = async (files: FileList) => {
    setLoading(true)
    const fileArray: File[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)
      if (file) {
        if (fileArray.length < 50) {
          fileArray.push(file)
        } else {
          break;
        }
      }
    }
    await Promise.all(
      fileArray.map((e) => jsonl({ file: e }))
    )
    setLoading(false)
    await onInit()
  }

  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files !== null) {
      onUploadFiles(e.target.files).then()
    }
  }

  const onChangeSelection = (values: readonly string[]) => {
    setSelected(values)
  }

  const onRowClick = (data: Data) => {
    navigate(`/jsonl/${data.name}`)
  }

  const onDeleteMulti = async () => {
    if (data !== null) {
      const filenames = selected
        .map((s) => data.find((d) => d.id === s)?.name)
        .filter(e => e !== undefined)
      await jsonlDel({ fileNames: filenames.map(e => e!!) })
      await onInit()
    }
  }

  useEffect(() => {
    onInit().then()
  }, []);

  return (<>
    <EnhancedTable
      multiSelect
      data={data}
      onChangeSelection={onChangeSelection}
      columns={columns}
      onRowClick={onRowClick}
      loading={loading}
      multiActions={<>
        <Button variant="outlined" onClick={onDeleteMulti}>
          Delete
        </Button>
      </>}
      actions={<>
        <Button variant="contained" onClick={onUploadClick} startIcon={<UploadIcon />}>
          Upload
        </Button>
        <Tooltip title="Refresh">
          <IconButton onClick={onInit}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </>}
      title="JSONL Files"/>
    <input
      onChange={onChangeFiles}
      ref={inputFileRef}
      style={{ display: "none" }}
      type="file"
      accept={".jsonl"}
      multiple />
  </>)
}