import { ReactNode } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { If } from "../../@core";

export interface DialogBaseProps {
  show: boolean
  onClose?: () => void
  title?: ReactNode
  children?: ReactNode
  actions?: ReactNode
}

export const DialogBase = ({
                             show,
                             onClose,
                             title,
                             children,
                             actions
                           }: DialogBaseProps) => {
  return (<Dialog
    open={show}
    onClose={onClose}
  >
    <If condition={title !== undefined}>
      <DialogTitle>
        { title }
      </DialogTitle>
    </If>
    <DialogContent>
      { children }
    </DialogContent>
    <If condition={actions !== undefined}>
      <DialogActions>
        { actions }
      </DialogActions>
    </If>
  </Dialog>)
}