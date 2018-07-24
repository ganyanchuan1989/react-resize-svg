import React, { Component } from "react";
import ResizeSvgFactory from "./ResizeSvgHOC";

class EllipseSvg extends Component {
	render() {
    let { cornerActionTriggerRadius, width, height } = this.props;
		return (
			<ellipse
				cx={width / 2 + cornerActionTriggerRadius}
        cy={height / 2 + cornerActionTriggerRadius}
        rx={width/2}
        ry={height/2}
				style={{ fill: "green" }}
			/>
		);
	}
}

export default ResizeSvgFactory(EllipseSvg);
