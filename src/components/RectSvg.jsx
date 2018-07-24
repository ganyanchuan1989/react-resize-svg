import React, { Component } from "react";
import ResizeSvgHOC from "./ResizeSvgHOC";



class RectSvg extends Component {
	render() {
		// style 从外部传入
		let { padding, contentWidth, contentHeight, style,className } = this.props;
		// console.log('className', className);
		return (
			<rect
				x={padding}
				y={padding}
				rx="20" 
				ry="20"
        width={contentWidth}
				height={contentHeight}
				style={style}
				className={className}
			/>
		);
	}
}

export default ResizeSvgHOC(RectSvg);
