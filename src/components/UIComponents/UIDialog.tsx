import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UIButton } from './UIButton';

interface UIDialogProps {
    open: boolean;
    loading: boolean;
    title: string;
    content: string;
    submitText: string;
    disagreeText: string;
    handleClose: () => void;
}

export const UIDialog = (props: UIDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{props.disagreeText}</Button>
          <UIButton onClick={handleClose} autoFocus loading={props.loading}>
            {props.submitText}
          </UIButton>
        </DialogActions>
      </Dialog>
  );
}