import React, { Component } from 'react';
import ResizeSvgFactory from './ResizeSvgFactory';


class EllipseSvg extends Component {
  render() {
    return (
      <ellipse {...this.props} type="ellipse" style={{fill: 'red'}} />
    );
  }
}

export default ResizeSvgFactory(EllipseSvg);