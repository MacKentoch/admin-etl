import React, {
  PureComponent,
  PropTypes
}                       from 'react';
import update           from 'react-addons-update';
import Chip             from './chip/Chip';
// USAGE  <Chips chips={['react', 'javascript', 'scss']} placeholder="Add a tag..." max="10" />

class Chips extends PureComponent {
  state = {
    chips: [],
    KEY:   {
      backspace: 8,
      tab:       9,
      enter:     13
    },
    // only allow letters, numbers and spaces inbetween words
    INVALID_CHARS: /[^a-zA-Z0-9@.]/g
  };

  componentDidMount() {
    this.setChips(this.props.chips);
  }

  componentWillReceiveProps(nextProps) {
    this.setChips(nextProps.chips);
  }

  render() {
    const { chips } = this.state;
    const { max, placeholder } = this.props;

    const renderedPlaceholder = !max || chips.length < max ? placeholder : '';

    return (
      <div
        className="chips"
        onClick={this.focusInput}>
        {
          chips.map(
            (chip, index) => {
              return (
                <Chip
                  key={index}
                  chip={chip}
                  deleteChip={this.handlesOnChipDelete}
                />
              );
            }
          )
        }
        <input
          type="text"
          className="chips-input"
          placeholder={renderedPlaceholder}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.clearInvalidChars}
        />
      </div>
    );
  }

  setChips = (chips) => {
    if (chips && chips.length) {
      this.setState({ chips });
    }
  }

  onKeyDown = (event) => {
    const keyPressed = event.which;

    if (keyPressed === this.state.KEY.enter ||
        (keyPressed === this.state.KEY.tab && event.target.value)) {
      event.preventDefault();
      this.updateChips(event);
    } else if (keyPressed === this.state.KEY.backspace) {
      const chips = this.state.chips;

      if (!event.target.value && chips.length) {
        this.deleteChip(chips[chips.length - 1]);
      }
    }
  }

  clearInvalidChars = (event) => {
    const value = event.target.value;

    if (this.state.INVALID_CHARS.test(value)) {
      event.target.value = value.replace(this.state.INVALID_CHARS, '');
    } else if (value.length > this.props.maxlength) {
      event.target.value = value.substr(0, this.props.maxlength);
    }
  }

  updateChips = (event) => {
    if (!this.props.max ||
        this.state.chips.length < this.props.max) {
      const value = event.target.value;

      if (!value) {
        return;
      }

      const chip = value.trim().toLowerCase();

      if (chip && this.state.chips.indexOf(chip) < 0) {
        const { onChipsChange } = this.props;
        const updatedChips = update(
          this.state.chips,
          {
            $push: [chip]
          }
        );
        this.setState({
          chips: updatedChips
        });
        if (onChipsChange) {
          onChipsChange(updatedChips);
        }
      }
    }
    event.target.value = '';
  }

  deleteChip = (chip) => {
    const { onChipsChange } = this.props;
    const index = this.state.chips.indexOf(chip);

    if (index >= 0) {
      const updatedChips = update(
        this.state.chips,
        {
          $splice: [[index, 1]]
        }
      );
      this.setState({
        chips: updatedChips
      });
      if (onChipsChange) {
        onChipsChange(updatedChips);
      }
    }
  }

  focusInput = (event) => {
    const children = event.target.children;

    if (children.length) {
      children[children.length - 1].focus();
    }
  }

  handlesOnChipDelete = (chip) => {
    this.deleteChip(chip);
  }
}

Chips.propTypes = {
  chips: PropTypes.array,
  onChipsChange: PropTypes.func,
  max:   PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  maxlength: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  placeholder: PropTypes.string
};

Chips.defaultProps = {
  placeholder: 'Ajouter...',
  maxlength:   50
};

export default Chips;
