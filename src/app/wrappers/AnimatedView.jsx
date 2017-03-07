import React, { Component, PropTypes } from 'react';
import cx                              from 'classnames';

const ANIM_DELAY = 500;

class  AnimatedView extends Component {
  state = {
    animated:   true,
    viewEnters: false
  };

  componentDidMount() {
    this.enterAnimationTimer = setTimeout(
      () => this.setState({ viewEnters: true }),
      ANIM_DELAY
    );
  }

  componentWillUnmount() {
    clearTimeout(this.enterAnimationTimer);
  }

  render() {
    const { animated, viewEnters } =this.state;
    const { children } = this.props;

    return (
      <section
        className={
          cx({
            'content':       true,
            'animatedViews': animated,
            'invisible':      !viewEnters,
            'view-enter':     viewEnters
          })
        }>
        { children }
      </section>
    );
  }
}

AnimatedView.propTypes = {
  children: PropTypes.node.isRequired,
  isAnimated: PropTypes.bool
};

AnimatedView.defaultProps = {
  isAnimated: true
};

export default AnimatedView;
