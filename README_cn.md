# React Resize HOC Components

基于React实现的可以拖拽和缩放的SVG组件库，组件库核心两个组件：`ResizeSvg`和`ResizeSvgHOC`。其中`ResizeSvgHOC`是高级组件，作用是实现组件包装和Props传递。

[README_EN](./README_en.md)

# 效果图

![](./docs/example.jpg)


# Document

## ResizeSvg & ResizeSvgHOC

### Resize SVG 盒子模型分析

ResizeSvg 如下图显示，分为两块部分：操作区域（ResizeWidth）和显示区域（ContentWidth）。其中`padding`也是可操作点（四角的圆点）的直径（强调：是直径），默认值：`8`

![](./docs/Analysis.png)

### 属性 API
| Attribute Name | type |Description |
|--|--|--|
|padding|number| 间距 默认值：`8`|
|width|number| 宽度，必须是数值。单位：px。但是不支持：`100px`方式设置|
|height|number| 宽度，必须是数值。单位：px。但是不支持：`100px`方式设置|

### 样式 API
|ClassName Attribute|Description|
|--|--|
|svgContainerStyle|svg tag style|
|showLineStyle|show line style (default dasharray)|
|showCircleStyle|show circle style |
|triggerLineStyle|trigger line style |
|triggerCircleStyle|trigger circle style|
|triggerMoveRectStyle| trigger move rect style|

### 注入的 Props

通过`ResizeSvgHOC`包含后的子组件，将会自动注入一下`Props`

|Prop Name|type|Description|
|--|--|--|
|padding|number| padding|
|width|number| SVG 真实宽度 |
|height|number|SVG 真实高度|
|contentWidth|number| 可显示区域内容宽度|
|contentWidth|number| 可显示区域内容高度|

### 使用

- npm 安装

```
npm install react-resize-svg

```

- 开发组件

基于`ResizeSvgHOC` 开发一个自定义的图形组件。例如：

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
// 注意HOC方式导出
export default ResizeSvgHOC(EllipseSvg);
```

使用`ResizeSvgHOC`导出组件后，会新增三个props:`padding`,`contentWidth`和`contentHeight` 方便计算和使用。（上面文章的：Resize SVG 盒子模型分析）


> 不能直接使用 `ResizeSvg` 然后加入 `svg`的子标签方式（eg: `<rect/>`, `<path/>` `<ellipse/>`）。


- 自定义属性（含样式属性`style` , `className`）

	- 自定义组件内部定义模式

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
		export default ResizeSvgHOC(EllipseSvg);
		```

	- 自定义组件传参模式
		```
		<RectSvg
			width="100"
			height="100"
			top="10"
			left="10"
			rx="20"
			ry="20"
			style={{ fill: "red" }}
			className={style.customClass}
		/>
		```

## Q&A

- 加载ResizeSvg图形的外部容器，`position`必须是`absolute`

	图形的缩放会影响所在图层的大小，如果采用默认布局，缩放图形的时候，会影响整体文档流，从而影响其他图形的位置。

	```JSX
	// container position absolute
	<div style={{ position: "absolute" }}>
		<RectSvg
			width="100"
			height="100"
			top="10"
			left="10"
			style={{ fill: "red" }}
			className={style.customClass}
		/>
	</div>
	```


## 开发调试

- 开发

```
git clone 

npm i 

npm run start
```

- 发布

```
npm run build
```

![](./docs/analyzer.jpg)


