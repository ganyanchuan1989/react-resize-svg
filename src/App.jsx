import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import style from './App.css';

class App extends Component {
  dynamicImport(e, type) {
    import(`./${type}/index` /* webpackChunkName: ${type}*/).then((foo) => {
      console.log(foo);
      this.foo = foo;
      this.forceUpdate();
    });
  }
  render() {
    return (
            <div className={style.main}>
              <h1>dynamicsf add script</h1>
                <div>
                  <button onClick={e => this.dynamicImport(e, 'header')}>addHeader</button>
                  <button onClick={e => this.dynamicImport(e, 'body')}>addBody</button>
                  <button onClick={e => this.dynamicImport(e, 'footer')}>addFooter</button>
                </div>
                {this.foo ? <this.foo.default /> : null}
            </div>
    );
  }
}
App.propTypes = {
  // name: PropTypes.string,
};

export default App;
