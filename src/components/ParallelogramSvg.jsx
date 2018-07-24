import React, { Component } from 'react';
import ResizeSvgHOC from "./ResizeSvgHOC";


let len = 20;
class ParallelogramSvg extends Component {
  render() {
    let { cornerActionTriggerRadius, width, height } = this.props;
    let points = `${cornerActionTriggerRadius},${height + cornerActionTriggerRadius} 
    ${cornerActionTriggerRadius + 20},${cornerActionTriggerRadius} 
    ${width + cornerActionTriggerRadius}, ${cornerActionTriggerRadius} 
    ${width + cornerActionTriggerRadius - 20},${height + cornerActionTriggerRadius}`;

    return (
      <polygon
        points={points}
        style={{fill: 'blue'}}
			/>
    );
  }
}

export default ResizeSvgHOC(ParallelogramSvg);