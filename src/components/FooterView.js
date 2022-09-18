import React, { Component } from 'react';
import './FooterView.scss';

export default class FooterView extends Component {
  render() {
    return (
      <div className="footer__background">
        <footer>
          <div className="footer__inner">
            <div className="logo__area">
              <h1 className="footer__logo">
                MANGO
                <br /> PLATE
              </h1>
              <p className="slogon">Eat, Share, Be Happy.</p>
            </div>
            <div className="link__list">
              <ul>
                <li>회사소개</li>
                <li>망고플레이트 채용</li>
                <li>투자 정보</li>
                <li>브랜드 가이드라인</li>
                <li>망고플레이트 비즈니스</li>
                <li>광고 문의</li>
              </ul>
              <ul>
                <li>공지사항</li>
                <li>이용약관</li>
                <li>비회원 이용자 이용정책</li>
                <li>개인정보처리방침</li>
                <li>위치기반서비스 이용약관</li>
                <li>커뮤니티 가이드라인</li>
                <li>홀릭 소개</li>
                <li>문의하기</li>
              </ul>
            </div>
            <p className="sns">
              <a href="http://blog.mangoplate.com/">Blog</a>
              <a href="https://www.facebook.com/MangoPlate/">FaceBook</a>
              <a href="https://www.instagram.com/mangoplate/">Instagram</a>
            </p>
          </div>
          <div className="copyright">
            <small>
              ㈜ 망고플레이트
              <br />
              서울특별시 강남구 도곡로7길 28, 3층 302호 (역삼동, 우정빌딩)
              <br />
              대표이사: 김대웅 사업자 등록번호: 211-88-92374 [사업자정보확인]
              <br />
              통신판매업 신고번호: 2014-서울강남-02615 고객센터: 02-565-5988
              <br />
              <span className="summery">
                © 2018 MangoPlate Co., Ltd. All rights reserved.
              </span>
            </small>
            <div className="select-language">
              <span>한국어</span>
              <span>English</span>
              <span>简体中文</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
