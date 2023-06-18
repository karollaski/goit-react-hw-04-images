import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const isShowModal = () => setShowModal(true);

  const onCloseModal = () => setShowModal(false);

  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem__image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={isShowModal}
      />
      {showModal ? (
        <Modal
          largeImageUrl={image.largeImageURL}
          tags={image.tags}
          onClose={onCloseModal}
        />
      ) : null}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
