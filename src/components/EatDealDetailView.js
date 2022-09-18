import React, { Component } from 'react';
import classNames from 'classnames/bind';
import withLoading from '../hoc/withLoading';
// import sass from 'sass';
// const sass = require('sass');
// const styles = sass.compile('./EatDealDetailView.module.scss');
// const styles = await sass.compileAsync('./EatDealDetailView.module.scss');
// import sass from 'sass';
// import styles from sass.compile('./EatDealDetailView.module.scss');
import styles from './EatDealDetailView.module.scss';

const cx = classNames.bind(styles);

class EatDealDetailView extends Component {
  render() {
    const { eatDealDetail } = this.props;
    if (Object.keys(eatDealDetail).length > 0) {
      console.log(eatDealDetail.how_to_use.split('\n'));
    }

    return (
      <>
        {eatDealDetail && (
          <article className={cx('eatDealPage')}>
            <figure className={cx('figure')}>
              <div className={cx('imageWrapper')}>
                <img
                  className={cx('image')}
                  src={
                    eatDealDetail.eatdealimages
                  }
                  alt=""
                />

                <div className={cx('imageInfo')} />
              </div>
              <figcaption className={cx('content')}>
                <h2 className={cx('restaurantName')}>
                  {eatDealDetail.deal_name}
                </h2>
                <span className={cx('Reviewbutton')}>
                  솔직한 리뷰 보기 &gt;
                </span>
                <span className={cx('title')}>{eatDealDetail.sub_name}</span>
                <p className={cx('date')}>
                  사용 기간 : {eatDealDetail.start_date} ~{' '}
                  {eatDealDetail.end_date}
                </p>
                <div className={cx('PriceInfo')}>
                  <span className={cx('originPrice')}>
                    ￦
                    {eatDealDetail.base_price &&
                      eatDealDetail.base_price.toLocaleString()}
                  </span>
                  <div className={cx('Info')}>
                    <span className={cx('saleRate')}>
                      {eatDealDetail.discount_rate}%
                    </span>
                    <span className={cx('salePrice')}>
                      ￦
                      {eatDealDetail.discount_price &&
                        eatDealDetail.discount_price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </figcaption>
            </figure>
            <div className={cx('introduce-section')}>
              <ul className={cx('introduce-text')}>
                <li>{eatDealDetail.introduce_res}</li>
              </ul>
              <h3 className={cx('restaurant-introduce')}>식당 소개</h3>
              <ul className={cx('introduce')}>{eatDealDetail.introduce_res}</ul>
              <h3 className={cx('menu')}>메뉴 소개</h3>
              <ul className={cx('menu-text')}>
                <li>{eatDealDetail.introduce_menu}</li>
              </ul>
              <h3 className={cx('precautions')}>
                ※ 유의사항 (꼭! 확인해주세요)
              </h3>
              <ul className={cx('precautions-text')}>
                {eatDealDetail.caution &&
                  eatDealDetail.caution
                    .split('\n')
                    .map((r, index) => <li key={index}>{r}</li>)}
              </ul>
              <h3 className={cx('refund')}>※ 사용 방법</h3>
              <ul className={cx('refund-text')}>
                {eatDealDetail.how_to_use &&
                  eatDealDetail.how_to_use
                    .split('\n')
                    .map((r, index) => <li key={index}>{r}</li>)}
              </ul>
              <h3 className={cx('question')}>※ 환불 규정</h3>
              <ul className={cx('question-text')}>
                {eatDealDetail.refund &&
                  eatDealDetail.refund
                    .split('\n')
                    .map((r, index) => <li key={index}>{r}</li>)}
              </ul>
              <h3 className={cx('inquiry')}>문의</h3>
              <ul className={cx('inquiry-text')}>
                {eatDealDetail.inquiry &&
                  eatDealDetail.inquiry
                    .split('\n')
                    .map((r, index) => <li key={index}>{r}</li>)}
              </ul>
            </div>

            <button className={cx('action-button')}>구매하기</button>
          </article>
        )}
      </>
    );
  }
}

export default withLoading(EatDealDetailView);
