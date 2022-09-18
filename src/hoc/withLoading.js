import React from 'react';
import loadingImg from '../commonimgs/loadingImage/loadingImg.svg';
import styles from './withLoading.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function withLoading(WrappedComponent) {
  return function WithLoading(props) {
    const { loading, ...rest } = props;
    if (loading) {
      return (
        <img
          src={loadingImg}
          alt="loadingIndicator"
          className={cx('loadingIndicator')}
        />
      );
    } else {
      return <WrappedComponent {...rest} />;
    }
  };
}
