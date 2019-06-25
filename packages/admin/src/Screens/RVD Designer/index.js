import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function RVDDesigner() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>Show the phone simulator here</Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={() => {
                      alert('imsi');
                    }}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="IMSI"
              />
            </FormGroup>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
