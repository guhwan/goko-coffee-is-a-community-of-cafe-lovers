import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './WannaGoView.module.scss';
import { Link } from 'react-router-dom';
import defaultListItem from '../../commonimgs/defaultListItem.jpg';
import { withUser } from '../../contexts/UserContext';
import { withModal } from '../../contexts/ModalContext';
const cx = classNames.bind(styles);

class WannaGoView extends Component {
  render() {
    const {
      username,
      item,
      myPageWannago,
      showTargetElement,
      hideTargetElement,
      handleCurrentPk,
      handleActive,
      handleCount,
      handleToggle,
    } = this.props;

    return (
      <li key={item.pk} className={cx('RecentGo')}>
        <figure className={cx('RecentGoItem')}>
          <Link
            to={`/restaurant/${item.pk}`}
            onClick={() => {
              hideTargetElement('modalOpen');
            }}
          >
            <img
              src={item.imgUrl ? item.imgUrl : defaultListItem}
              alt={item.name}
              className={cx('thumb')}
            />
          </Link>
          <figcaption className={cx('info')}>
            <Link
              to={`/restaurant/${item.pk}`}
              onClick={() => {
                hideTargetElement('modalOpen');
              }}
            >
              <h3 className={cx('name')}>{item.name}</h3>
            </Link>
            <span className={cx('score')}>
              {parseFloat(item.rate_average).toFixed(1)}
            </span>
            <p className={cx('etcInfo')}>
              <span className={cx('location')}>
                {item.address.slice(0, 8)} -
              </span>
              <span className={cx('type')}> {item.food_type}</span>
            </p>
          </figcaption>
          <div
            className={cx('wannagoBtn', { active: myPageWannago })}
            onClick={() => {
              if (username) {
                handleCount(item.pk, item.want_num);
                handleActive();
                handleCurrentPk(item.pk);
                handleToggle(myPageWannago, item.pk);
              } else {
                showTargetElement('popupOpen');
              }
            }}
          >
            가고싶다
          </div>
        </figure>
      </li>
    );
  }
}

export default withUser(withModal(WannaGoView));
