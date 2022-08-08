import '../styles.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Modal({ bigPicture, closeModal }) {
  const onOverlayClickClose = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const onEscCloseModal = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onEscCloseModal);

    return () => {
      window.removeEventListener('keydown', onEscCloseModal);
    };
  }, [closeModal]);

  return (
    <div className="Overlay" onClick={onOverlayClickClose}>
      <div className="Modal">
        <img src={bigPicture} alt="s" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  bigPicture: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
