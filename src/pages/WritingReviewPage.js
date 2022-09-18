import React, { Component } from 'react';
import WritingReview from '../containers/WritingReview';
import { Helmet } from 'react-helmet';

export default class WritingReviewPage extends Component {
  componentDidMount() {
    // 페이지가 렌더링 될때마다 스크롤을 맨 위로 올린다.
    window.scrollTo(0, 0);
  }

  render() {
    const { match } = this.props;
    const reviewId = match.params.rReviewKeyword;

    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>리뷰 쓰기</title>
        </Helmet>
        <WritingReview key={reviewId} reviewId={reviewId} />
      </React.Fragment>
    );
  }
}
