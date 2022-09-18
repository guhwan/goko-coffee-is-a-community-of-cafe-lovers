import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './ReviewListView.module.scss';
import ReviewItemView from './ReviewItemView';
const cx = classNames.bind(styles);

export default class ReviewListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maincolor: '전체',
    };
  }
  handleChangeColor(target) {
    this.setState({
      maincolor: target,
    });
  }
  render() {
    const { handleReviewfilter, container, post_set, restaurants } = this.props;
    const { maincolor } = this.state;

    return (
      <React.Fragment>
        <div className={cx('review-filter-wrap')}>
          <h2 className={cx('review-title')}>리뷰</h2>
          <ul className={cx('review-filter-list')}>
            <li
              className={cx('review-filter-item', {
                maincolor: maincolor === '전체',
              })}
              onClick={() => this.handleChangeColor('전체')}
            >
              전체
            </li>
            <li
              className={cx('review-filter-item', {
                maincolor: maincolor === '맛있다',
              })}
              onClick={() => {
                handleReviewfilter(5);
                this.handleChangeColor('맛있다');
              }}
            >
              맛있다
            </li>
            <li
              className={cx('review-filter-item', {
                maincolor: maincolor === '괜찮다',
              })}
              onClick={() => {
                handleReviewfilter(3);
                this.handleChangeColor('괜찮다');
              }}
            >
              괜찮다
            </li>
            <li
              className={cx('review-filter-item', {
                maincolor: maincolor === '별로',
              })}
              onClick={() => {
                handleReviewfilter(1);
                this.handleChangeColor('별로');
              }}
            >
              별로
            </li>
          </ul>
        </div>
        <ReviewItemView
          container={container}
          post_set={post_set}
          restaurants={restaurants}
        />
        <button className={cx('review-more-btn')}>더보기</button>
      </React.Fragment>
    );
  }
}
