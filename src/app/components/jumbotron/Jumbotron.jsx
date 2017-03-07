import React, { PropTypes } from 'react';
import cx                   from 'classnames';

const Jombotron = ({children, cardLike}) => {
  return (
    <div
      className={
        cx({
          jumbotron: true,
          'card-like': cardLike
        })
      }>
      {children}
    </div>
  );
};

Jombotron.propTypes = {
  children: PropTypes.node,
  cardLike: PropTypes.bool
};

Jombotron.defaultProps = {
  cardLike: false
};

export default Jombotron;
