import React, { Component } from "react";
import ResizeSvgFactory from "./ResizeSvgHOC";

class RectSvg extends Component {
	render() {
    let { cornerActionTriggerRadius, width, height } = this.props;
		return (
			<rect
				x={cornerActionTriggerRadius}
				y={cornerActionTriggerRadius}
        width={width}
				height={height}
				style={{ fill: "red" }}
			/>
		);
	}
}

export default ResizeSvgFactory(RectSvg);
