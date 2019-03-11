import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { Query } from 'react-apollo';
import { QueryTop100TransGQL } from '../../../graphql/Transactions';
import dayjs from 'dayjs';

const styles = {
  narrowCell: {
    width: '100px',
  },
  miniCell: {
    width: '65px',
  },
};

class LatestTransaction extends Component {
  state = {
    page: 0,
    rowsPerPage: 25,
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };
  render() {
    const { rowsPerPage, page } = this.state;
    const { classes } = this.props;
    return (
      <Query query={QueryTop100TransGQL}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading.....</div>;
          }
          if (error) {
            return <div>Error occured. Try again</div>;
          }
          const { toptrans } = data;
          const dlength = toptrans.length;
          return (
            <Paper>
              <Table padding="dense">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.narrowCell}>MSISDN</TableCell>
                    <TableCell>Session #</TableCell>
                    <TableCell className={classes.narrowCell}>
                      Cell ID
                    </TableCell>
                    <TableCell>Module</TableCell>
                    <TableCell>Label</TableCell>
                    <TableCell>Step Name</TableCell>
                    <TableCell>Step Kind</TableCell>
                    <TableCell className={classes.miniCell}>Flow End</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {toptrans
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tran) => (
                      <TableRow key={`${tran.id}-${tran.sessionid}`}>
                        <TableCell className={classes.narrowCell}>
                          {tran.msisdn}
                        </TableCell>
                        <TableCell>{tran.sessionid}</TableCell>
                        <TableCell className={classes.narrowCell}>
                          {tran.cellid}
                        </TableCell>
                        <TableCell>{tran.moduleName}</TableCell>
                        <TableCell>{tran.moduleLabel}</TableCell>
                        <TableCell>{tran.stepName}</TableCell>
                        <TableCell>{tran.stepKind}</TableCell>
                        <TableCell className={classes.miniCell}>
                          {tran.flowend ? 'Cont.' : 'End'}
                        </TableCell>
                        <TableCell>
                          {dayjs(tran.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dlength}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Paper>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(LatestTransaction);
