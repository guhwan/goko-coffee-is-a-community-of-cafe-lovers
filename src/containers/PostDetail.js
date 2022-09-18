import React, { Component } from 'react';
import api from '../api';
import PostDetailView from '../components/PostDetailView';
import { setRecentView } from '../setLocalStorage';
import ModalProvider from '../contexts/ModalContext';
import { Helmet } from 'react-helmet';
import { withUser } from '../contexts/UserContext';

class PostDetail extends Component {
  /* 
    여기에서 식당리스트 정보를 서버에서 받아와서 상태를 관리한다.
    SearchView(PC)에 내려주고,
    SearchListView와 SearchMapView 까지 상태를 내려서 정보를 표시해준다.
  */
  constructor(props) {
    super(props);
    this.state = {
      restaurantId: null,
      want_num: 0,
      restaurants: {},
      post_set: [],
      container: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { restaurantId } = this.props;

    //PostDetailPage에서 받아온 match 안에 id 값
    const {
      data: { want_num, post_set, ...rest },
    } = await api.get(`/api/restaurants/list/${restaurantId}`);

    this.setState({
      restaurants: { want_num, ...rest },
      want_num: want_num,
      post_set: post_set,
      loading: false,
    });

    // 해당 레스토랑 정보를 localStorage에 저장 (최근 본 맛집에서 사용)
    // restaurants 에서 최근 본 맛집에 필요한 정보만 뽑아서 객체에 저장
    const {
      pk,
      name,
      address,
      food_type,
      rate_average,
    } = this.state.restaurants;

    const restData = {
      pk,
      name,
      address,
      food_type,
      rate_average,
      want_num,
      imgUrl: this.state.post_set.find(item => item.postimage_posts.length > 0)
        ? this.state.post_set
            .find(item => item.postimage_posts.length > 0)
            .postimage_posts.map(item => item.image)[0]
            .toString()
        : null,
    };
    // 뽑아낸 정보 객체를 로컬스토리지에 저장
    setRecentView(restData);

    this.allReview();
  }

  async handleCount(pk, num) {
    await api.patch(`/api/restaurants/list/${pk}`, {
      want_num: num + 1,
    });
  }

  allReview = () => {
    const { post_set } = this.state;
    this.setState({
      container: post_set,
    });
  };

  handleReviewfilter(n) {
    const { post_set } = this.state;
    this.setState({
      container: post_set.filter(element => {
        return element.rate === n;
      }),
    });
  }

  render() {
    const {
      loading,
      restaurantId,
      restaurants,
      comments,
      wannaGo,
      post_set,
      container,
    } = this.state;
    const { location } = this.props;

    return (
      <React.Fragment>
        <ModalProvider>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{restaurants.name}</title>
          </Helmet>
          <PostDetailView
            loading={loading}
            post_set={post_set}
            restaurantId={restaurantId}
            restaurants={restaurants}
            comments={comments}
            handleCount={this.handleCount}
            wannaGo={wannaGo}
            handleWannaGo={() => this.handleWannaGo()}
            handleRating={() => this.handleRating()}
            location={location}
            handleReviewfilter={n => this.handleReviewfilter(n)}
            handleStarOn={() => this.handleStarOn()}
            container={container}
            allReview={this.allReview}
          />
        </ModalProvider>
      </React.Fragment>
    );
  }
}

export default withUser(PostDetail);
