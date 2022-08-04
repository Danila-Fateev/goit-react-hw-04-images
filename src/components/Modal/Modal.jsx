import '../styles.css';
import PropTypes from 'prop-types';

export default function Modal({ bigPicture, closeModal, onEscCloseModal }) {
  onEscCloseModal();

  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={bigPicture} alt="large picture" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  bigPicture: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  onEscCloseModal: PropTypes.func.isRequired,
};
