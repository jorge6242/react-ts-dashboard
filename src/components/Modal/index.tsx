import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStore } from "../../store/index";
import "./index.sass";

/**
 * Generic Modal
 *
 * @param {boolean} status Status Modal
 * @param {html} element Children Component
 * @param {boolean} isLoader Status Loader for asynchronous task
 * @param {boolean} customSize Modal Custom Size, default = 600px
 *
 * behavior :
 *
 * updateModal({ payload : { status : true , element : <Component/> } }) Open Modal
 *
 */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

export default function Modal() {
  const { state: { status, element, isLoader, customSize, title }, updateModal } = useStore('useModalStore');
  const classes = useStyles();
  return (
    <div className={`modal-main ${status ? "modal-main--active" : ""} `}>
      <div className="modal-main__backdrop">
        <Grid
          container
          spacing={0}
          className={`modal-main__content ${customSize}`}
        >
          <Grid container spacing={0} className="modal-main_header">
            <Grid item xs={4} className="modal-main_title">
              {title}
            </Grid>
            <Grid
              item
              xs={7}
              className="modal-main_close"
              onClick={() => updateModal({ payload: { status: false, element: <div /> } })}
            >
              X
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            className={`modal-main__loader ${
              isLoader ? "modal-main__active" : ""
              }`}
          >
            <div className={classes.root}>
              <CircularProgress />
              <CircularProgress color="secondary" />
            </div>
          </Grid>
          <Grid container spacing={0} className="modal-main__children">
            {element}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
