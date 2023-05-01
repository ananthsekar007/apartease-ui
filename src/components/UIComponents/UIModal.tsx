import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  IconButton,
} from "@mui/material";
import React from "react";
import { useIsDesktop } from "../../hooks/customHooks";
import { UIHeading } from "./UIHeading";
import "../components.css";

interface FormItemProps {
  left: any;
  right: any;
}

export function UIModelItem(props: FormItemProps) {
  return (
    <Grid style={{ marginTop: 25 }} container spacing={2}>
      <Grid item xs={10} sm={5}>
        <FormLabel>{props.left}</FormLabel>
      </Grid>
      <Grid item xs={1} sm={1}>
        :
      </Grid>
      <Grid item xs={10} sm={5}>
        {props.right}
      </Grid>
    </Grid>
  );
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  action?: React.ReactElement;
  fullScreen?: boolean;
  maxWidth?: "lg" | "sm";
  hideCancel?: boolean;
  disableBackdropClick?: boolean;
  minHeight?: number;
  overflow?: string;
  marginTop?: number;
  contentCenter?: boolean;
}

export function UIModel(props: Props) {
  const isDesktop = useIsDesktop();

  return (
    <Dialog
      fullWidth
      open={props.isOpen}
      onClose={props.onClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullScreen={props.fullScreen}
      maxWidth={props.maxWidth}
      PaperProps={{
        style: isDesktop
          ? {
              minHeight: props?.minHeight || 0,
            }
          : {
              width: "100%",
              margin: 1,
            },
      }}
    >
      <DialogTitle id="scroll-dialog-title" className={"root"}>
        <div className="flex-right">
          <UIHeading text={props.title} />
          <IconButton aria-label="close" onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent
        style={{
          marginTop: props?.marginTop || 20,
          overflow: props.overflow || "none",
          ...(props?.contentCenter && { justifyContent: "center" }),
        }}
      >
        {props.children}
      </DialogContent>
      <DialogActions>
        {!props.hideCancel && (
          <Button color="primary" onClick={props.onClose}>
            Cancel
          </Button>
        )}{" "}
        {props.action}
      </DialogActions>
    </Dialog>
  );
}
