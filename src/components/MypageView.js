import React, { Component } from 'react';
import styles from './MypageView.module.scss';
import classNames from 'classnames/bind';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import { withUser } from '../contexts/UserContext';
import { withModal } from '../contexts/ModalContext';
import LoginPopupView from './LoginPopupView';
import RecentGo from '../containers/RecentGo';
import { withWannago } from '../contexts/WannagoContext';
import WannaGo from '../containers/WannaGo';

const cx = classNames.bind(styles);

class MypageView extends Component {
  targetElement = null;

  componentDidMount() {
    this.targetElement = LoginPopupView;
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    // 5. Useful if we have called disableBodyScroll for multiple target elements,
    // and we just want a kill-switch to undo all that.
    // OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
    // clicks a link which takes him/her to a different page within the app.
    clearAllBodyScrollLocks();
  }

  render() {
    const {
      handleCurrentPk,
      handleActive,
      handleCount,
      handleToggle,
      wannagoSet,
      logout,
      handleRecentReset,
      recentView,
      modalOpen,
      popupOpen,
      recentOpen,
      wannagoOpen,
      handleClick,
      showTargetElement,
      hideTargetElement,
      username,
    } = this.props;
    return (
      <React.Fragment>
        <div
          className={cx({ blackOverlay: modalOpen })}
          onClick={() => {
            hideTargetElement('modalOpen');
          }}
        />
        <section className={cx('myPage', 'arrowTop', { modal: !modalOpen })}>
          <div className={cx('myPageWrapper')}>
            <div className={cx('tapWrapper')}>
              <div
                className={cx('tap', { active: recentOpen })}
                onClick={() => {
                  handleClick('recentOpen', 'wannagoOpen');
                }}
              >
                최근 본 맛집
              </div>
              <div
                className={cx('tap', { active: wannagoOpen })}
                onClick={() => {
                  username == null
                    ? !popupOpen && showTargetElement('popupOpen')
                    : handleClick('wannagoOpen', 'recentOpen');
                }}
              >
                가고싶다
              </div>
            </div>
            <div className={cx('list')}>
              {recentOpen && (
                <React.Fragment>
                  <button
                    className={cx('recentResetBtn')}
                    onClick={handleRecentReset}
                  >
                    목록 삭제
                  </button>
                  <ul className={cx('recentView')}>
                    {recentView &&
                      recentView.map((item, index) => {
                        return (
                          <RecentGo
                            key={index}
                            showTargetElement={showTargetElement}
                            hideTargetElement={hideTargetElement}
                            item={item}
                            myPageWannago={wannagoSet
                              .map(item => item.restaurant)
                              .includes(item.pk)}
                            handleCurrentPk={handleCurrentPk}
                            handleActive={handleActive}
                            handleCount={handleCount}
                            handleToggle={handleToggle}
                          />
                        );
                      })}
                  </ul>
                </React.Fragment>
              )}
              {wannagoOpen && (
                <ul className={cx('wannago')}>
                  {wannagoSet.map((item, index) => {
                    return (
                      <WannaGo
                        key={index}
                        showTargetElement={showTargetElement}
                        hideTargetElement={hideTargetElement}
                        wannagoItem={item}
                        myPageWannago={true}
                        handleCurrentPk={handleCurrentPk}
                        handleActive={handleActive}
                        handleCount={handleCount}
                        handleToggle={handleToggle}
                      />
                    );
                  })}
                </ul>
              )}
            </div>
            <div className={cx('buttonList')}>
              {username == null ? (
                <button
                  className={cx('btn')}
                  onClick={() => {
                    !popupOpen && showTargetElement('popupOpen');
                  }}
                >
                  로그인
                </button>
              ) : (
                <button className={cx('btn')} onClick={logout}>
                  로그아웃
                </button>
              )}
            </div>
          </div>
        </section>
        {popupOpen && (
          <LoginPopupView
            popupOpen={popupOpen}
            hideTargetElement={hideTargetElement}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withUser(withModal(withWannago(MypageView)));
