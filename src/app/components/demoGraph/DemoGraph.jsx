import React, { Component, PropTypes } from 'react';
import Chart from 'chart.js';

const GRAPH_WIDTH = '400px';

class DemoGraph extends Component {
  componentDidMount() {
    const { labels, datasets } = this.props;
    this.drawChart({labels, datasets});
  }

  componentWillReceiveProps(newProps) {
    const { labels, datasets } = this.props;

    if ((newProps.labels.length > 0 && newProps.datasets.length > 0) &&
        (labels.length === 0 && datasets.length === 0)) {
      this.drawChart({
        labels: newProps.labels,
        datasets: newProps.datasets
      });
    }
  }

  render() {
    return (
      <div
        style={{
          position: 'relative',
          margin: '0 auto',
          width: GRAPH_WIDTH,
          backgroundColor: '#F1F2F3'
        }}>
        <canvas
          ref={ (ref) => (this.linechart = ref) }
          id="linechart"
          width={GRAPH_WIDTH}
          height="330" >
        </canvas>
      </div>
    );
  }

  drawChart(data) {
    // BAR CHART
    const options = {
      responsive : true,
      maintainAspectRatio: true
    };

    this.chart = new Chart(this.linechart.getContext('2d'), {
      type: 'line',
      data,
      options
    });
  }
}

DemoGraph.propTypes = {
  labels: PropTypes.array,
  datasets: PropTypes.array
};

export default DemoGraph;
