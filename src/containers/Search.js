import React, { Component } from 'react';
import api from '../api';
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
      count: 0,
      next: null,
      previous: null,
      restaurants: [],
      loading: true,
      keyword: null,
    };
  }

  async componentDidMount() {
    // Search Component (CC) 마운트 되면서 스크롤을 맨 위로 끌어올린다.
    window.scrollTo(0, 0);

    // 비동기 통신으로 해당 페이지의 식당 목록을 가져온다.
    const { page, keyword } = this.props;
    const { data } = await api.get(`/api/restaurants/list/`, {
      params: {
        page,
        search: keyword,
        ordering: '-rate_average',
      },
    });

    // setState는 비동기로 작동하지만 promise를 반환하지 않기 때문에 await을 쓸 수 없다.
    this.setState({
      count: data.count,
      next: data.next,
      previous: data.previous,
      restaurants: [...data.results],
      loading: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <SearchView {...this.state} />
      </React.Fragment>
    );
  }
}
