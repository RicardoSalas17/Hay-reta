import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import * as serviceWorker from "./serviceWorker";
import MyProvider from "./context";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";


ReactDOM.render( 
   <MyProvider>
    <Router />
  </MyProvider>, document.getElementById('root'));

serviceWorker.unregister();
