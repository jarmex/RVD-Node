import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Mutation } from 'react-apollo';
import Snackbar from '@material-ui/core/Snackbar';
import {
  ActivateShortCodeGQL,
  QueryProjectListGQL,
} from '../graphql/ProjectsList';

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  margin: 8px 4px;
`;

const ItemGroup = styled.div`
  margin: 20px 0px 30px;
`;
const ItemDisplay = styled.div`
  display: flex;
  margin: 5px 0px;
`;

const MyLabel = styled.div`
  width: 120px;
  text-align: right;
  padding-right: 10px;
`;

const MyValue = styled.div`
  font-style: italic;
`;
const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class EditProject extends Component {
  constructor(props) {
    super(props);
    const { project = {} } = props;
    this.state = {
      shortcode: project.shortcode || '',
      open: false,
      vertical: 'bottom',
      horizontal: 'center',
      message: '',
    };
  }

  handleClick = () => () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSaveChanges = async (activateProject) => {
    try {
      if (!this.state.shortcode) {
        // alert('The shortcode cannot be empty');
        this.setState({
          message: 'The shortcode cannot be empty',
        });
        return;
      }
      const { project } = this.props;
      const { data } = await activateProject({
        variables: {
          sid: project.sid,
          friendlyName: project.friendlyName,
          shortcode: this.state.shortcode,
        },
      });
      const { activateProject: result } = data;
      this.setState({ message: result.message });
    } catch (error) {
      // alert('Error occurred. Try again');
      this.setState({
        message: 'Error occurred. Try again!!',
      });
    }
    this.props.onClose();
  };

  render() {
    const { classes, onClose, project } = this.props;
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Typography variant="h4" gutterBottom component="h2">
          {project.friendlyName}
        </Typography>
        <ItemGroup>
          <ItemDisplay>
            <MyLabel>Application Id</MyLabel>
            <MyValue>{project.sid}</MyValue>
          </ItemDisplay>
          <ItemDisplay>
            <MyLabel>Account ID</MyLabel>
            <MyValue>{project.accountSid}</MyValue>
          </ItemDisplay>
          <ItemDisplay>
            <MyLabel>Created Date</MyLabel>
            <MyValue>{project.dateCreated}</MyValue>
          </ItemDisplay>
        </ItemGroup>
        <div>Enter the Short code for this project....</div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            required
            id="shortcode"
            name="shortcode"
            label="Short Code"
            className={classes.textField}
            autoFocus
            margin="dense"
            value={this.state.shortcode}
            onChange={(e) =>
              this.setState({
                [e.target.name]: e.target.value,
              })
            }
            fullWidth
          />
          <ActionButtons>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
            <Mutation
              mutation={ActivateShortCodeGQL}
              update={(cache) => {
                const { getprojects } = cache.readQuery({
                  query: QueryProjectListGQL,
                });

                const ndata = getprojects.map((item) => {
                  if (item.sid === project.sid) {
                    return Object.assign(
                      {},
                      { ...item },
                      { shortcode: this.state.shortcode },
                    );
                  }
                  return item;
                });
                cache.writeQuery({
                  query: QueryProjectListGQL,
                  data: {
                    getprojects: ndata,
                  },
                });
                return;
              }}
            >
              {(activateProject) => (
                <Button
                  onClick={() => this.handleSaveChanges(activateProject)}
                  color="primary"
                >
                  Save Changes
                </Button>
              )}
            </Mutation>
          </ActionButtons>
        </form>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EditProject);
