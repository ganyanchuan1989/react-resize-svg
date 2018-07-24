# React Resize HOC Components

this is React Resize HOC Components. Welcome to fork and star.

## example image

![](./docs/example.jpg)


## Document

### Custom SVG Children

```JSX
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

// this HOC Component
export default ResizeSvgHOC(EllipseSvg);
```

### Box Analysis

![](./docs/Analysis.png)

### Custom style or ClassName

```JSX

import style from "./App.css";
import RectSvg from "../src/components/RectSvg";

// ...

<RectSvg width="100" height="100" top="10" left="10" style={{fill: 'red'}} className={style.customClass}/>
```

### SVG Attribute

- Custom SVG Component

```JSX
import React, { Component } from "react";
import ResizeSvgHOC from "./ResizeSvgHOC";

class RectSvg extends Component {
	render() {
		let { padding, contentWidth, contentHeight, ...otherProps} = this.props;
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
```

- Use Custom SVG Component

```JSX
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
```