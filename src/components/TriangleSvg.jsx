import React, { Component } from 'react';
import ResizeSvgHOC from "./ResizeSvgHOC";

class TriangleSvg extends Component {
  render() {
    let { padding, contentWidth, contentHeight } = this.props;

    let points = `${padding},${contentHeight + padding} 
      ${contentWidth / 2 + padding},${padding} 
      ${contentWidth + padding}, ${contentHeight + padding} `;

    return (
      <polygon
        points={points}
        style={{fill: 'blue'}}
			/>
    );
  }
}

export default ResizeSvgHOC(TriangleSvg);