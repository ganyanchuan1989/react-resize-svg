import React, { Component } from "react";
import ResizeSvgHOC from "./ResizeSvgHOC";

class DiamondSvg extends Component {
	render() {
		let { padding, contentWidth, contentHeight } = this.props;
    let points = `${padding},${contentHeight / 2 +padding} 
    ${contentWidth / 2 + padding},${padding} 
    ${contentWidth+padding}, ${contentHeight / 2 + padding} 
    ${contentWidth / 2 + padding},${contentHeight + padding}`;
    
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
