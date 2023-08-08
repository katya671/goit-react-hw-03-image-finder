import css from './Modal.module.css';

const Modal = ({ largeImageURL, alt, onClose }) => {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
