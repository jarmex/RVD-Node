import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TransByMSISDN from './ByMSISDN/TransByMSISDN';
import GlobalCount from './GlobalCount/GlobalCount';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class ReportPage extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    if (value === 2) {
      this.props.history.push('/audreport');
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Paper square>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Global List" />
            <Tab label="MSISDN Transaction" />
            <Tab label="Subscriber Audit" />
          </Tabs>
        </Paper>
        {value === 0 && (
          <TabContainer>
            <GlobalCount />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <TransByMSISDN />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <div>Subscriber Audit report</div>
          </TabContainer>
        )}
      </div>
    );
  }
}

ReportPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportPage);
