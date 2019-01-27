import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

const TopLeftSideBar = ({ onNavigate }) => (
  <List>
    <ListItem button onClick={() => onNavigate('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <OfflineBoltIcon />
        {/* <ShoppingCartIcon /> */}
      </ListItemIcon>
      <ListItemText primary="Simulator" />
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Logs" />
    </ListItem> */}
    <ListItem button onClick={() => onNavigate('/msisdn')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Plugins" />
    </ListItem>
  </List>
);

const MiddleLeftSideBar = () => (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);

export default class SideBar extends React.Component {
  render() {
    return (
      <div>
        <TopLeftSideBar onNavigate={this.props.onNavigate} />
        <Divider />
        <MiddleLeftSideBar onNavigate={this.props.onNavigate} />
      </div>
    );
  }
}
