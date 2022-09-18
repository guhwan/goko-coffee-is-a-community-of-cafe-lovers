import React, { Component } from 'react';
import api from '../api';
import { withPage } from './PageContext';
import { withUser } from './UserContext';
import { withRouter } from 'react-router-dom';

const { Provider, Consumer } = React.createContext();

class WannagoProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPk: null,
      wannagoPk: null,
      wannagoSet: [],
      wannagoActive: false,
      handleActive: this.handleActive,
      handleCount: this.handleCount,
      handleToggle: this.handleToggle,
      handleCurrentPk: this.handleCurrentPk,
      handleWannagoOpen: this.handleWannagoOpen,
    };
  }

  async componentDidMount() {
    // 현재 유저의 정보를 불러온다.
    const pk = localStorage.getItem('currentUserPK');
    const { data } = await api.get(`/api/members/list/${pk}`);

    this.setState({
      wannagoSet: data.wannago_set,
    });

    // 현재 보고있는 레스토랑이 wannago_set에 있는 레스토랑이라면 true
    const arr = this.props.location.pathname.split('');
    arr.splice(0, 12);
    const isActive = data.wannago_set
      .map(item => item.restaurant)
      .includes(parseInt(arr.join('')));

    // 만약 현재 보고있는 레스토랑이 wannago_set에 있는 레스토랑이라면 wannagoActive 상태를 true로 바꿔준다.
    if (isActive) {
      this.setState({
        wannagoActive: true,
      });
    }
  }

  async componentDidUpdate() {
    const pk = localStorage.getItem('currentUserPK');
    const { data } = await api.get(`/api/members/list/${pk}`);

    // 현재 보고있는 레스토랑이 wannago_set에서 몇번째 pk인지
    const restaurantId = parseInt(this.props.children.props.restaurantId);

    const wannagoPk = data.wannago_set.find(item =>
      !this.state.currentPk
        ? item.restaurant === restaurantId
        : item.restaurant === this.state.currentPk
    )
      ? data.wannago_set.find(item =>
          !this.state.currentPk
            ? item.restaurant === restaurantId
            : item.restaurant === this.state.currentPk
        ).pk
      : null;

    // 현재 보고있는 레스토랑의 pk를 가져온다.
    if (this.state.wannagoPk !== wannagoPk) {
      this.handleWannagoPk(wannagoPk);
    }
  }

  handleWannagoPk = pk => {
    // pk 상태 저장
    this.setState({
      wannagoPk: pk,
    });
  };

  handleCurrentPk = pk => {
    // pk 상태 저장
    this.setState({
      currentPk: pk,
    });
  };

  handleCount = async (pk, num) => {
    await api.patch(`/api/restaurants/list/${pk}`, {
      want_num: num + 1,
    });
  };

  handleActive = () => {
    this.setState(prev => ({
      wannagoActive: !prev.wannagoActive,
    }));
  };

  handleToggle = async (active, pk) => {
    const wannagoPk = this.state.wannagoSet.find(item => item.restaurant === pk)
      ? this.state.wannagoSet.find(item => item.restaurant === pk).pk
      : null;

    if (active) {
      await api.delete(`/api/restaurants/list/wannago/${wannagoPk}`);
      const currentUserpk = localStorage.getItem('currentUserPK');
      const { data } = await api.get(`/api/members/list/${currentUserpk}`);
      this.setState({
        wannagoSet: data.wannago_set,
      });
    } else {
      await api.post(`/api/restaurants/list/wannago/`, {
        restaurant: pk,
      });
      const currentUserpk = localStorage.getItem('currentUserPK');
      const { data } = await api.get(`/api/members/list/${currentUserpk}`);
      this.setState({
        wannagoSet: data.wannago_set,
      });
    }
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withWannago(WrappedComponent) {
  return function WithWannago(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

const withUserPageWannagoProvider = withUser(
  withPage(withRouter(WannagoProvider))
);
export {
  withUserPageWannagoProvider as WannagoProvider,
  Consumer as WannagoConsumer,
  withWannago,
};
