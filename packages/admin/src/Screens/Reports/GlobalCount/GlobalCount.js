import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Button from '@material-ui/core/Button';

const styles = {
  grid: {
    width: '60%',
  },
};

class GlobalCount extends Component {
  constructor(props) {
    super(props);
    const ndate = new Date();
    ndate.setDate(ndate.getDate() - 10);
    this.state = {
      startDate: ndate,
      endDate: new Date(),
      parsestartDate: ndate.toJSON(),
      parseendDate: new Date().toJSON(),
    };
  }

  startDateChange = (date) => {
    this.setState({ startDate: date, parsestartDate: new Date(date).toJSON() });
  };
  endDateChange = (date) => {
    this.setState({ endDate: date, parseendDate: new Date(date).toJSON() });
  };

  onNavigate = (page) => this.props.history.push(page);

  render() {
    const { classes } = this.props;
    const { startDate, endDate } = this.state;
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} justify="space-around">
            <DatePicker
              margin="normal"
              label="Start Date"
              value={startDate}
              format="DD-MMM-YYYY"
              name="startDate"
              onChange={this.startDateChange}
            />
            <DatePicker
              margin="normal"
              label="End Date"
              name="endDate"
              format="DD-MMM-YYYY"
              value={endDate}
              onChange={this.endDateChange}
            />

            <Button
              onClick={() =>
                this.onNavigate(
                  `/glreport?from=${this.state.parsestartDate}&to=${
                    this.state.parseendDate
                  }`,
                )
              }
              color="primary"
            >
              Search
            </Button>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}
const WithRouteGL = withRouter(GlobalCount);
export default withStyles(styles)(WithRouteGL);
