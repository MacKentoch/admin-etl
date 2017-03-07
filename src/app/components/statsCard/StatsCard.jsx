import React, { PropTypes } from 'react';
import cx from 'classnames';

const StatsCard = ({
  statValue,
  statLabel,
  icon,
  backColor,
  cardLike
}) => {
  const colorClass = `sm-st-icon st-${backColor}`;

  return (
    <div
      className={
        cx({
          'sm-st': true,
          clearfix: true,
          'card-like': cardLike
        })
      }>
      <span className={ colorClass }>
        { icon }
      </span>
      <div className="sm-st-info">
        <span>
          { statValue }
        </span>
        <div>
          { statLabel }
        </div>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  statValue: PropTypes.string,
  statLabel: PropTypes.string,
  icon: PropTypes.node,
  backColor: PropTypes.oneOf([
    'red',
    'blue',
    'violet',
    'green'
  ]),
  cardLike: PropTypes.bool
};

StatsCard.defaultProps = {
  statValue: '0',
  statLabel: 'unknown',
  icon: (<i className="fa fa-check-square-o"></i>),
  backColor: 'blue',
  cardLike: false
};

export default StatsCard;
