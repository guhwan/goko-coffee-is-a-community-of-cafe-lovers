import React, { Component } from 'react';
import { withPage } from '../contexts/PageContext';
import MainHeroView from '../components/MainHeroView/MainHeroView';
import MainListView from '../components/MainListView/MainListView';
import RateListView from '../components/MainListView/RateListView';
import api from '../api';
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantList: [
        {
          id: 1,
          pk: 1,
          name: '고고커피 청담점',
          rate_average: 4.2,
          food_type: '탕 / 찌개 / 전골',
          mainImg: 'food1',
          text: '곱창전골 맛집 베스트',
        },
      ],
    };
  }
  async componentDidMount() {
    this.props.handlePageOpen('main');
    //요청 예시 - https://fastplate.xyz/api/restaurants/list/?page=1&ordering=-rate_average&page_size=8
    const res = await api.get('/api/restaurants/list/', {
      params: {
        page: 1,
        ordering: '-rate_average',
        page_size: 8,
      },
    });
    this.setState({
      restaurantList: [...res.data.results],
    });
  }

  componentWillUnmount() {
    this.props.handlePageClose('main');
  }

  render() {
    const { restaurantList } = this.state;
    return (
      <main>
        <MainHeroView />
        <RateListView restaurantList={restaurantList} />
        <MainListView />
      </main>
    );
  }
}

export default withPage(Main);
