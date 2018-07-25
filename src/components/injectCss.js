export default function injectStyle(){
  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
  .resize-svg-svg-container{
    left: 0;
    top: 0;
    position: relative;
    position: absolute;
  }
  .resize-svg-show-line{
    stroke: red;
    stroke-dasharray: 5,5;
    stroke-width: 1;
  }
  .resize-svg-show-circle{
    /* stroke="#0000FF" stroke-width="1" fill="#CCCCFF" class="topLeftDrawing"  */
    stroke: #0000ff;
    stroke-width: 1;
    fill: #ccccff;
    opacity: 1;
  }

  .resize-svg-trigger-line {
    stroke: red;
    stroke-width: 5;
    transition: opacity 0.5s;
    opacity: 0;
  }

  .resize-svg-trigger-line:hover{
    transition: opacity 0.3s;
    opacity: 0.3;
  }

  .resize-svg-trigger-circle{
    stroke-width: 0;
    fill: #000;
    fill-opacity: 0.5;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .resize-svg-trigger-circle:hover{
    opacity: 0.5;
    transition: opacity 0.3s;
  }

  .resize-svg-trigger-move-rect{
    stroke-width: 0;
    fill: #000;
    fill-opacity: 0.5;
    opacity: 0;
    transition: opacity 0.5s;
  }
  .resize-svg-trigger-move-rect:hover{
    cursor: move;
    opacity: 0.3;
    transition: opacity 0.3s;
  }
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
}