import React, { Component } from 'react';
import ReviewListView from '../components/ReviewListView';
export default class ReviewList extends Component {
  render() {
    const { post_set, galleryOpen, restaurants, ...rest } = this.props;
    const reviewList = post_set.map(r => ({
      content: r.content,
      username: r.author.username,
      rate: r.rate,
    }));

    return (
      <React.Fragment>
        <ReviewListView
          galleryOpen={galleryOpen}
          reviewList={reviewList}
          post_set={post_set}
          restaurants={restaurants}
          {...rest}
        />
      </React.Fragment>
    );
  }
}
