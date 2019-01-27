import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import dayjs from 'dayjs';
import { Query } from 'react-apollo';
import { QueryMSISDNTransactionsGQL } from '../../../graphql/Transactions';

const styles = {
  narrowCell: {
    width: '100px',
  },
  miniCell: {
    width: '65px',
  },
};

class QueryMSISDNResult extends Component {
  state = {
    page: 0,
    rowsPerPage: 10,
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };
  render() {
    const { msisdn, feedcount, classes } = this.props;
    const { rowsPerPage, page } = this.state;
    return (
      <Query
        query={QueryMSISDNTransactionsGQL}
        variables={{ msisdn, feedcount }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading.....</div>;
          }
          if (error) {
            return <div>Error occured. Try again</div>;
          }
          const { transactions } = data;
          const dlength = transactions.length;
          return (
            <Paper>
              <Table padding="dense">
                <TableHead>
                  <TableRow>
                    <TableCell>Session #</TableCell>
                    <TableCell className={classes.narrowCell}>
                      Cell ID
                    </TableCell>
                    <TableCell className={classes.narrowCell}>
                      Short Code
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
                  {transactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tran) => (
                      <TableRow key={`${tran.id}-${tran.sessionid}`}>
                        <TableCell>{tran.sessionid}</TableCell>
                        <TableCell className={classes.narrowCell}>
                          {tran.cellid}
                        </TableCell>
                        <TableCell className={classes.narrowCell}>
                          {tran.shortcode}
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

export default withStyles(styles)(QueryMSISDNResult);
