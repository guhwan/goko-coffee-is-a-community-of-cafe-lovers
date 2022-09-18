import React, { Component } from 'react';
import SearchListView from '../SearchListView/SearchListView';
import classNames from 'classnames/bind';
import styles from './SearchView.module.scss';
import GoogleMap from '../../containers/GoogleMap';
import withLoading from '../../hoc/withLoading';

const cx = classNames.bind(styles);

class SearchView extends Component {
  static defaultProps = {
    // 서버로부터 받아온 레스토랑 목록 데이터
    restaurants: [
      {
        // id:
        // imgUrl:
        // name:
        // score:
        // location:
        // foodType:
        // viewCount:
        // reviewCount:
        // wannagoCount:
        // latitude:
        // longitude:
      },
    ],
  };
  render() {
    const { restaurants, ...rest } = this.props;
    // console.log(
    //   restaurants
    //     .map(item =>
    //       item.post_set.find(item => item.postimage_posts.length > 0)
    //     )
    //     .map(item => {
    //       if (item) {
    //         return item.postimage_posts[0].image;
    //       } else {
    //         return null;
    //       }
    //     })
    // );
    // const r = restaurants
    //   .map(item => item.post_set.map(item => item.postimage_posts))
    //   .map(item => item.find(item => item.length > 0));
    // r.map(item =>
    //   item
    //     ? console.log(item.map(item => item.image).join(''))
    //     : console.log(null)
    // );
    // DB의 속성 이름을 내가 원하는 이름으로 바꾸기 위해 map을 돌려서 새로운 객체 속성에 값을 대입해준다.
    const restaurantList = restaurants.map(r => ({
      id: r.pk,
      imgUrl: r.post_set.map(item => item.postimage_posts),
      name: r.name,
      score: r.rate_average,
      location: r.address,
      foodType: r.food_type,
      viewCount: r.view_num,
      reviewCount: r.review_num,
      wannagoCount: r.want_num,
      latitude: r.latitude,
      longitude: r.longitude,
    }));
    return (
      <article className={cx('searchView')}>
        {/* 검색 결과 목록 출력 컴포넌트 */}
        <SearchListView restaurants={restaurantList} {...rest} />

        {/* 지도 출력 컴포넌트 */}
        <div className={cx('googleMapWrapper')}>
          <div className={cx('googleMapInnerWrapper')}>
            <GoogleMap restaurants={restaurantList} />
          </div>
        </div>
      </article>
    );
  }
}

export default withLoading(SearchView);
