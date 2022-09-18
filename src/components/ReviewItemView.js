import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './ReviewItemView.module.scss';
import withLoading from '../hoc/withLoading';
import reviewUserImg from '../commonimgs/reviewUser.png';
import { withModal } from '../contexts/ModalContext';
import GalleryModal from '../containers/GalleryModal';
const cx = classNames.bind(styles);

class ReviewItemView extends Component {
  render() {
    const {
      container,
      galleryOpen,
      showTargetElement,
      post_set,
      restaurants,
    } = this.props;
    return (
      <>
        {container.map(r => {
          let imageSrc;
          if (r.author.img_profile) {
            imageSrc = r.author.img_profile;
          } else {
            imageSrc = reviewUserImg;
          }
          return (
            <div key={r.pk} className={cx('reveiw-content')}>
              <figure>
                <div className={cx('user-thumb')}>
                  <img src={imageSrc} alt="" />
                </div>
                <figcaption>{r.author.full_name}</figcaption>
              </figure>
              <div className={cx('review-wrapper')}>
                <span className={cx('date')}>2018-10-20</span>
                <div className={cx('review')}>{r.content}</div>
                <div className={cx('list-thumb-photos')}>
                  {r.postimage_posts.map(img => (
                    <button
                      className={cx('button-thumb')}
                      key={img.pk}
                      onClick={() => showTargetElement('galleryOpen')}
                    >
                      <img src={img.image} alt={img.pk} />
                    </button>
                  ))}
                </div>
              </div>
              <div className={cx('icon-rating')}>
                <strong
                  className={cx(
                    { bad: r.rate === 1 },
                    { ok: r.rate === 3 },
                    { good: r.rate === 5 }
                  )}
                >
                  {r.rate === 1
                    ? '별로'
                    : r.rate === 3
                    ? '괜찮다'
                    : r.rate === 5
                    ? '맛있다'
                    : 'null'}
                </strong>
              </div>
            </div>
          );
        })}
        {galleryOpen ? (
          <GalleryModal post_set={post_set} restaurants={restaurants} />
        ) : null}
      </>
    );
  }
}

export default withLoading(withModal(ReviewItemView));
