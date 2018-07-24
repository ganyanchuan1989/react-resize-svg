import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import style from './App.css';
import ResizeSvg from './components/ResizeSvg';
import RectSvg from './components/RectSvg';
//import EllipseSvg from './components/EllipseSvg';


class App extends Component {
  render() {
    return (
            <div style={{position: 'absolute'}}>
              <h1>dynamicsf add script</h1>
              {/* <div style={{padding: 100}}>
                <ResizeSvg/>
              </div> */}

              <RectSvg />

              {/* <EllipseSvg/> */}
            </div>
    );
  }
}
App.propTypes = {
  // name: PropTypes.string,
};

export default App;
