import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import { Mutation } from 'react-apollo';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { LoginGQL } from '../graphql/login';
import { UserConsumer } from '../routes/LoginContext';

const styles = (theme) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LoginView extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleLogin = async (e, login, onloginChange) => {
    e.preventDefault();
    try {
      if (!this.state.email || !this.state.password) {
        alert('Information provide is invalid.');

        return;
      }

      const loginResult = await login({
        variables: {
          username: this.state.email,
          password: this.state.password,
        },
      });
      const { sid, token } = loginResult.data.login;
      onloginChange({ id: sid, token });
      // push to the dashboard
      this.props.history.push('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Mutation mutation={LoginGQL}>
            {(login) => (
              <UserConsumer>
                {({ onloginChange }) => (
                  <form
                    method="POST"
                    className={classes.form}
                    onSubmit={(e) => this.handleLogin(e, login, onloginChange)}
                  >
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Email Address</InputLabel>
                      <Input
                        required
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) =>
                          this.setState({
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={this.state.email}
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        required
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={(e) =>
                          this.setState({
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                    {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign in
                    </Button>
                  </form>
                )}
              </UserConsumer>
            )}
          </Mutation>
        </Paper>
      </main>
    );
  }
}

LoginView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginView);
