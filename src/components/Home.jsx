import React, { Fragment } from "react";
import { Header, Sidebar } from "./index";
import "./Home.css";

export function Home() {
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <Header></Header>
        </div>
        <div className="row">
          <div className="col-2 blue">
            <Sidebar></Sidebar>
          </div>
          <div className="col">
            <div className="bg-white"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
