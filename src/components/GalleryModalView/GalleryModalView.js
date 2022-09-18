import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './GalleryModalView.module.scss';
import { withModal } from '../../contexts/ModalContext';
import CarouselView from '../CarouselView/CarouselView';

const cx = classNames.bind(styles);

class GalleryModalView extends Component {
  render() {
    const {
      galleryOpen,
      hideTargetElement,
      post_set,
      restaurants,
      imagePath,
    } = this.props;

    return (
      <React.Fragment>
        <div
          className={cx({ blackOverlay: galleryOpen })}
          onClick={() => {
            hideTargetElement('galleryOpen');
          }}
        />
        <section className={cx('galleryModal')}>
          <div className={cx('carouselWrapper')}>
            <CarouselView
              post_set={post_set}
              restaurants={restaurants}
              imagePath={imagePath}
            />
          </div>
        </section>
        <button
          className={cx('closeBtn')}
          onClick={() => {
            hideTargetElement('galleryOpen');
          }}
        >
          닫기
        </button>
      </React.Fragment>
    );
  }
}

export default withModal(GalleryModalView);
