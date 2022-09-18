import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

export default class PageProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main: false,
      search: false,
      detail: false,
      newPost: false,
      handlePageOpen: this.handlePageOpen,
      handlePageClose: this.handlePageClose,
    };
  }

  handlePageOpen = page => {
    this.setState({
      [page]: true,
    });
  };

  handlePageClose = page => {
    this.setState({
      [page]: false,
    });
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withPage(WrappedComponent) {
  return function WithPage(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

export { PageProvider, Consumer as PageConsumer, withPage };
