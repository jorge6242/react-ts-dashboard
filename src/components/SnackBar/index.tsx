import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import { useStore } from "../../store";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function SnackBar() {
  const classes = useStyles();
  const { status, message, type, snackBarUpdate } = useStore('useSnackBarStore');

  const handleClose = () => {
      snackBarUpdate({
        payload: {
          message: "",
          status: false,
          type: ""
        }
      });
  };

  return (
    <div className={classes.root}>
      <Snackbar open={status} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
