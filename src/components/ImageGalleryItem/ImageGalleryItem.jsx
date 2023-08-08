import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  alt,
  handleImageClick,
}) => {
  return (
    <li
      className={css['gallery-item']}
      onClick={() => handleImageClick({ largeImageURL, alt })}
    >
      <img className={css['gallery-item-image']} src={webformatURL} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func.isRequired,
};
