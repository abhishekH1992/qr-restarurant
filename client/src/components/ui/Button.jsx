import { Button, Spinner } from '@nextui-org/react';
import PropTypes from 'prop-types';

const LoadingButton = ({ children, onClick, loading, classNames, ...props }) => {
  return (
    <Button onClick={onClick} className={classNames} disabled={loading} {...props}>
      {loading ? <Spinner /> : children}
    </Button>
  );
};

LoadingButton.propTypes = {
  classNames: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  children: PropTypes.array
};

export default LoadingButton;