import MonacoEditor from 'react-monaco-editor'
import { MouseEvent, useState } from "react";
import * as monacoEditor from "monaco-editor";
import DeblurIcon from "@mui/icons-material/Deblur";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import * as React from "react";

export const SamplesTab = () => {
  const [sampleIndex, setSampleIndex] = useState(0)
  const [anchorIndexMenu, setAnchorIndexMenu] = useState<null | HTMLElement>(null)
  const [code, setCode] = useState(`{"hola":"mundo"}`)

  const onOpenIndexMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorIndexMenu(event.currentTarget)
  }

  const onCloseIndexMenu = () => {
    setAnchorIndexMenu(null)
  }

  const onChangeSampleIndex = (index: number) => {
    setSampleIndex(index)
    onCloseIndexMenu()
  }

  const editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {

  }

  const onChange = (newValue: string, event: monacoEditor.editor.IModelContentChangedEvent) => {

  }

  return (<>
    <Button startIcon={<DeblurIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={onOpenIndexMenu}
    >
      Sample: #{sampleIndex}
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
      <MenuItem
                onClick={() => onChangeSampleIndex(1)}>
        <ListItemIcon>
          <DeblurIcon />
        </ListItemIcon>
        <ListItemText>
          Sample #1
        </ListItemText>
      </MenuItem>
    </Menu>
    <MonacoEditor
      height="500"
      language="json"
      theme="vs-dark"
      value={code}
      options={{
        readOnly: true,
        language: "json"
      }}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  </>)
}