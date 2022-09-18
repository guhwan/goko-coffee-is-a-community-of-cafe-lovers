import React, { Component } from 'react';
import styles from './RateListView.module.scss';
import classNames from 'classnames/bind';
import defaultListItem from '../../commonimgs/cafe1.jpeg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default class RateListView extends Component {
  render() {
    const { restaurantList } = this.props;
    return (
      <div className={cx('restaurants-list-wrap')}>
        <h2 className={cx('list-title')}>평점이 높은 인기 카페</h2>
        <ul className={cx('restaurants-list')}>
          {restaurantList.map((r, index) => (
            <li key={index} className={cx('restaurants-item')}>
              <Link to={`/restaurant/${r.pk}`}>
                <figure className={cx('restaurant_inner_wrap')}>
                  <div className={cx('thumb')}>
                    <img
                      className={cx('image')}
                      alt={r.name}
                      src={
                        r.post_set &&
                        r.post_set.find(item => item.postimage_posts.length > 0)
                          ? r.post_set.find(
                              item => item.postimage_posts.length > 0
                            ).postimage_posts[0].image
                          : defaultListItem
                      }
                    />
                  </div>
                  <figcaption>
                    <h3 className={cx('item-title')}>{r.name}</h3>
                    <span className={cx('point')}>
                      {parseFloat(r.rate_average).toFixed(1)}
                    </span>
                    <p className={cx('etc')}>{r.food_type}</p>
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// {restaurantList.map(r => {
//   let imageSrc;
//   if (r.post_set[0] && r.post_set[0].postimage_posts[0]) {
//     imageSrc = r.post_set[0].postimage_posts[0].image;
//   } else {
//     imageSrc = defaultimg;
//   }
//   return (
//     <li className={cx('restaurants-item')}>
//       <Link to={`/restaurant/${r.pk}`}>
//         <figure className={cx('restaurant_inner_wrap')}>
//           <div className={cx('thumb')}>
//             <img className={cx('image')} src={imageSrc} />
//           </div>
//           <figcaption>
//             <h3 className={cx('item-title')}>{r.name}</h3>
//             <span className={cx('point')}>{r.rate_average}</span>
//             <p className={cx('etc')}>{r.food_type}</p>
//           </figcaption>
//         </figure>
//       </Link>
//     </li>
//   );
// })}
