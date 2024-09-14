import React, { Fragment } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import "./Home.css";

export function Home() {
  return (
    <Fragment>
      <div className="container-fluid d-flex flex-column vh-100">
        <Header />
        <div className="row flex-grow-1">
          <div className="col-2 blue d-flex flex-column sidebar-container">
            <Sidebar />
          </div>
          <div className="col bg-white">
            <div className="content"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
