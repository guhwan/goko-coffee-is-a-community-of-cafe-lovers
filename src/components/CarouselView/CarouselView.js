import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './CarouselView.scss';
import defaultListItem from '../../commonimgs/defaultListItem.jpg';

// 필요한 내용 : 유저명, 날짜, 평가얼굴아이콘
export default function CarouselView(props) {
  const { post_set, restaurants, imagePath } = props;
  const validReview = post_set.filter(item => item.postimage_posts.length > 0);
  console.log(validReview[0].postimage_posts[0].image);

  return (
    <React.Fragment>
      <Carousel
        className="carouselWindow"
        showStatus={false}
        showIndicators={false}
      >
        {validReview.map(item =>
          item.postimage_posts.map(imgs => (
            <figure key={item.pk} className="imgWrapper">
              <img
                src={imgs.image}
                alt="userPostedimages"
                className="carouselImages"
              />
              <figcaption className="reviewContent">
                <h1 className="name">{restaurants.name}</h1>
                <div className="reviewBody">
                  <div className="profileArea">
                    <img
                      src={
                        item.author.img_profile
                          ? item.author.img_profile
                          : defaultListItem
                      }
                      alt="profileImage"
                      className="profilePic"
                    />
                    <h3 className="author">{item.author.full_name}</h3>
                  </div>
                  <div className="ratingArea">
                    <img
                      src={
                        item.rate === 5
                          ? imagePath[0]
                          : item.rate === 3
                          ? imagePath[1]
                          : item.rate === 1
                          ? imagePath[2]
                          : null
                      }
                      alt="eval-face-icon"
                      className={'evalFace'}
                    />
                    <p className={'evalText'}>
                      {item.rate === 5
                        ? '맛있다'
                        : item.rate === 3
                        ? '괜찮다'
                        : item.rate === 1
                        ? '별로'
                        : null}
                    </p>
                  </div>
                  <p className="carouselContent">{item.content}</p>
                </div>
              </figcaption>
            </figure>
          ))
        )}
      </Carousel>
    </React.Fragment>
  );
}
