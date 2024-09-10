import React, { Fragment } from "react";
import { Header, Sidebar } from "./index";
import "./Home.css";

export function Home() {
  return (
    <Fragment>
      <Header></Header>
      <Sidebar></Sidebar>
      <div className="bg-white"></div>
    </Fragment>
  );
}
