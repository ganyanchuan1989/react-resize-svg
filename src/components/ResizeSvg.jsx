import classnames from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import injectStyle from './injectCss';

let ActionType = {
	None: 0,
	LeftResize: 1,
	TopResize: 2,
	RightResize: 3,
	BottomResize: 4,
	TopLeftResize: 5,
	BottomLeftResize: 6,
	TopRightResize: 7,
	BottomRightResize: 8,
	Move: 9
};

injectStyle();

class ResizeSvg extends Component {
	constructor(props) {
		super();

		let { width, height,top, left } = props;
		width = parseInt(width);
		height = parseInt(height);
		top = parseInt(top);
		left = parseInt(left);
		
		this.state = {
			padding: 8, // padding
			style: {
				left: left || 0,
				top: top || 0,
				w: width || 100,
				h: height || 100,
				width: `${width || 100}px`,
				height: `${height || 100}px`
			}
		};
		this.currentAction = ActionType.None;

		this.lastMouseX = 0;
		this.lastMouseY = 0;
		window.addEventListener("mouseup", this.mouseUpHandler.bind(this));
		window.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
	}

	mouseUpHandler(e) {
		this.currentAction = ActionType.None;
	}

	mouseMoveHandler(e) {
		let currMouseX = event.clientX;
		let currMouseY = event.clientY;

		let deltaX = currMouseX - this.lastMouseX;
		let deltaY = currMouseY - this.lastMouseY;

		this.applyMouseMoveAction(deltaX, deltaY);

		this.lastMouseX = event.pageX;
		this.lastMouseY = event.pageY;
	}

	mouseDownHandler(actionType) {
		this.currentAction = actionType;
	}

	applyMouseMoveAction(deltaX, deltaY) {
		let deltaTop = 0;
		let deltaLeft = 0;
		let deltaWidth = 0;
		let deltaHeight = 0;

		let currentAction = this.currentAction;
		if (
			currentAction == ActionType.RightResize ||
			currentAction == ActionType.TopRightResize ||
			currentAction == ActionType.BottomRightResize
		) {
			deltaWidth = deltaX;
		}

		if (
			currentAction == ActionType.LeftResize ||
			currentAction == ActionType.TopLeftResize ||
			currentAction == ActionType.BottomLeftResize
		) {
			deltaWidth = -deltaX;
			deltaLeft = deltaX;
		}

		if (
			currentAction == ActionType.BottomResize ||
			currentAction == ActionType.BottomLeftResize ||
			currentAction == ActionType.BottomRightResize
		) {
			deltaHeight = deltaY;
		}

		if (
			currentAction == ActionType.TopResize ||
			currentAction == ActionType.TopLeftResize ||
			currentAction == ActionType.TopRightResize
		) {
			deltaHeight = -deltaY;
			deltaTop = deltaY;
		}

		if (this.currentAction == ActionType.Move) {
			deltaLeft = deltaX;
			deltaTop = deltaY;
		}

		this.updatePosition(deltaLeft, deltaTop);
		this.updateSize(deltaWidth, deltaHeight);
	}

	updatePosition(deltaLeft, deltaTop) {
		let { style } = this.state;
		let { left, top } = style;

		let newStyle = Object.assign({}, style, {
			left: left + deltaLeft,
			top: top + deltaTop
		});
		this.setState({ style: newStyle });
	}

	updateSize(deltaWidth, deltaHeight) {
		let { padding, style } = this.state;
		let { w, h } = style;

		let newWidth = w + deltaWidth;
		let newHeight = h + deltaHeight;

		// Don't allow a too small size.
		let minumalSize = padding * 2;
		if (newWidth < minumalSize) {
			newWidth = minumalSize;
		}
		if (newHeight < minumalSize) {
			newHeight = minumalSize;
		}

		let newStyle = Object.assign({}, style, {
			w: newWidth,
			h: newHeight,
			width: `${newWidth}px`,
			height: `${newHeight}px`
		});

		this.setState({ style: newStyle });
	}
  
	render() {
		let { padding, style } = this.state;
		let { w, h } = style;
		let {
			width, 
			height, 
			top, 
			left, 
			children, 
			// custom classname
			svgContainerStyle,
			showLineStyle,
			showCircleStyle,
			triggerLineStyle,
			triggerCircleStyle,
			triggerMoveRectStyle,
			...otherProps
		} = this.props; 
		
		const childrenWithProps =
			children &&
			React.Children.map(children, child => {
				return React.cloneElement(child, {
					padding,
					contentWidth: w - padding*2,
					contentHeight: h - padding*2,
					width: w,
					height: h,
					...otherProps
				});
		});
		
		return (
			<svg
				className={classnames("resize-svg-svg-container", svgContainerStyle)}
				style={this.state.style}
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
			>
				{childrenWithProps}
				{/* 四条显示的边框：虚线 */}
				<g id="gShowLine" className={classnames("resize-svg-show-line", showLineStyle)}>
					<line
						x1={padding}
						y1={padding}
						x2={`${w - padding}px`}
						y2={padding}
					/>
					<line
						x1={`${w - padding}px`}
						y1={padding}
						x2={`${w - padding}px`}
						y2={`${h - padding}px`}
					/>
					<line
						x1={`${w - padding}px`}
						y1={`${h - padding}px`}
						x2={padding}
						y2={`${h - padding}px`}
					/>
					<line
						x1={padding}
						y1={`${h - padding}px`}
						x2={padding}
						y2={padding}
					/>
				</g>
				<g id="gShowCircle" className={classnames("resize-svg-show-circle", showCircleStyle)}>
					<circle
						cx={padding}
						cy={padding}
						r={padding / 2}
					/>
					<circle
						cx={`${w - padding}px`}
						cy={padding}
						r={padding / 2}
					/>
					<circle
						cx={`${w - padding}px`}
						cy={`${h - padding}px`}
						r={padding / 2}
					/>
					<circle
						cx={padding}
						cy={`${h - padding}px`}
						r={padding / 2}
					/>
				</g>

				<g id="gMoveRect">
					<rect
						x={padding}
						y={padding}
						width={`${w - padding * 2}px`}
						height={`${h - padding * 2}px`}
						className={classnames("resize-svg-trigger-move-rect", triggerMoveRectStyle)}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.Move);
						}}
					/>
				</g>

				<g id="gActionLine">
					<line
						x1={padding}
						y1={padding}
						x2={`${w - padding}px`}
						y2={padding}
						style={{ cursor: "n-resize" }}
						className={classnames("resize-svg-trigger-line", triggerLineStyle)}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.TopResize);
						}}
					/>
					<line
						x1={`${w - padding}px`}
						y1={padding}
						x2={`${w - padding}px`}
						y2={`${h - padding}px`}
						style={{ cursor: "e-resize" }}
						className={classnames("resize-svg-trigger-line", triggerLineStyle)}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.RightResize);
						}}
					/>
					<line
						x1={`${w - padding}px`}
						y1={`${h - padding}px`}
						x2={padding}
						y2={`${h - padding}px`}
						style={{ cursor: "s-resize" }}
						className={classnames("resize-svg-trigger-line", triggerLineStyle)}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.BottomResize);
						}}
					/>
					<line
						x1={padding}
						y1={`${h - padding}px`}
						x2={padding}
						y2={padding}
						style={{ cursor: "w-resize" }}
						className={classnames("resize-svg-trigger-line", triggerLineStyle)}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.LeftResize);
						}}
					/>
				</g>

				<g id="gActionCircle" >
					<circle
						cx={padding}
						cy={padding}
						r={padding}
						style={{ cursor: "nw-resize" }}
						className={classnames("resize-svg-trigger-circle", triggerCircleStyle)}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.TopLeftResize);
						}}
					/>
					<circle
						cx={`${w - padding}px`}
						cy={padding}
						r={padding}
						style={{ cursor: "ne-resize" }}
						className={classnames("resize-svg-trigger-circle", triggerCircleStyle)}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.TopRightResize);
						}}
					/>
					<circle
						cx={`${w - padding}px`}
						cy={`${h - padding}px`}
						r={padding}
						style={{ cursor: "se-resize" }}
						className={classnames("resize-svg-trigger-circle", triggerCircleStyle)}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.BottomRightResize);
						}}
					/>
					<circle
						cx={padding}
						cy={`${h - padding}px`}
						r={padding}
						style={{ cursor: "sw-resize" }}
						className={classnames("resize-svg-trigger-circle", triggerCircleStyle)}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.BottomLeftResize);
						}}
					/>
				</g>
			</svg>
		);
	}
}

ResizeSvg.propTypes = {
	// width: PropTypes.number,
	// height: PropTypes.number,
};

ResizeSvg.defaultProps={
	// width: 100,
	// height: 100,
	// padding: 8
}

export default ResizeSvg;
