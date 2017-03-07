import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class Chip extends PureComponent {
  render() {
    const { chip } = this.props;
    return (
      <span
        className="chip">
        <span className="chip-value">
          {chip}
        </span>
        <button
          type="button"
          className="chip-delete-button"
          onClick={this.handlesOnClick}>
          x
        </button>
      </span>
    );
  }

  handlesOnClick = (event) => {
    event.preventDefault();
    const { deleteChip, chip } = this.props;
    deleteChip(chip);
  }
}

Chip.propTypes = {
  chip: PropTypes.string,
  deleteChip: PropTypes.func.isRequired
};

export default Chip;
