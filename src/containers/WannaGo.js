import React, { Component } from 'react';
import WannaGoView from '../components/WannaGoView/WannaGoView';
import api from '../api';

export default class WannaGo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wannagoItemSet: null,
    };
  }

  async componentDidMount() {
    const restarauntPk = this.props.wannagoItem.restaurant;
    const { data } = await api.get(`/api/restaurants/list/${restarauntPk}`);
    console.log(data);
    const imgUrl = data.post_set.find(item => item.postimage_posts.length > 0)
      ? data.post_set
          .find(item => item.postimage_posts.length > 0)
          .postimage_posts.map(item => item.image)[0]
          .toString()
      : null;

    this.setState({
      wannagoItemSet: {
        pk: data.pk,
        name: data.name,
        address: data.address,
        food_type: data.food_type,
        rate_average: data.rate_average,
        want_num: data.want_num,
        imgUrl,
      },
    });
  }

  render() {
    const { wannagoItemSet } = this.state;
    return (
      wannagoItemSet && (
        <React.Fragment>
          <WannaGoView
            key={wannagoItemSet.pk}
            item={wannagoItemSet}
            {...this.props}
          />
        </React.Fragment>
      )
    );
  }
}
