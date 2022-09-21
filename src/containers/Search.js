import React, { Component } from 'react';
// import api from '../api';
import SearchView from '../components/SearchView/SearchView';

export default class Search extends Component {
  /* 
    여기에서 식당리스트 정보를 서버에서 받아와서 상태를 관리한다.
    SearchView(PC)에 내려주고,
    SearchListView와 SearchMapView 까지 상태를 내려서 정보를 표시해준다.
  */
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      next: 2,
      previous: 1,
      restaurants: [
        {
        pk: 1,
        post_set: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLhNqy8N-ffZ3Iehp6-w51vRuJyap320mngg&usqp=CAU',
        name:'고고커피',
        rate_average: 5,
        address: '강남',
        food_type: '커피',
        view_num: 99,
        review_num: 32,
        want_num: 22,
        latitude: 37.5074595,
        longitude: 127.0234668,
      },
      {
        pk: 2,
        post_set: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo5_2UycNJC9-vakIU_LAKsH-OpmeaZzZMDg&usqp=CAU',
        name: '고비커피',
        rate_average: 4,
        address: '강남',
        food_type: '커피',
        view_num: 99,
        review_num: 32,
        want_num: 22,
        latitude: 37.5074595,
        longitude: 127.0234668,
      },
      {
        pk: 3,
        post_set: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFxuiTFjR5or_tzCD9ZVaskqLzOH44YGE8mw&usqp=CAU',
        name: '비고커피',
        rate_average: 4.8,
        address: '강남',
        food_type: '커피',
        view_num: 99,
        review_num: 32,
        want_num: 22,
        latitude: 37.5074595,
        longitude: 127.0234668,
      },
      {
        pk: 4,
        post_set: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ-n7S24kY0YYs7jjyNbQhrnwWSn28Tm3B-g&usqp=CAU',
        name: '내가만든카페',
        rate_average: 4.3,
        address: '강남',
        food_type: '커피',
        view_num: 99,
        review_num: 32,
        want_num: 22,
        latitude: 37.5074595,
        longitude: 127.0234668,
      },
      {
        pk: 5,
        post_set: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVD4g9I-fgTEUSq0eWEvO3fVsd130aQ2vI2A&usqp=CAU',
        name: '맛있는커피',
        rate_average: 3.2,
        address: '강남',
        food_type: '커피',
        view_num: 99,
        review_num: 32,
        want_num: 22,
        latitude: 37.5074595,
        longitude: 127.0234668,
      },
    ],
    loading: false,
    keyword:'카페',
      // todo: API 구축후 아래로 변경 예정
      // count: 0,
      // next: null,
      // previous: null,
      // restaurants: [],
      // loading: true,
      // keyword: null,
    };
  }

  async componentDidMount() {
    // Search Component (CC) 마운트 되면서 스크롤을 맨 위로 끌어올린다.
    window.scrollTo(0, 0);

    // // 비동기 통신으로 해당 페이지의 식당 목록을 가져온다.
    // const { page, keyword } = this.props;
    // const { data } = await api.get(`/api/restaurants/list/`, {
    //   params: {
    //     page,
    //     search: keyword,
    //     ordering: '-rate_average',
    //   },
    // });

    // // setState는 비동기로 작동하지만 promise를 반환하지 않기 때문에 await을 쓸 수 없다.
    // this.setState({
    //   count: data.count,
    //   next: data.next,
    //   previous: data.previous,
    //   restaurants: [...data.results],
    //   loading: false,
    // });
  }
  
  render() {
    console.log({...this.state});
    return (
      <React.Fragment>
        <SearchView {...this.state} />
      </React.Fragment>
    );
  }
}
