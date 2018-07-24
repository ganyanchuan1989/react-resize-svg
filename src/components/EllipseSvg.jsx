import React, { Component } from "react";
import ResizeSvgHOC from "./ResizeSvgHOC";

class EllipseSvg extends Component {
	render() {
    let { padding, contentWidth, contentHeight } = this.props;
		return (
			<ellipse
				cx={contentWidth / 2 + padding}
        cy={contentHeight / 2 + padding}
        rx={contentWidth/2}
        ry={contentHeight/2}
				style={{ fill: "green" }}
			/>
		);
	}
}

export default ResizeSvgHOC(EllipseSvg);
