import '../styles.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ children }) {
  return <ul className="ImageGallery">{children}</ul>;
}

ImageGallery.propTypes = {
  children: PropTypes.object.isRequired,
};
