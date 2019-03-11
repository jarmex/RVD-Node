import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CountByDay from './CountByDay';
import CountMSISDN from './CountMSISDN';
import querystring from 'query-string';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function ShowGLReport({ classes }) {
  const date = querystring.parse(window.location.search);
  console.log(date);
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CountByDay flowend startDate={date.from} endDate={date.to} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CountMSISDN flowend startDate={date.from} endDate={date.to} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ShowGLReport);
