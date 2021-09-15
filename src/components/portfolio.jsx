import React from "react";

import RacIT1 from "../img/RacIT1.png";
import RacIT2 from "../img/RacIT2.png";
import RacIT3 from "../img/RacIT3.png";
import RESTATE from "../img/RESTATE.jpg";
import SpaceRes from "../img/spaceRes.jpg";
import leaflet from "../img/leaflet.png";
class Portfolio extends React.Component {
  render() {
    return (
      <section id="work" className="portfolio-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a">Portfolio</h3>
                <p className="subtitle-a">
                  Projects that, I have participated / worked on
                </p>
                <div className="line-mf"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="work-box">
                <a href={RESTATE} data-lightbox="gallery-vmarine">
                  <div className="work-img">
                    <img src={RESTATE} alt="" className="img-fluid" />
                  </div>
                  <div className="work-content">
                    <div className="row">
                      <div className="col-sm-8">
                        <h2 className="w-title">Real Estate Project</h2>
                        <div className="w-more">
                          <span className="w-ctegory">
                            React with Typescript, Servicenow, Styled
                            Components, Devextreme Components
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="w-like">
                          <span className="ion-ios-plus-outline"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="work-box">
                <a href={SpaceRes} data-lightbox="gallery-aguadeluz">
                  <div className="work-img">
                    <img src={SpaceRes} alt="" className="img-fluid" />
                  </div>
                  <div className="work-content">
                    <div className="row">
                      <div className="col-sm-8">
                        <h2 className="w-title">Space Reservation</h2>
                        <div className="w-more">
                          <span className="w-ctegory">
                            React with Typescript, Servicenow, Styled
                            Components, Devextreme Components
                          </span>{" "}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="w-like">
                          <span className="ion-ios-plus-outline"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="work-box">
                <a href={leaflet} data-lightbox="gallery-todo">
                  <div className="work-img">
                    <img src={leaflet} alt="" className="img-fluid" />
                  </div>
                  <div className="work-content">
                    <div className="row">
                      <div className="col-sm-8">
                        <h2 className="w-title">Space Stacking and Blocking</h2>
                        <div className="w-more">
                          <span className="w-ctegory">
                            React with Typescript, Servicenow, Styled
                            Components, Devextreme Components
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="w-like">
                          <span className="ion-ios-plus-outline"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="work-box">
                <a href={RacIT1} data-lightbox="gallery-todo">
                  <div className="work-img">
                    <img src={RacIT1} alt="" className="img-fluid" />
                  </div>
                  <div className="work-content">
                    <div className="row">
                      <div className="col-sm-8">
                        <h2 className="w-title">Racit Web-desk Admin Panel</h2>
                        <div className="w-more">
                          <span className="w-ctegory">
                            React with JS, Styled Components, Bootstrap, Mongodb
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="w-like">
                          <span className="ion-ios-plus-outline"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  href={RacIT2}
                  data-lightbox="gallery-todo"
                  style={{ display: "none" }}
                >
                  jsx-a11y/anchor-has-content warning
                </a>
                <a
                  href={RacIT3}
                  data-lightbox="gallery-todo"
                  style={{ display: "none" }}
                >
                  jsx-a11y/anchor-has-content warning
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
