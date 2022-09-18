import React, { Component } from 'react';
import HeaderView from '../components/HeaderView';
import ModalProvider from '../contexts/ModalContext';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentOpen: true,
      wannagoOpen: false,
    };
  }

  handleClick = (active, inactive) => {
    this.setState({
      [active]: true,
      [inactive]: false,
    });
  };

  render() {
    const params = new URLSearchParams(decodeURI(window.location.search));
    const keyword = params.get('keyword');
    return (
      <React.Fragment>
        <ModalProvider>
          <HeaderView
            {...this.state}
            handleClick={this.handleClick}
            key={keyword}
          />
        </ModalProvider>
      </React.Fragment>
    );
  }
}
