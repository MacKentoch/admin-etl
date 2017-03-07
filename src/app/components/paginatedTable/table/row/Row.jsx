import React, {
  PureComponent,
  PropTypes
}                     from 'react';

const DEFAULT_ROW_WIDTH_PX = 110;

class Row extends PureComponent {
  render() {
    const { row: { id, columns } } = this.props;

    return (
      <tr
        id={id || 'notDefined'}
        style={{cursor: 'pointer'}}
        onClick={this.handlesOnRowClick}>
        {
          columns.map(
            ({ width, value }, colIdx) => (
              <td
                key={colIdx}
                style={{ verticalAlign: 'middle' }}>
                {value}
              </td>
            )
          )
        }
      </tr>
    );
  }

  handlesOnRowClick = (event) => {
    event.preventDefault();
    const { onRowClick, row: { ...rowProps } } = this.props;
    onRowClick({ ...rowProps });
  }
}

Row.propTypes = {
  row:  PropTypes.shape({
    id: PropTypes.number.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        width: PropTypes.number,
        value: PropTypes.any.isRequired
      }).isRequired
    ).isRequired
  }),
  onRowClick: PropTypes.func.isRequired
};

export default Row;
