import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = () => injectGlobal`
  ${reset}
  html {
    font-smoothing: antialiased;
    font-family: sans-serif;
    font-display: auto;
    text-size-adjust: 100%;
  }
  body {
    //font-family: 'Noto Sans', sans-serif;
    font-family: 'IBM Plex Sans',sans-serif;
    font-display: auto;
    //font-family: 'Open Sans', sans-serif;
    background: #EFF3F5;
    background: #F7F7F7;
    color: #2F3941;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  
  ::-webkit-scrollbar {
    width: 7px;
  }
 
  ::-webkit-scrollbar-track {
    background: #efefef;
    opacity: 0.5;
  }
 
 
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 10px;
  }
  /**
  * Rangeslider
  */
  .rangeslider {
    margin: 13px 0;
    position: relative;
    background: #E9EBED;
    -ms-touch-action: none;
    touch-action: none;
  }
  .disabled-slider .rangeslider .rangeslider__handle {
    background: #E9EBED;
    border: 1px solid #E9EBED;
  }
  .disabled-slider .rangeslider-horizontal .rangeslider__fill {
    background: #E9EBED;
  }
  .rangeslider .rangeslider__handle {
    background: #3CBC98;
    border: 1px solid #3CBC98;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.2);
    outline: none;
  }
  .rangeslider .rangeslider__handle .rangeslider__active {
    opacity: 1;
  }
  .rangeslider .rangeslider__handle-tooltip {
    width: 40px;
    height: 40px;
    text-align: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    font-weight: normal;
    font-size: 14px;
    transition: all 100ms ease-in;
    border-radius: 4px;
    display: inline-block;
    color: white;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
  .rangeslider .rangeslider__handle-tooltip span {
    margin-top: 12px;
    display: inline-block;
    line-height: 100%;
  }
  .rangeslider .rangeslider__handle-tooltip:after {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
  }
  /**
    * Rangeslider - Horizontal slider
    */
    .rangeslider-horizontal {
      height: 5px;
      border-radius: 10px;
    }
    .rangeslider-horizontal .rangeslider__fill {
      height: 100%;
      background-color:#3CBC98;
      border-radius: 10px;
      top: 0;
    }
    .rangeslider-horizontal .rangeslider__handle {
      width: 20px;
      height: 20px;
      border-radius: 30px;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .rangeslider-horizontal .rangeslider__handle-tooltip {
      top: -55px;
    }
    .rangeslider-horizontal .rangeslider__handle-tooltip:after {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid rgba(0, 0, 0, 0.8);
      left: 50%;
      bottom: -8px;
      transform: translate3d(-50%, 0, 0);
    }
    /**
    * Rangeslider - Vertical slider
    */
    .rangeslider-vertical {
      margin: 20px auto;
      height: 150px;
      max-width: 10px;
      background-color: transparent;
    }
    .rangeslider-vertical .rangeslider__fill,
    .rangeslider-vertical .rangeslider__handle {
      position: absolute;
    }
    .rangeslider-vertical .rangeslider__fill {
      width: 100%;
      background-color: #7cb342;
      box-shadow: none;
      bottom: 0;
    }
    .rangeslider-vertical .rangeslider__handle {
      width: 30px;
      height: 10px;
      left: -10px;
      box-shadow: none;
    }
    .rangeslider-vertical .rangeslider__handle-tooltip {
      left: -100%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .rangeslider-vertical .rangeslider__handle-tooltip:after {
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid rgba(0, 0, 0, 0.8);
      left: 100%;
      top: 12px;
    }
    /**
    * Rangeslider - Reverse
    */
    .rangeslider-reverse.rangeslider-horizontal .rangeslider__fill {
      right: 0;
    }
    .rangeslider-reverse.rangeslider-vertical .rangeslider__fill {
      top: 0;
      bottom: inherit;
    }
    /**
    * Rangeslider - Labels
    */
    .rangeslider__labels {
      position: relative;
    }
    .rangeslider-vertical .rangeslider__labels {
      position: relative;
      list-style-type: none;
      margin: 0 0 0 24px;
      padding: 0;
      text-align: left;
      width: 250px;
      height: 100%;
      left: 10px;
    }
    .rangeslider-vertical .rangeslider__labels .rangeslider__label-item {
      position: absolute;
      transform: translate3d(0, -50%, 0);
    }
    .rangeslider-vertical .rangeslider__labels .rangeslider__label-item::before {
      content: '';
      width: 10px;
      height: 2px;
      background: black;
      position: absolute;
      left: -14px;
      top: 50%;
      transform: translateY(-50%);
      z-index: -1;
    }
    .rangeslider__labels .rangeslider__label-item {
      position: absolute;
      font-size: 14px;
      cursor: pointer;
      display: inline-block;
      top: 10px;
      transform: translate3d(-50%, 0, 0);
    }
`;

export default GlobalStyles;
