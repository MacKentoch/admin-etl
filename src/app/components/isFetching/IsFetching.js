import React, {PropTypes} from 'react';
import { ChasingDots }    from 'better-react-spinkit';

const IsFetching = ({size, color, showText, text}) => {
  return (
    <div
      className="center-block"
      style={{width: `${size + 0}px`}}>
      <div className="spacer_20"></div>
      {
        showText &&
        <small>
          <i>
            {text}
          </i>
        </small>
      }
      <div className="spacer_20"></div>
      <ChasingDots
        size={size}
        color={color}
      />
    </div>
  );
};

IsFetching.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  showText: PropTypes.bool,
  text: PropTypes.string
};

IsFetching.defaultProps = {
  color: '#f9690e',
  size: 24,
  showText: false,
  text:'loading...'
};

export default IsFetching;
