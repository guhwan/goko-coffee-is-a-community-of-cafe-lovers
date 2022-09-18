import React, { Component } from 'react';
import { withPage } from '../contexts/PageContext';
import MapView from '../components/MapView/MapView';

class GoogleMap extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <MapView
        {...this.props}
        {...this.state}
        onMarkerClick={this.onMarkerClick}
        onMapClicked={this.onMapClicked}
        onClose={this.onClose}
      />
    );
  }
}

export default withPage(GoogleMap);
