import React from 'react';

const { Provider, Consumer } = React.createContext({});

export default class ProviderContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      userid: '',
      login: false,
    };
  }
  onloginChange = (param) => {
    if (param) {
      const { token, id } = param;
      this.setState({ token, userid: id, login: true });
    } else {
      this.setState({ token: undefined, userid: undefined, login: false });
    }
  };
  render() {
    const renderfunc = {
      onloginChange: this.onloginChange,
    };
    return (
      <Provider value={{ ...this.state, ...renderfunc }}>
        {this.props.children}
      </Provider>
    );
  }
}

export const UserConsumer = Consumer;
