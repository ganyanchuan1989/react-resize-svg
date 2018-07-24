import React, { Component } from "react";
import ResizeSvgHOC from "./ResizeSvgHOC";

class DiamondSvg extends Component {
	render() {
		let { cornerActionTriggerRadius, width, height } = this.props;
    let points = `${cornerActionTriggerRadius},${height / 2 +cornerActionTriggerRadius} 
    ${width / 2 + cornerActionTriggerRadius},${cornerActionTriggerRadius} 
    ${width+cornerActionTriggerRadius}, ${height / 2 + cornerActionTriggerRadius} 
    ${width / 2 + cornerActionTriggerRadius},${height + cornerActionTriggerRadius}`;
    
    // console.log(points);
		return (
			<polygon
        points={points}
        style={{fill: 'blue'}}
			/>
		);
	}
}

export default ResizeSvgHOC(DiamondSvg);
