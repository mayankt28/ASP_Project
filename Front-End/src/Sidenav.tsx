import React, { Component } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import Location from "./Location";
import { useState } from "react";

class Sidebar extends Component {
  updateSearch: any;
  constructor(props: { updateSearchCallback: any }) {
    super(props);
    this.updateSearch = props.updateSearchCallback;
  }

  componentDidMount() {
    var elem: Element = document.querySelector(".sidenav") as Element;
    var instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 0,
    });
    instance.open();
  }

  render() {
    return (
      <div>
        <ul
          id="slide-out"
          className="sidenav sidenav-fixed collection"
          style={{ width: "25%" }}
        >
          <div className="row">
            <div className="input-field col s10 offset-s1">
              <i className="material-icons prefix">search</i>
              <input id="search_box" type="text" onChange={this.updateSearch} />
              <label htmlFor="search_box">Search location</label>
            </div>
          </div>
          <li className="collection-item">
            <Location />
          </li>
          <li className="collection-item">
            <Location />
          </li>
          <li className="collection-item">
            <Location />
          </li>
          <li className="collection-item">
            <Location />
          </li>
          <li className="collection-item">
            <Location />
          </li>
        </ul>
        <a
          href="#"
          data-target="slide-out"
          className="sidenav-trigger show-on-small"
        >
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

export default Sidebar;
