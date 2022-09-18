import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './EatDealView.module.scss';
import { Link } from 'react-router-dom';
import withLoading from '../hoc/withLoading';

const cx = classNames.bind(styles);

class EatDealView extends Component {
  render() {
    const { eatDeal } = this.props;
    console.log(eatDeal);
    return (
      <article className={cx('eatDealPage')}>
        <ul className={cx('list')}>
          {eatDeal.map(d => (
            <Link to={`/eatdeals/${d.pk}`} key={d.pk}>
              <li className={cx('item')}>
                <figure className={cx('figure')}>
                  <div className={cx('imageWrapper')}>
                    <img
                      className={cx('image')}
                      src={d.eatdealimages ? d.eatdealimages : null}
                      alt=""
                    />

                    <div className={cx('imageInfo')}>
                      <div className={cx('leftInfo')}>
                        <span className={cx('saleRate')}>
                          {d.discount_rate}%
                        </span>
                      </div>
                      <div className={cx('rightInfo')}>
                        <span className={cx('originPrice')}>
                          ￦ {d.base_price.toLocaleString()}
                        </span>
                        <span className={cx('salePrice')}>
                          ￦ {d.discount_price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <figcaption className={cx('content')}>
                    <h2 className={cx('restaurantName')}>{d.deal_name}</h2>
                    <span className={cx('title')}>{d.sub_name}</span>
                    <p className={cx('caution')}>
                      ※ 구매 전 전용 지점을 꼭 확인해주세요.
                    </p>
                  </figcaption>
                </figure>
              </li>
            </Link>
          ))}
        </ul>
      </article>
    );
  }
}

export default withLoading(EatDealView);
