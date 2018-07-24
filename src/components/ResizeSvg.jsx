import classnames from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Style from "./index.css";

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

class ResizeSvg extends Component {
	constructor(props) {
		super();

		let { width, height,top, left } = props;
		width = parseInt(width);
		height = parseInt(height);
		top = parseInt(top);
		left = parseInt(left);
		
		this.state = {
			cornerActionTriggerRadius: 8, // 拖拽缩放大圆直径
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
		if (this.currentAction == ActionType.BottomResize) {
			console.log(this.currentAction == ActionType.BottomResize);
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
		let { cornerActionTriggerRadius, style } = this.state;
		let { w, h } = style;

		let newWidth = w + deltaWidth;
		let newHeight = h + deltaHeight;

		// Don't allow a too small size.
		let minumalSize = cornerActionTriggerRadius * 2;
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
		let actionLineClass = classnames(Style.actionTrigger, Style.actionLine);
		let { cornerActionTriggerRadius, style } = this.state;
		let { w, h } = style;

		let { children } = this.props;
		const childrenWithProps =
			children &&
			React.Children.map(children, child => {
				return React.cloneElement(child, {
					cornerActionTriggerRadius,
					width: w - cornerActionTriggerRadius*2,
					height: h - cornerActionTriggerRadius*2,
				});
		});
		return (
			<svg
				className={Style.svgContainer}
				style={this.state.style}
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
			>
				{childrenWithProps}
				{/* 四条显示的边框：虚线 */}
				<g id="gShowLine" className={Style.showLine}>
					<line
						x1={cornerActionTriggerRadius}
						y1={cornerActionTriggerRadius}
						x2={`${w - cornerActionTriggerRadius}px`}
						y2={cornerActionTriggerRadius}
					/>
					<line
						x1={`${w - cornerActionTriggerRadius}px`}
						y1={cornerActionTriggerRadius}
						x2={`${w - cornerActionTriggerRadius}px`}
						y2={`${h - cornerActionTriggerRadius}px`}
					/>
					<line
						x1={`${w - cornerActionTriggerRadius}px`}
						y1={`${h - cornerActionTriggerRadius}px`}
						x2={cornerActionTriggerRadius}
						y2={`${h - cornerActionTriggerRadius}px`}
					/>
					<line
						x1={cornerActionTriggerRadius}
						y1={`${h - cornerActionTriggerRadius}px`}
						x2={cornerActionTriggerRadius}
						y2={cornerActionTriggerRadius}
					/>
				</g>
				<g id="gShowCircle" className={Style.showCircle}>
					<circle
						cx={cornerActionTriggerRadius}
						cy={cornerActionTriggerRadius}
						r={cornerActionTriggerRadius / 2}
					/>
					<circle
						cx={`${w - cornerActionTriggerRadius}px`}
						cy={cornerActionTriggerRadius}
						r={cornerActionTriggerRadius / 2}
					/>
					<circle
						cx={`${w - cornerActionTriggerRadius}px`}
						cy={`${h - cornerActionTriggerRadius}px`}
						r={cornerActionTriggerRadius / 2}
					/>
					<circle
						cx={cornerActionTriggerRadius}
						cy={`${h - cornerActionTriggerRadius}px`}
						r={cornerActionTriggerRadius / 2}
					/>
				</g>

				<g id="gMoveRect">
					<rect
						x={cornerActionTriggerRadius}
						y={cornerActionTriggerRadius}
						width={`${w - cornerActionTriggerRadius * 2}px`}
						height={`${h - cornerActionTriggerRadius * 2}px`}
						className={Style.moveRect}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.Move);
						}}
					/>
				</g>

				<g id="gActionLine">
					<line
						x1={cornerActionTriggerRadius}
						y1={cornerActionTriggerRadius}
						x2={`${w - cornerActionTriggerRadius}px`}
						y2={cornerActionTriggerRadius}
						style={{ cursor: "n-resize" }}
						className={Style.actionLine}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.TopResize);
						}}
					/>
					<line
						x1={`${w - cornerActionTriggerRadius}px`}
						y1={cornerActionTriggerRadius}
						x2={`${w - cornerActionTriggerRadius}px`}
						y2={`${h - cornerActionTriggerRadius}px`}
						style={{ cursor: "e-resize" }}
						className={Style.actionLine}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.RightResize);
						}}
					/>
					<line
						x1={`${w - cornerActionTriggerRadius}px`}
						y1={`${h - cornerActionTriggerRadius}px`}
						x2={cornerActionTriggerRadius}
						y2={`${h - cornerActionTriggerRadius}px`}
						style={{ cursor: "s-resize" }}
						className={Style.actionLine}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.BottomResize);
						}}
					/>
					<line
						x1={cornerActionTriggerRadius}
						y1={`${h - cornerActionTriggerRadius}px`}
						x2={cornerActionTriggerRadius}
						y2={cornerActionTriggerRadius}
						style={{ cursor: "w-resize" }}
						className={Style.actionLine}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.LeftResize);
						}}
					/>
				</g>

				<g id="gActionCircle" className={Style.actionCircle}>
					<circle
						cx={cornerActionTriggerRadius}
						cy={cornerActionTriggerRadius}
						r={cornerActionTriggerRadius}
						style={{ cursor: "nw-resize" }}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.TopLeftResize);
						}}
					/>
					<circle
						cx={`${w - cornerActionTriggerRadius}px`}
						cy={cornerActionTriggerRadius}
						r={cornerActionTriggerRadius}
						style={{ cursor: "ne-resize" }}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.TopRightResize);
						}}
					/>
					<circle
						cx={`${w - cornerActionTriggerRadius}px`}
						cy={`${h - cornerActionTriggerRadius}px`}
						r={cornerActionTriggerRadius}
						style={{ cursor: "se-resize" }}
						onMouseDown={() => {
							this.mouseDownHandler(ActionType.BottomRightResize);
						}}
					/>
					<circle
						cx={cornerActionTriggerRadius}
						cy={`${h - cornerActionTriggerRadius}px`}
						r={cornerActionTriggerRadius}
						style={{ cursor: "sw-resize" }}
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
	// width: PropTypes.number.isRequired,
	// height: PropTypes.number.isRequired,
};

export default ResizeSvg;
