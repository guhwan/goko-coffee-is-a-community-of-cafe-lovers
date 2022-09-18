import EatDealDetailView from '../components/EatDealDetailView';
import React, { Component } from 'react';
import api from '../api';
import { Helmet } from 'react-helmet';

export default class EatDealDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eatDealDetail: 
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
      //backend 구축 후 api연결시 true로 변경
      loading: false,
    };
  }
  async componentDidMount() {
    const { pk } = this.props;
    const res = await api.get(`/api/eatdeals/list/${pk}`);
    this.setState({
      eatDealDetail: { ...res.data },
      loading: false,
    });
  }

  render() {
    const { eatDealDetail, loading } = this.state;

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{eatDealDetail.deal_name}</title>
        </Helmet>
        <EatDealDetailView eatDealDetail={eatDealDetail} loading={loading} />
      </>
    );
  }
}
