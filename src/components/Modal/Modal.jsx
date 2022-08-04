import '../styles.css';
import PropTypes from 'prop-types';

export default function Modal({ picture, closeModal, onEscCloseModal }) {
  onEscCloseModal();

  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={picture} alt="large picture" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  picture: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  onEscCloseModal: PropTypes.func.isRequired,
};
