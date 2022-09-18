import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Main from '../containers/Main';

export default class MainPage extends Component {
  componentDidMount() {
    // 페이지가 렌더링 될때마다 스크롤을 맨 위로 올린다.
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>망고플레이트: 나만의 맛집 검색</title>
        </Helmet>
        <Main />
      </React.Fragment>
    );
  }
}
