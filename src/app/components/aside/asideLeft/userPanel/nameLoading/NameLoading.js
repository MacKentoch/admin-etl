import React, {PropTypes} from 'react';
import { ThreeBounce }    from 'better-react-spinkit';

const NameLoading = ({size, color}) => {
  return (
    <ThreeBounce
      size={size}
      color={color}
    />
  );
};

NameLoading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

NameLoading.defaultProps = {
  color: '#f9690e',
  size: 16
};

export default NameLoading;
