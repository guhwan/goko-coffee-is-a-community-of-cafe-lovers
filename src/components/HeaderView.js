import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderView.module.scss';
import { withUser } from '../contexts/UserContext';
import { withPage } from '../contexts/PageContext';
import { withModal } from '../contexts/ModalContext';
// import { ReactComponent as MiniLogo } from '../commonimgs/logo_goko_mini.svg';
// import { ReactComponent as GrayLogo } from '../commonimgs/logo_goko_midle.svg';
import { ReactComponent as MainLogo } from '../commonimgs/logo_goko_full.svg';

import { Link } from 'react-router-dom';
import MainSearchView from './MainSearchView/MainSearchView';
import MyPage from '../containers/MyPage';

const cx = classNames.bind(styles);

class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: 0,
    };
  }

  targetElement = null;

  componentDidMount() {
    // 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
    this.targetElement = MyPage;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  handleScroll = () => {
    this.setState({
      scroll: window.scrollY,
    });
  };

  render() {
    const {
      main,
      username,
      picture,
      modalOpen,
      showTargetElement,
      handleClick,
      ...rest
    } = this.props;
    const { scroll } = this.state;

    // 현재 보고있는 페이지가 메인 페이지라면 scroll 이벤트 리스너 등록
    if (this.props.main) {
      window.addEventListener('scroll', this.handleScroll, true);
    }

    return (
      <>
        <header className={cx('header', { transparent: main && scroll < 50 })}>
          <div className={cx('logoAndSearch')}>
            <Link to="/" className={cx('logo')}>
              <div className={cx('miniLogo')} />
              {/* <MiniLogo
                className={cx('miniLogo', { appear: !main || scroll > 50 })}
              /> */}
              <MainLogo
                className={cx('mainLogo', { appear: !main || scroll > 50 })}
              />
              {/* <GrayLogo
                className={cx('grayLogo', { apper: main })}
              /> */}
            </Link>
            {!main && <MainSearchView />}
          </div>
          <nav className={cx('nav')}>
            <ul className={cx('navList')}>
              <li className={cx('navItem', { white: main && scroll < 50 })}>
                <Link
                  to="/eatdeals"
                  className={cx('navItem', { white: main && scroll < 50 })}
                >
                  GOKO 추천 카페
                </Link>
              </li>
              <li className={cx('navItem', { white: main && scroll < 50 })}>
                카페 리스트
              </li>
              <li className={cx('navItem', { white: main && scroll < 50 })}>
                전국 카페지도
              </li>
              <li className={cx('navItem')}>
                <button
                  className={cx('hamburger')}
                  onClick={() => {
                    // !modalOpen && showTargetElement('modalOpen');
                  }}
                >
                  메뉴 펼치기
                </button>
              </li>
              <li className={cx('navItem', { white: main })}>
                {username ? (
                  <button
                    className={cx('myPage', 'logined')}
                    style={{ backgroundImage: `url(${picture})` }}
                    onClick={() => {
                      !modalOpen && showTargetElement('modalOpen');
                    }}
                  >
                    마이페이지
                  </button>
                ) : (
                  <button
                    className={cx('myPage')}
                    onClick={() => {
                      !modalOpen && showTargetElement('modalOpen');
                    }}
                  >
                    마이페이지
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </header>
        {modalOpen ? <MyPage {...rest} handleClick={handleClick} /> : null}
      </>
    );
  }
}

export default withUser(withPage(withModal(HeaderView)));
