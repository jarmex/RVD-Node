import React, { Component } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import QueryMSISDNResult from './QueryMSISDNResult';

const LeftTitle = styled.div`
  float: left;
`;
const RightButton = styled.div`
  float: right;
`;
const BarTitle = styled.div`
  clear: both;
`;

const TableView = styled.div`
  clear: both;
`;

class TransByMSISDN extends Component {
  state = {
    msisdn: '',
    feedcount: 0,
    open: false,
    beforesearch: '',
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  pagetitle = () => {
    if (this.state.msisdn) {
      return (
        <Typography variant="h4" gutterBottom component="h2">
          Result for {this.state.msisdn}
        </Typography>
      );
    }
    return (
      <Typography variant="h4" gutterBottom component="h2">
        Search By MSISDN
      </Typography>
    );
  };
  render() {
    return (
      <div>
        <BarTitle>
          <LeftTitle>{this.pagetitle()}</LeftTitle>
          <RightButton>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Search MSISDN
            </Button>
          </RightButton>
        </BarTitle>
        <TableView>
          {this.state.msisdn ? (
            <QueryMSISDNResult
              msisdn={this.state.msisdn}
              feedcount={this.state.feedcount}
            />
          ) : null}
        </TableView>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Search MSISDN Transactions
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Seach for all transaction for a particular MSISDN. This result
              will return only the top 100 response.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="beforesearch"
              label="Search By MSISDN"
              type="text"
              name="beforesearch"
              value={this.state.beforesearch}
              onChange={(e) =>
                this.setState({
                  [e.target.name]: e.target.value,
                })
              }
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.setState({ msisdn: this.state.beforesearch });
                this.handleClose();
              }}
              color="primary"
            >
              Search
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default TransByMSISDN;
