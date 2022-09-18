import React, { Component } from 'react';
import './PostDetailView.scss';
import { Redirect } from 'react-router-dom';
import GoogleMap from '../containers/GoogleMap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { withModal } from '../contexts/ModalContext';
import withLoading from '../hoc/withLoading';
import GalleryModal from '../containers/GalleryModal';
import ReviewList from '../containers/ReviewList';
import { withUser } from '../contexts/UserContext';
import LoginPopupView from './LoginPopupView';
import { withWannago } from '../contexts/WannagoContext';

class PostDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currentModalPic: null,
      currentModalComment: null,
      writingReviewPage: false,
    };
  }

  handleWritingReviewPage() {
    this.setState({
      writingReviewPage: true,
    });
  }

  static defaultProps = {
    // 서버로부터 받아온 레스토랑 목록 데이터
    // PostDetail에서 받아온 레스토랑 더미 사진 목록
    restaurants: [
      {
        // name:
        // address_detail:
        // phone_num:
        // food_type:
        // price_level:
        // parking:
        // Business_hour:
      },
    ],
  };

  render() {
    const {
      handleCurrentPk,
      handleToggle,
      handleActive,
      wannagoActive,
      username,
      galleryOpen,
      popupOpen,
      showTargetElement,
      post_set,
      restaurants,
      handleCount,
      location,
      handleReviewfilter,
      container,
      allReview,
    } = this.props;

    // 상세 페이지 상단 이미지 바 출력을 위한 변수 선언
    const imgSet = post_set
      .filter(item => item.postimage_posts.length > 0)
      .map(item => item.postimage_posts);

    const imgList = imgSet[0].slice(0, 4);

    const { writingReviewPage } = this.state;

    if (writingReviewPage) {
      return <Redirect to={`/restaurantsReview/${restaurants.pk}`} />;
    }

    const wannaGoColor = wannagoActive ? 'wannaGoOn' : 'wannaGoOff';

    return (
      <React.Fragment>
        <div className="photo-list">
          {imgList.length > 0 ? (
            imgList.map(item => (
              <div key={item.pk} className="photo-item">
                <img
                  src={item.image}
                  alt="detailRestaurantpics"
                  onClick={() => {
                    !galleryOpen && showTargetElement('galleryOpen');
                  }}
                />
              </div>
            ))
          ) : (
            <div className="no-photo-item">
              <p className="no-photo-msg">앱에서 사진을 올려주세요</p>
            </div>
          )}
        </div>
        <div className="detail-inner">
          <div className="restaurant-detail">
            <header>
              <div className="titleWrap">
                <h1 className="title">{restaurants.name}</h1>
                <span className="rate" />
                <div className="restaurants_action_button_wrap">
                  <button
                    className="review_writing_button"
                    onClick={() => {
                      username
                        ? this.handleWritingReviewPage()
                        : showTargetElement('popupOpen');
                    }}
                  >
                    리뷰쓰기
                  </button>

                  <button
                    className={wannaGoColor}
                    onClick={() => {
                      if (username) {
                        handleCount(restaurants.pk, restaurants.want_num);
                        handleActive();
                        handleCurrentPk(restaurants.pk);
                        handleToggle(wannagoActive, restaurants.pk);
                      } else {
                        showTargetElement('popupOpen');
                      }
                    }}
                  >
                    <span>가고싶다</span>
                  </button>
                </div>
              </div>
            </header>
            <div>
              <dl className="detail-list">
                <dt className="addressName">주소</dt>
                <dd className="address"> {restaurants.address_detail}</dd>
                <dt className="tel-label">전화번호</dt>
                <dd className="tel-number">{restaurants.phone_num}</dd>
                <dt>음식 종류</dt>
                <dd>{restaurants.food_type}</dd>
                <dt>가격대</dt>
                <dd>{restaurants.price_level}</dd>
                <dt>주차</dt>
                <dd>{restaurants.parking}</dd>
                <dt>영업시간</dt>
                <dd>{restaurants.Business_hour}</dd>
              </dl>
            </div>
            <ReviewList
              post_set={post_set}
              location={location}
              handleReviewfilter={n => handleReviewfilter(n)}
              container={container}
              allReview={allReview}
              galleryOpen={galleryOpen}
              restaurants={restaurants}
            />
          </div>
          <div className="map">
            <GoogleMap restaurants={restaurants} />
          </div>
        </div>
        {galleryOpen ? (
          <GalleryModal post_set={post_set} restaurants={restaurants} />
        ) : null}
        {popupOpen ? <LoginPopupView /> : null}
      </React.Fragment>
    );
  }
}

export default withUser(withLoading(withModal(withWannago(PostDetailView))));
