import { Component } from "react";

class Location extends Component {
  componentDidMount(): void {}
  render() {
    return (
      <div className="location_root">
        <div
          className="card card-panel hoverable white lighten-1 location_card"
          style={{ margin: "4px", padding: "4px" }}
        >
          <div className="card-content">
            <div className="card-title left-align heading">Study</div>
            <div className="row valign-wrapper">
              <div className="col s8 left-align subheading">
                <b>Library</b>
                <br />
                Open until 12am
              </div>
              <div className="col s4 progress" style={{ width: "100%" }}>
                <div className="determinate" style={{ width: "70%" }} />
              </div>
            </div>
            <div className="options left-align">Best Floors</div>
            <div className="row floors">
              <div className="col s1 floor_name blue lighten-3">1</div>
              <div className="col s1 floor_name blue lighten-3">2</div>
              <div className="col s1 floor_name blue lighten-3">4</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
