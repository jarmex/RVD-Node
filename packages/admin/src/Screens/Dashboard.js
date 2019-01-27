import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import WeeklySummary from './WeeklySummary';
import AppProjectList from './AppProjectList';

const styles = (theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

class Dashboard extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <div className={classes.appBarSpacer} /> */}
        <Typography variant="h4" gutterBottom component="h2">
          Past 7 days
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <WeeklySummary />
        </Typography>
        <Typography variant="h4" gutterBottom component="h2">
          Project List
        </Typography>
        <div className={classes.tableContainer}>
          <AppProjectList />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
