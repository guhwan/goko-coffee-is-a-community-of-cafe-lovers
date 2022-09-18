import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Redirect } from 'react-router-dom';
import styles from './WritingReviewView.module.scss';
import { withUser } from '../contexts/UserContext';

const cx = classNames.bind(styles);

class WritingReviewView extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  render() {
    const {
      username,
      picture,
      goodOpen,
      okOpen,
      notGoodOpen,
      imagePath,
      toggleGoodOpen,
      toggleOkOpen,
      toggleNotGoodOpen,
      handleWordCount,
      restaurantsName,
      restaurantsPk,
      buttonActive,
      reviewTextBox,
      handleCancel,
      cancel,
      postReview,
      uploadImgArr,
      handleFileChange,
    } = this.props;

    if (cancel) {
      return <Redirect to={`/restaurant/${restaurantsPk}`} />;
    }

    return (
      <React.Fragment>
        <section className={cx('WritingReviewPage')}>
          <div className={cx('ReviewWritingPage__Row')}>
            <div className={cx('RestaurantSubMessage')}>
              <h2 className={cx('RestaurantName')}>{restaurantsName}</h2>
              <p className={cx('RestaurantMessage')}>
                에 대한 솔직한 리뷰를 써주세요.
              </p>
            </div>
            <div className={cx('RestaurantRecommendPicker')}>
              <ul className={cx('RestaurantRecommendPicker__List')}>
                <li className={cx('RestaurantRecommendPicker__Item')}>
                  <img
                    src={goodOpen ? imagePath[1] : imagePath[0]}
                    alt="좋아요 버튼"
                    onClick={toggleGoodOpen}
                  />
                  <p className={cx('pickColor1')}>맛있다</p>
                </li>
                <li className={cx('RestaurantRecommendPicker__Item')}>
                  <img
                    src={okOpen ? imagePath[3] : imagePath[2]}
                    alt="괜찮다 버튼"
                    onClick={toggleOkOpen}
                  />
                  <p className={cx('pickColor2')}>괜찮다</p>
                </li>
                <li className={cx('RestaurantRecommendPicker__Item')}>
                  <img
                    src={notGoodOpen ? imagePath[5] : imagePath[4]}
                    alt="별로 버튼"
                    onClick={toggleNotGoodOpen}
                  />
                  <p className={cx('pickColor3')}>별로</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={cx('ReviewWritingPage__ContentWrap')}>
            <div className={cx('UserSimpleProfile')}>
              <img src={picture} alt="profilePicture" />
              <span className={cx('username')}>{username}</span>
            </div>
            <div className={cx('ReviewWritingPage__FormWrap')}>
              <div className={cx('ReviewWritingPage__EditorWrap')}>
                <textarea
                  type="text"
                  maxLength="10000"
                  value={reviewTextBox}
                  required
                  placeholder={`${username}님, 주문하신 메뉴는 어떠셨나요? 식당의 분위기와 서비스도 궁금해요!`}
                  onChange={handleWordCount}
                  onClick={buttonActive}
                />
                <p className={cx('ReviewEditor__TextLengthStateBox')}>
                  {this.props.chars_left.toLocaleString()} / 10,000
                </p>
              </div>
              <div className={cx('DraggablePictureContainer')}>
                <input
                  //숨김 input='file'
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  multiple
                  ref={this.inputRef}
                  onChange={e => handleFileChange(e)}
                />
                <button
                  onClick={() => this.inputRef.current.click()}
                  className={cx('DraggablePictureContainer__PictureList')}
                >
                  +
                </button>
                {uploadImgArr.map((f, index) => (
                  <ImagePreview file={f} key={index} />
                ))}
              </div>
            </div>
          </div>
          <div className={cx('ReviewWritingPage__Buttons')}>
            <button
              className={cx('ReviewWritingPage__CancelButton')}
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              className={cx(
                {
                  ReviewWritingPage__SubmitButton_Active: reviewTextBox,
                },
                {
                  ReviewWritingPage__SubmitButton_InActive: !reviewTextBox,
                }
              )}
              onClick={postReview}
            >
              완료
            </button>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

class ImagePreview extends React.Component {
  static defaultProps = {
    // File 객체
    file: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      imageSrc: null,
    };
  }

  componentDidMount() {
    const { file } = this.props;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.setState({
        imageSrc: reader.result,
      });
    });
    reader.readAsDataURL(file);
  }

  render() {
    const { file } = this.state;
    const { imageSrc } = this.state;
    const alt = file ? file.name : '';
    return <img style={{ width: '100px' }} src={imageSrc} alt={alt} />;
  }
}

export default withUser(WritingReviewView);
