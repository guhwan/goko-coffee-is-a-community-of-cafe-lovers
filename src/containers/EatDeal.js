import React, { Component } from 'react';
import EatDealView from '../components/EatDealView';

// import api from '../api';
import axios from 'axios';

export default class EatDeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eatDeal: [
        {
          id: 1,
          pk: 1,
          how_to_use: '파씨오네\n 테스트\n aabc',
          eatdealimages: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
          deal_name: '고고커피(goko coffee) 청담점',
          sub_name: '[시그니쳐] 아인슈페너',
          start_date: '2022-01-16',
          end_date: '2022-09-16',
          base_price: 13000,
          discount_rate: '10',
          discount_price: 11000,
          introduce_res: 'introduce_res',
          introduce_menu: 'introduce_menu',
          caution: 'caution',
          refund: 'refund',
          inquiry: 'inquiry',
        },
        {
          id: 2,
          pk: 2,
          how_to_use: '파씨오네\n 테스트\n aabc',
          eatdealimages: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxCpsTzOTaDJzPI2dilr6sTebFCjoIfVy93g&usqp=CAU',
          deal_name: '곱다고와 고운커피(koeun) 명동점',
          sub_name: '[시그니쳐] 돌체라뗴',
          start_date: '2022-01-16',
          end_date: '2022-09-16',
          base_price: 13000,
          discount_rate: '10',
          discount_price: 7000,
          introduce_res: 'introduce_res',
          introduce_menu: 'introduce_menu',
          caution: 'caution',
          refund: 'refund',
          inquiry: 'inquiry',
        },
      ],
      //backend 구축 후 api연결시 true로 변경
      loading: false,
    };
  }
  async componentDidMount() {

    // const res = await api.get('/api/eatdeals/list/');
    const res = await axios.get('https://stage.mangoplate.com/api/v1/eat_deals/search/by_filter/count.json')
    
    this.setState({
      eatDeal: [...res.data.results],
      loading: false,
    });
  }

  render() {
    const { eatDeal, loading } = this.state;

    return (
      <>
        <EatDealView eatDeal={eatDeal} loading={loading} />
      </>
    );
  }
}
