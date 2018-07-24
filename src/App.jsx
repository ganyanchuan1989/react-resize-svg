import React, { Component } from "react";
// import PropTypes from 'prop-types';
import style from "./App.css";
import ResizeSvg from "./components/ResizeSvg";
import RectSvg from "./components/RectSvg";
import EllipseSvg from "./components/EllipseSvg";

import DiamondSvg from "./components/DiamondSvg";

class App extends Component {
	render() {
		return (
			<div>
				<h1>SVG topographic</h1>
				<div id="container" style={{ position: "absolute" }}>
					{/* 采用绝对布局方式 */}
					<RectSvg width="200" height="150" top="10" left="10" />
					<EllipseSvg width="200" height="150" top="200" left="300" />
          <DiamondSvg width="200" height="150" top="100" left="300" />
				</div>
			</div>
		);
	}
}
App.propTypes = {
	// name: PropTypes.string,
};

export default App;
