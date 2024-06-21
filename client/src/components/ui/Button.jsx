import { Button, Spinner } from '@nextui-org/react';

const LoadingButton = ({ children, onClick, loading, classNames, ...props }) => {
  return (
    <Button onClick={onClick} className={classNames} disabled={loading} {...props}>
      {loading ? <Spinner /> : children}
    </Button>
  );
};

export default LoadingButton;