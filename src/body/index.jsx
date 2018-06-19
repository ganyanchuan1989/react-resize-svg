import React, { Component, PropTypes } from 'react';
import style from './index.css';
import ImgKala from '../imgs/kala.png';

class Body extends Component {
  tEClickHand() {
    const a = null;
    a.a = '';
    this.a = a;
  }

  render() {
    return (
            <div className={style.body}>
                Body
                <img src={ImgKala} alt="" />
                <button onClick={this.tEClickHand}>throw null error</button>
            </div>
    );
  }
}

Body.propTypes = {

};

export default Body;

