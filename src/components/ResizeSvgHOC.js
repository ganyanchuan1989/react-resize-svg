import ResizeSvg from './ResizeSvg';
import React, { Component } from "react";
import { parse } from 'path';
import RectSvg from './RectSvg';

export default function ResizeSvgHOC(WrapperComponent){

  return class ResizeFactory extends Component{
    render(){
      return (
        <ResizeSvg {...this.props}>
          <WrapperComponent {...this.props} />
        </ResizeSvg>
      )
    }
  }
}