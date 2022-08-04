import '../styles.css';
import PropTypes from 'prop-types';

export default function Button({ loadMore }) {
  return (
    <div className="ButtonBox">
      <button type="button" className="Button" onClick={loadMore}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
