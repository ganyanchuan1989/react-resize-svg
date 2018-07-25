import ResizeSvg from './ResizeSvg';
import React, { Component } from "react";

export default function ResizeSvgHOC(WrapperComponent){

  return class ResizeFactory extends Component{
    render(){
      return (
        <ResizeSvg {...this.props}>
          <WrapperComponent/>
        </ResizeSvg>
      )
    }
  }
}