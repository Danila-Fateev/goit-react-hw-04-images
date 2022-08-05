import '../styles.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Modal extends Component {
  onEscCloseModal = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onOverlayClickClose = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscCloseModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscCloseModal);
  }

  render() {
    return (
      <div className="Overlay" onClick={this.onOverlayClickClose}>
        <div className="Modal">
          <img src={this.props.bigPicture} alt="s" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  bigPicture: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
