# React Resize HOC Components

这是一个React开发的支持Resize和Move的高阶组件。

## example

![](./docs/example.jpg)


## Document

### Custom SVG

```JS
import React, { Component } from "react";
import ResizeSvgHOC from "./ResizeSvgHOC";

class EllipseSvg extends Component {
	render() {
    let { cornerActionTriggerRadius, width, height } = this.props;
		return (
			<ellipse
				cx={width / 2 + cornerActionTriggerRadius}
        cy={height / 2 + cornerActionTriggerRadius}
        rx={width/2}
        ry={height/2}
				style={{ fill: "green" }}
			/>
		);
	}
}

export default ResizeSvgHOC(EllipseSvg);
```

### Box Analysis

![](./docs/Analysis.png)