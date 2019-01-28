import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import {
  QueryProjectListGQL,
  RefreshProjectGQL,
} from '../graphql/ProjectsList';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditProject from './EditProject';
import { UserConsumer } from '../routes/LoginContext';

dayjs.extend(relativeTime);

const styles = (theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class AppProjectList extends React.Component {
  state = {
    open: false,
    selectedProject: {},
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  formatDate = (date) => dayjs(date).fromNow();

  handleRefresh = async (e, data, refreshProject) => {
    e.preventDefault();
    const { sid, shortcode } = data;
    if (!shortcode) {
      alert('Cannot refresh. Try again');
      return;
    }
    try {
      const { data } = await refreshProject({
        variables: {
          sid,
          shortcode,
        },
      });
      const { message } = data.refreshProject;
      alert(message);
    } catch (error) {
      alert('ERROR!!' + error.message);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Query query={QueryProjectListGQL}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading</div>;
          }
          if (error) {
            return <div>Error!! Unable to query the project list</div>;
          }
          const { getprojects } = data;
          return (
            <UserConsumer>
              {({ login }) => (
                <Mutation mutation={RefreshProjectGQL}>
                  {(refreshProject) => (
                    <Paper className={classes.root}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Application Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Short Code</TableCell>
                            <TableCell align="right">Date Created</TableCell>
                            <TableCell align="right">Date Updated</TableCell>
                            <TableCell align="right" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {getprojects.map((n) => (
                            <TableRow key={n.sid}>
                              <TableCell component="th" scope="row">
                                {n.sid}
                              </TableCell>
                              <TableCell>{n.friendlyName}</TableCell>
                              <TableCell>{n.shortcode}</TableCell>
                              <TableCell align="right">
                                {this.formatDate(n.dateCreated)}
                              </TableCell>
                              <TableCell align="right">
                                {this.formatDate(n.dateUpdated)}
                              </TableCell>
                              <TableCell align="right">
                                <div>
                                  <IconButton
                                    className={classes.button}
                                    aria-label="Delete"
                                    onClick={(e) =>
                                      this.handleRefresh(e, n, refreshProject)
                                    }
                                  >
                                    <RefreshIcon />
                                  </IconButton>
                                  {login ? (
                                    <IconButton
                                      className={classes.button}
                                      aria-label="Delete"
                                      onClick={(e) => {
                                        this.setState({ selectedProject: n });
                                        this.handleClickOpen();
                                      }}
                                    >
                                      <CreateIcon />
                                    </IconButton>
                                  ) : null}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogContent>
                          <EditProject
                            project={this.state.selectedProject}
                            onClose={this.handleClose}
                          />
                        </DialogContent>
                      </Dialog>
                    </Paper>
                  )}
                </Mutation>
              )}
            </UserConsumer>
          );
        }}
      </Query>
    );
  }
}

AppProjectList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppProjectList);
