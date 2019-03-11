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
import { QueryMSISDNCountGQL } from '../../../graphql/Transactions';

const styles = {
  narrowCell: {
    width: '100px',
  },
  miniCell: {
    width: '65px',
  },
};

class CountMSISDNByDate extends Component {
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
    const { startDate, endDate } = this.props;
    const { rowsPerPage, page } = this.state;
    return (
      <Query query={QueryMSISDNCountGQL} variables={{ startDate, endDate }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading.....</div>;
          }
          if (error) {
            return <div>Error occured. Try again</div>;
          }
          const { queryMsisdnCount } = data;
          const dlength = queryMsisdnCount.length;
          return (
            <Paper>
              <Table padding="dense">
                <TableHead>
                  <TableRow>
                    <TableCell>MSISDN</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queryMsisdnCount
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tran, index) => (
                      <TableRow key={`${tran.msisdn}-${index}`}>
                        <TableCell>{tran.msisdn}</TableCell>
                        <TableCell>{tran.Date}</TableCell>
                        <TableCell>{tran.count}</TableCell>
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

export default withStyles(styles)(CountMSISDNByDate);
