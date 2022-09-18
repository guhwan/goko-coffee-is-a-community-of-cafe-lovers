import React, { Component } from 'react';
import GalleryModalView from '../components/GalleryModalView/GalleryModalView';

export default class GalleryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: [
        'https://mp-seoul-image-production-s3.mangoplate.com/web/resources/restaurant_recommend_active_face.svg',
        'https://mp-seoul-image-production-s3.mangoplate.com/web/resources/restaurant_ok_active_face.svg',
        'https://mp-seoul-image-production-s3.mangoplate.com/web/resources/restaurant_not_recommend_active_face.svg',
      ],
    };
  }
  render() {
    return (
      <GalleryModalView
        post_set={this.props.post_set}
        restaurants={this.props.restaurants}
        imagePath={this.state.imagePath}
      />
    );
  }
}
