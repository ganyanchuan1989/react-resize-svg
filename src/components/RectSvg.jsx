import React, { Component } from "react";
import ResizeSvgFactory from "./ResizeSvgHOC";



class RectSvg extends Component {
	render() {
		// style 从外部传入
		let { cornerActionTriggerRadius, width, height, style,className } = this.props;
		// console.log('className', className);
		return (
			<rect
				x={cornerActionTriggerRadius}
				y={cornerActionTriggerRadius}
				rx="20" 
				ry="20"
        width={width}
				height={height}
				style={style}
				className={className}
			/>
		);
	}
}

export default ResizeSvgFactory(RectSvg);
