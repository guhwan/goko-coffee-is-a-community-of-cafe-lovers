import React, { Component } from 'react';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const { Provider, Consumer } = React.createContext();

export default class ModalProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      popupOpen: false,
      galleryOpen: false,
      handleClick: this.handleClick,
      handlePopup: this.handlePopup,
      handleGallery: this.handleGallery,
      showTargetElement: this.showTargetElement,
      hideTargetElement: this.hideTargetElement,
      clearAllBodyScrollLocks: this.clearAllBodyScrollLocks,
    };
  }

  showTargetElement = name => {
    // ... some logic to show target element
    if (name === 'modalOpen') {
      this.setState(prevState => ({
        modalOpen: !prevState.modalOpen,
      }));
    } else if (name === 'popupOpen') {
      this.setState(prevState => ({
        popupOpen: !prevState.popupOpen,
      }));
    } else if (name === 'galleryOpen') {
      this.setState(prevState => ({
        galleryOpen: !prevState.galleryOpen,
      }));
    }

    // 3. Disable body scroll
    disableBodyScroll(this.targetElement);
  };

  hideTargetElement = name => {
    // ... some logic to hide target element
    if (name === 'modalOpen') {
      this.setState(prevState => ({
        modalOpen: !prevState.modalOpen,
      }));
    } else if (name === 'popupOpen') {
      this.setState(prevState => ({
        popupOpen: !prevState.popupOpen,
      }));
    } else if (name === 'galleryOpen') {
      this.setState(prevState => ({
        galleryOpen: !prevState.galleryOpen,
      }));
    }

    // 4. Re-enable body scroll
    enableBodyScroll(this.targetElement);
  };

  clearAllBodyScrollLocks = () => {
    clearAllBodyScrollLocks();
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withModal(WrappedComponent) {
  return function WithModal(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

export { ModalProvider, Consumer as ModalConsumer, withModal };
