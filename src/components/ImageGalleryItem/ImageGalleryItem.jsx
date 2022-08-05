import '../styles.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item, openModal }) {
  const { itemId, itemPicture } = item;
  return (
    <li className="ImageGalleryItem-item" id={itemId} onClick={openModal}>
      <img
        src={itemPicture}
        alt="itemPicture"
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    itemPicture: PropTypes.string.isRequired,
  }),
  openModal: PropTypes.func.isRequired,
};
