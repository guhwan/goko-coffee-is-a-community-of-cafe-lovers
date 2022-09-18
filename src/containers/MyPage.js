import React, { Component } from 'react';
import MypageView from '../components/MypageView';

export default class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentView: [],
    };
  }

  componentDidMount() {
    // 로컬 스토리지에 저장된 최근 본 맛집을 상태에 저장한다.
    // (하위 컴포넌트인 MyPageView에 넘겨주기 위함)
    this.setState({
      recentView: JSON.parse(localStorage.getItem('recent')),
    });
  }

  handleRecentReset = () => {
    localStorage.clear();
    this.setState({
      recentView: [],
    });
  };

  render() {
    return (
      <MypageView
        {...this.props}
        {...this.state}
        handleRecentReset={this.handleRecentReset}
        handleRecentCount={this.handleRecentCount}
      />
    );
  }
}
