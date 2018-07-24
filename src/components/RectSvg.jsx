import React, { Component } from 'react';
import ResizeSvgFactory from './ResizeSvgHOC';


class RectSvg extends Component {
  render() {
    return (
      <rect {...this.props} style={{fill: 'red'}}/>
    );
  }
}

export default ResizeSvgFactory(RectSvg);