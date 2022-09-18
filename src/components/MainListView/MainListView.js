import React, { Component } from 'react';
import styles from './MainListView.module.scss';
import classNames from 'classnames/bind';
import food1 from './SecondaryImg/food1.jpg';
import food2 from './SecondaryImg/food2.jpg';
import food3 from './SecondaryImg/food3.jpg';
import food4 from './SecondaryImg/food4.jpeg';
import food5 from './SecondaryImg/food5.jpg';
import food6 from './SecondaryImg/food6.jpg';
import food7 from './SecondaryImg/food7.jpg';
import food8 from './SecondaryImg/food8.jpg';
import food9 from './SecondaryImg/food9.jpg';

const cx = classNames.bind(styles);

export default class MainListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyImgTextArr: [
        {
          id: 1,
          img: food1,
          text: '곱창전골 맛집 베스트',
          keyword: '성수',
        },
        {
          id: 2,
          img: food2,
          text: '이주의 EAT딜 베스트',
          keyword: '성수',
        },
        {
          id: 3,
          img: food3,
          text: '성북구 양식 맛집 베스트',
          keyword: '성수',
        },
        {
          id: 4,
          img: food4,
          text: '명동 맛집 베스트',
          keyword: '명동',
        },
        {
          id: 5,
          img: food5,
          text: '펍 베스트',
          keyword: '명동',
        },
        {
          id: 6,
          img: food6,
          text: '오믈렛 맛집 베스트',
          keyword: '명동',
        },
        {
          id: 7,
          img: food7,
          text: '들깨 칼국수 맛집 베스트',
          keyword: '강남',
        },
        {
          id: 8,
          img: food8,
          text: '생선구이 맛집 베스트',
          keyword: '강남',
        },
        {
          id: 9,
          img: food9,
          text: '비빔밥 맛집 베스트',
          keyword: '강남',
        },
      ],
      dummyArr: [],
    };
  }

  componentDidMount() {
    this.all();
  }

  all() {
    const { dummyImgTextArr } = this.state;
    this.setState({
      dummyArr: dummyImgTextArr,
    });
  }

  sungsu() {
    const { dummyImgTextArr } = this.state;
    this.setState({
      dummyArr: dummyImgTextArr.filter(dummy => {
        return dummy.keyword === '성수';
      }),
    });
  }

  myundong() {
    const { dummyImgTextArr } = this.state;
    this.setState({
      dummyArr: dummyImgTextArr.filter(dummy => {
        return dummy.keyword === '명동';
      }),
    });
  }

  gangnam() {
    const { dummyImgTextArr } = this.state;
    this.setState({
      dummyArr: dummyImgTextArr.filter(dummy => {
        return dummy.keyword === '강남';
      }),
    });
  }

  render() {
    const { dummyArr } = this.state;
    return (
      <div className={cx('secondary')}>
        <h2>믿고 보는 맛집 리스트</h2>
        <div className={cx('tags')}>
          <button onClick={() => this.all()}>#전체</button>
          <button onClick={() => this.sungsu()}>#성수</button>
          <button onClick={() => this.myundong()}>#명동</button>
          <button onClick={() => this.gangnam()}>#강남</button>
        </div>

        {dummyArr.map((dummy, index) => (
          <HandleList
            key={dummy.id}
            listImg={dummy.img}
            listText={dummy.text}
          />
        ))}
      </div>
    );
  }
}

class HandleList extends Component {
  render() {
    const { listImg, listText } = this.props;
    return (
      <div className={cx('secondarylistList')}>
        <img src={listImg} alt="list-images" />
        <p>{listText}</p>
      </div>
    );
  }
}
