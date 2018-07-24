import React, { Component } from 'react';
import ResizeSvgFactory from "./ResizeSvgHOC";

class TriangleSvg extends Component {
  render() {
    let { cornerActionTriggerRadius, width, height } = this.props;

    let points = `${cornerActionTriggerRadius},${height + cornerActionTriggerRadius} 
      ${width / 2 + cornerActionTriggerRadius},${cornerActionTriggerRadius} 
      ${width + cornerActionTriggerRadius}, ${height + cornerActionTriggerRadius} `;

    return (
      <polygon
        points={points}
        style={{fill: 'blue'}}
			/>
    );
  }
}

export default ResizeSvgFactory(TriangleSvg);