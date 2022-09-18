import React from 'react';
import classNames from 'classnames/bind';
import styles from './MapInfoView.module.scss';
import { Link, BrowserRouter } from 'react-router-dom';
import defaultListItem from '../../commonimgs/defaultListItem.jpg';

const cx = classNames.bind(styles);

export default function MapInfoView(props) {
  const selectedPlace = props.selectedPlace;

  // selectedPlace에 아무것도 들어오지 않을 경우 렌더링 하지 않는다.
  if (selectedPlace === null) return null;
  return (
    <BrowserRouter>
      <figure className={cx('infoWindow')}>
        <Link to={`/restaurant/${selectedPlace.id}`}>
          <img
            src={
              selectedPlace.imgUrl.length === 0
                ? defaultListItem
                : selectedPlace.imgUrl
                    .find(item => item.length > 0)
                    .map(item => item.image)[0]
            }
            alt={selectedPlace.name}
            className={cx('thumb')}
          />
        </Link>
        <figcaption className={cx('info')}>
          <Link to={`/restaurant/${selectedPlace.id}`}>
            <h3 className={cx('name')}>{selectedPlace.name}</h3>
          </Link>
          <span className={cx('score')}>
            {parseFloat(selectedPlace.score).toFixed(1)}
          </span>
          <p className={cx('etcInfo')}>
            <span className={cx('location')}>
              {selectedPlace.location.slice(0, 8)} -
            </span>
            <span className={cx('type')}> {selectedPlace.type}</span>
          </p>
          <p className={cx('countInfo')}>
            <span className={cx('reviewCount')}>
              {selectedPlace.reviewCount}
            </span>
            <span className={cx('wannagoCount')}>
              {selectedPlace.wannagoCount}
            </span>
          </p>
        </figcaption>
      </figure>
    </BrowserRouter>
  );
}
