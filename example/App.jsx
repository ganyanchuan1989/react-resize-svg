import React, { Component } from "react";
import style from "./App.css";

import {ResizeSvg, EllipseSvg, DiamondSvg, TriangleSvg, ParallelogramSvg, RectSvg} from "react-resize-svg";

class App extends Component {
	render() {
		return (
			<div className={style.container}>
				<h1>React SVG HOC Components</h1>
				<div style={{ position: "absolute" }}>
					{/* 采用绝对布局方式 */}
					<RectSvg
						width="100"
						height="100"
						top="10"
						left="10"
						style={{ fill: "red" }}
						className={style.customClass}
					/>
					<RectSvg
						width="100"
						height="100"
						top="110"
						left="10"
						style={{ fill: "red" }}
						className={style.customClass}
						rx="20"
						ry="20"
					/>
					<EllipseSvg width="100" height="80" top="10" left="130" />
					<DiamondSvg width="100" height="100" top="10" left="250" />
					<TriangleSvg width="100" height="100" top="10" left="400" />
					<ParallelogramSvg
						width="100"
						height="100"
						top="10"
						left="550"
						showCircleStyle={style.customShowCircle}
					/>
				</div>
			</div>
		);
	}
}
export default App;
