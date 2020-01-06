import React from "react";
import { Link} from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className="mu-div-home">
        <div className="text-center my-auto">
          <h1 className="">Time to show who you are</h1>
          <Link exact to="/signup"  type="primary" className="sing-button ">
            Signin
          </Link>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row mu-div-row2">
          <div className="col-12 col-md-7 text-white text-center my-auto">
            <h3 className="text-white">It’s not whether you get knocked down,</h3>
            <br />
            <h3 className="text-white">it’s whether you get up</h3>
            <p>Vince Lombardi</p>
          </div>
          <div className="col-12 col-md-5 text-center my-auto py-5">
            <img src="../images/home2.png" alt="" className="" />
          </div>
        </div>
        <div className="row mu-div-row1">
          <div className="col-6 col-md-3 p-0">
            <img src="../images/home3.jpg" alt="" className="w-100 p-0" />
          </div>
          <div className="col-6 col-md-3 p-0">

            <img src="../images/home4.jpg" alt="" className="w-100 p-0" />
          </div>
          <div className="col-6 col-md-3 p-0">

            <img src="../images/home5.jpg" alt="" className="w-100 p-0" />
          </div>
          <div className="col-6 col-md-3 p-0">

            <img src="../images/home6.jpg" alt="" className="w-100 p-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
