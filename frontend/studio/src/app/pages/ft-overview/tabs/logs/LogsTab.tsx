import { useEffect, useMemo, useState } from "react";
import { finetuneService } from "../../../../services";
import { useParams } from "react-router-dom";
import { EventError, FinetuneEventData } from "../../../../services/FinetuneService";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import EnhancedTable, { Column, Row } from "../../../common/TableBase";
import * as React from "react";
import { Case, Switch } from "../../../../@core";
import ErrorIcon from "@mui/icons-material/Error";
import { green, red } from "@mui/material/colors";
import InsertPageBreakIcon from "@mui/icons-material/InsertPageBreak";
import InfoIcon from '@mui/icons-material/Info';
interface Data extends Row{
  level: string
  message: string
  type: string
  data: EventError | {}
  created_at: number
}
export const LogsTab = () => {
  const [data, setData] = useState<Data[]  | null>(null)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { events } = finetuneService()
  const generateColumns = (): Column<Data>[] => {
    return [
      {
        property: "level",
        label: 'Level',
        sort: true,
        custom: (data, property) => {
          return (<>
            <Switch select={property} otherwise={property}>
              <Case value={"error"}>
                <Tooltip title={`${(data.data as EventError).error_param} - ${(data.data as EventError).error_code}`}>
                  <ErrorIcon fontSize="small" sx={{ color: red[500] }}/>
                </Tooltip>
              </Case>
              <Case value={"info"}>
                <InfoIcon fontSize="small" color="action"/>
              </Case>
            </Switch>
          </>)
        }
      },
      {
        property: "message",
        label: 'Message',
        sort: true
      },
      {
        property: "created_at",
        label: 'Created',
        sort: true,
        custom: (_data, property) => {
          const date = new Date(Number(property) * 1000)
          return (<>
            <div>{ date.toLocaleString() }</div>
          </>)
        }
      }
    ]
  }
  const columns: readonly Column<Data>[] = useMemo(() => generateColumns(), [])
  const onInit = async () => {
    setLoading(true)
    setData(null)
    try {
      const res = await events(params["id"]!!)
      const newData: Data[] = res.events.data.map((e) => ({
        id: e.id,
        level: e.level,
        message: e.message,
        type: e.type,
        data: e.data,
        created_at: e.created_at
      }))
      setData(newData)
    } catch (e) {
      setData(null)
    }
    setLoading(false)
  }
  useEffect(() => {
    onInit().then()
  }, []);

  return (<>
    <EnhancedTable
      data={data}
      columns={columns}
      loading={loading}
      orderBy="created_at"
      actions={<>
        <Tooltip title="Refresh">
          <IconButton onClick={onInit}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </>}
      title="Fine-tune logs"/>
  </>)
}