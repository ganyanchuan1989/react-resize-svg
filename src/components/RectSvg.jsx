import React, { Component } from "react";
import ResizeSvgHOC from "./ResizeSvgHOC";

class RectSvg extends Component {
	render() {
		// style 从外部传入
		let { padding, contentWidth, contentHeight, ...otherProps} = this.props;
		// console.log('className', className);
		return (
			<rect
				{...otherProps}
				x={padding}
				y={padding}
        width={contentWidth}
				height={contentHeight}
			/>
		);
	}
}

export default ResizeSvgHOC(RectSvg);
