import React, { Component } from 'react';
import api from '../api';
import { withRouter, Redirect } from 'react-router-dom';

const { Provider, Consumer } = React.createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: null,
      picture: null,
      redirect: false,
      login: this.login,
      logout: this.logout,
      responseFacebook: this.responseFacebook,
      refreshUser: this.refreshUser,
    };
  }

  async componentDidMount() {
    const pk = localStorage.getItem('currentUserPK');
    const token = localStorage.getItem('token');

    token && pk && (await this.refreshUser(pk));
  }

  login = async response => {
    const res = await api.post('/api/members/auth-token/facebook/', {
      access_token: response.accessToken,
      facebook_user_id: response.userId,
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('currentUserPK', res.data.user.pk);

    this.setState(prev => ({
      id: res.data.user.pk,
      username: res.data.user.full_name,
      picture: res.data.user.img_profile,
      redirect: !prev.redirect,
    }));
  };

  refreshUser = async pk => {
    const { data } = await api.get(`/api/members/list/${pk}`);
    // 현재 유저 정보를 확인해서 setState 해준다.
    this.setState({
      id: data.pk,
      username: data.full_name,
      picture: data.img_profile,
    });
  };

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserPK');
    this.setState(prev => ({
      id: null,
      username: null,
      picture: null,
      redirect: !prev.redirect,
    }));
  };

  render() {
    // withRouter를 통해서 location 객체와 history 객체를 가져온다.
    const { location, history } = this.props;
    // redirect가 true일 경우(로그인 또는 로그아웃 했을 경우)
    if (this.state.redirect) {
      // 현재 보고있는 페이지의 pathname이 restaurantsReview로 시작하면(즉, 현재 보고있는 페이지가 리뷰쓰기 페이지일 경우)
      if (location.pathname.startsWith('/restaurantsReview')) {
        // pathname에서 restaurantPK를 얻어내기 위한 변수 선언
        const restaurantPk = location.pathname
          .split('')
          .find((item, idx, arr) => idx === arr.length - 1);
        // 식당 디테일 페이지로 redirect 시킨다.
        return <Redirect to={`/restaurant/${restaurantPk}`} />;
      } else {
        // 페이지 새로고침
        history.go(0);
      }
    }
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withUser(WrappedComponent) {
  return function WithUser(props) {
    return (
      <Consumer>{value => <WrappedComponent {...props} {...value} />}</Consumer>
    );
  };
}

const withRouterUserProvider = withRouter(UserProvider);
export {
  withRouterUserProvider as UserProvider,
  Consumer as UserConsumer,
  withUser,
};
