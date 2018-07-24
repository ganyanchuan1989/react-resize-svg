import React, { Component } from "react";
// import PropTypes from 'prop-types';
import style from "./App.css";
import ResizeSvg from "./components/ResizeSvg";
import RectSvg from "./components/RectSvg";
import EllipseSvg from "./components/EllipseSvg";
import DiamondSvg from "./components/DiamondSvg";
import TriangleSvg from './components/TriangleSvg';
import ParallelogramSvg from './components/ParallelogramSvg';

class App extends Component {
	render() {
		return (
			<div>
				<h1>SVG topographic</h1>
				<div id="container" style={{ position: "absolute" }}>
					{/* 采用绝对布局方式 */}
					<RectSvg width="100" height="100" top="10" left="10" style={{fill: 'red'}} className={style.customClass}/>
					<EllipseSvg width="100" height="80" top="10" left="130" />
          <DiamondSvg width="100" height="100" top="10" left="250" />
          <TriangleSvg width="100" height="100" top="10" left="400" />
					<ParallelogramSvg width="100" height="100" top="10" left="550"/>
				</div>
			</div>
		);
	}
}
App.propTypes = {
	// name: PropTypes.string,
};

export default App;
