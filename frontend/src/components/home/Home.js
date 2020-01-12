import React from "react";
import { Link} from 'react-router-dom'
import {Row, Col } from "antd";

function Home() {
  return (
    <div>
      <div className="mu-div-home">
        <div >
          <h1 >Time to show who you are</h1>
          <Link exact to="/signup"  type="primary" className="sing-button ">
            Signin
          </Link>
        </div>
      </div>
      <div >
        <div className="fondoGris texto-blanco" >
          <div>
            <h3 >It’s not whether you get knocked down,</h3>
            <br />
            <h3 >it’s whether you get up</h3>
            <p>Vince Lombardi</p>
          </div>
          <div >
            <img src="../images/home2.png" alt=""/>
          </div>
        </div>
        <div >
        <Row type="flex" >
  <Col  sm={12} md={6} >
  <img src="../images/home3.jpg" alt="" className="home-img" />
  
  </Col>
  <Col  sm={12} md={6} >
  <img src="../images/home4.jpg" alt="" className="home-img" />
  </Col>
  <Col  sm={12} md={6} >
  
  <img src="../images/home5.jpg" alt="" className="home-img" />
  </Col>
  <Col  sm={12} md={6} >
  <img src="../images/home6.jpg" alt="" className="home-img" />
  </Col>
</Row>
 
        </div>
      </div>
    </div>
  );
}

export default Home;
