import React, { Component } from 'react';
import FooterView from './FooterView';
import Header from '../containers/Header';
export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <FooterView />
      </div>
    );
  }
}
