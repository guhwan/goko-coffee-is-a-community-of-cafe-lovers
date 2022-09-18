import React, { Component } from 'react';
import PostDetail from '../containers/PostDetail';
import { withPage } from '../contexts/PageContext';

class PostDetailPage extends Component {
  componentDidMount() {
    // 페이지 Context의 detail 상태를 true로 바꾼다.
    this.props.handlePageOpen('detail');
    // 페이지가 렌더링 될때마다 스크롤을 맨 위로 올린다.
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    // 컴포넌트가 언마운트될때 페이지 Context의 detail 상태를 false로 바꾼다.
    this.props.handlePageClose('detail');
  }

  render() {
    // match는 App에서 라우트 path에 변수 :rKeyword에 담긴 정보들
    const { match, location } = this.props;

    const restaurantId = match.params.rKeyword;
    return (
      <React.Fragment>
        <PostDetail
          key={restaurantId}
          restaurantId={restaurantId}
          location={location}
        />
      </React.Fragment>
    );
  }
}

export default withPage(PostDetailPage);
