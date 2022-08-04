import '../styles.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ items, openModal }) {
  return items.map(el => (
    <li
      key={el.itemId}
      className="ImageGalleryItem-item"
      id={el.itemId}
      onClick={openModal}
    >
      <img
        src={el.itemPicture}
        alt="itemPicture"
        className="ImageGalleryItem-image"
      />
    </li>
  ));
}

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.number.isRequired,
      itemPicture: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
