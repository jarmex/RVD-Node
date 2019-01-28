import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
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
    refresh: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleRefresh = () => {
    this.setState({ refresh: !this.state.refresh });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <div className={classes.appBarSpacer} /> */}
        <div>
          <div style={{ float: 'left' }}>
            <Typography variant="h4" gutterBottom component="h2">
              Past 7 days{' '}
            </Typography>
          </div>
          <div style={{ float: 'right', marginRight: '20px' }}>
            <IconButton
              className={classes.button}
              aria-label="Delete"
              onClick={(e) => this.handleRefresh()}
            >
              <RefreshIcon />
            </IconButton>
          </div>
        </div>
        <div style={{ clear: 'both' }}>
          <Typography component="div" className={classes.chartContainer}>
            <WeeklySummary refresh={this.state.refresh} />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Project List
          </Typography>
          <div className={classes.tableContainer}>
            <AppProjectList />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
