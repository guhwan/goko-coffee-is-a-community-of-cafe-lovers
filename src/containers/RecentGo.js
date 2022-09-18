import React, { Component } from 'react';
import RecentGoView from '../components/RecentGoView/RecentGoView';

export default class RecentGo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wannago: false,
    };
  }

  handleWannagoBtn = () => {
    this.setState(prevState => ({
      wannago: !prevState.wannago,
    }));
  };

  render() {
    const { item } = this.props;

    return (
      <React.Fragment>
        <RecentGoView
          key={item.pk}
          item={item}
          {...this.state}
          {...this.props}
          handleWannagoBtn={this.handleWannagoBtn}
        />
      </React.Fragment>
    );
  }
}
