import React, { Component } from 'react';
import ResizeSvgHOC from "./ResizeSvgHOC";


let len = 20;
class ParallelogramSvg extends Component {
  render() {
    let { padding, contentWidth, contentHeight } = this.props;
    let points = `${padding},${contentHeight + padding} 
    ${padding + 20},${padding} 
    ${contentWidth + padding}, ${padding} 
    ${contentWidth + padding - 20},${contentHeight + padding}`;

    return (
      <polygon
        points={points}
        style={{fill: 'blue'}}
			/>
    );
  }
}

export default ResizeSvgHOC(ParallelogramSvg);