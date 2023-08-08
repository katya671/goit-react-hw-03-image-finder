import ReactLoading from 'react-loading';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <ReactLoading
        type="spinningBubbles"
        color="#ea84a4"
        height={50}
        width={50}
        className={css.loading}
      />
    </div>
  );
};

export default Loader;
