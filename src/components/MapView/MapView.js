import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './MapView.module.scss';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import MapInfoView from '../MapInfoView/MapInfoView';
import loadingImg from '../../commonimgs/loadingImage/loadingImg.svg';
const cx = classNames.bind(styles);
const mapStyles = {
  width: '100%',
  height: '400px',
};

class MapView extends Component {
  render() {
    const {
      search,
      detail,
      restaurants,
      google,
      selectedPlace,
      activeMarker,
      showingInfoWindow,
      onMarkerClick,
      onMapClicked,
      onClose,
    } = this.props;
    let latSum, lngSum;

    if (search) {
      latSum = restaurants.reduce((acc, item) => {
        return acc + item.latitude;
      }, 0);
      lngSum = restaurants.reduce((acc, item) => {
        return acc + item.longitude;
      }, 0);
    }
    return (
      <section className={cx('mapSection')}>
        {search && restaurants.length > 0 ? (
          <Map
            google={google}
            zoom={15}
            style={mapStyles}
            onClick={onMapClicked}
            initialCenter={{
              lat: latSum / restaurants.length,
              lng: lngSum / restaurants.length,
            }}
          >
            {restaurants.map(r => (
              <Marker
                key={r.id}
                id={r.id}
                imgUrl={r.imgUrl}
                name={r.name}
                score={r.score}
                location={r.location}
                type={r.foodType}
                reviewCount={r.reviewCount}
                wannagoCount={r.wannagoCount}
                position={{ lat: r.latitude, lng: r.longitude }}
                onClick={onMarkerClick}
              />
            ))}
            <InfoWindow
              marker={activeMarker}
              visible={showingInfoWindow}
              onClose={onClose}
            >
              <MapInfoView selectedPlace={selectedPlace} />
            </InfoWindow>
          </Map>
        ) : detail && Object.keys(restaurants).length > 0 ? (
          <Map
            google={google}
            zoom={17}
            style={mapStyles}
            onClick={onMapClicked}
            initialCenter={{
              lat: restaurants.latitude,
              lng: restaurants.longitude,
            }}
          >
            <Marker
              position={{
                lat: restaurants.latitude,
                lng: restaurants.longitude,
              }}
            />
          </Map>
        ) : null}
      </section>
    );
  }
}

const LoadingIndicator = props => (
  <img
    src={loadingImg}
    alt="loadingIndicator"
    className={cx('loadingIndicator')}
  />
);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBEnQjegs7YdsLdGxRBMSHoQ1aFlJKppwM',
  LoadingContainer: LoadingIndicator,
})(MapView);
