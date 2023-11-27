import { useState } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import Sidebar from "./Sidenav";
import map from "./map.jpg";
import "./home.css";

export default function HomePage() {
  const [searchString, setSearchString] = useState("");

  function componentdidmount() {
    let sidenav: Element = document.querySelector("#slide-out") as Element;
    M.Sidenav.init(sidenav, {});
  }

  return (
    <div className="content row">
      <div className="home_root">
        <div className="col s3">
          <Sidebar />
        </div>
        <div className="col s9 center-align map-container">
          <img src={map} />
        </div>
      </div>
    </div>
  );
}
