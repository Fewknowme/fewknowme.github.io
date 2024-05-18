import React from "react";
import RacIT1 from "../img/RacIT1.png";
import RacIT2 from "../img/RacIT2.png";
import RacIT3 from "../img/RacIT3.png";
import RESTATE from "../img/RESTATE.jpg";
import SpaceRes from "../img/spaceRes.jpg";
import leaflet from "../img/leaflet.png";
import NoSS from "../img/no_ss.png";
import gz2h1 from "../img/gz2h1.png";
import gz2h2 from "../img/gz2h2.png";
import gz2h3 from "../img/gz2h3.png";
import pp1 from "../img/p-p-1.png";
import pp2 from "../img/p-p-2.png";
import pp3 from "../img/p-p-3.png";
import pp4 from "../img/p-p-4.png";
import lokmanyaweb from "../img/lokmanyaweb.png";
import lokmanyaweb2 from "../img/lokmanyaweb-2.png";
import lokmanyaweb3 from "../img/lokmanyaweb-3.png";
import lokmanyamob from "../img/lokmanyamobile.png";
import lokmanyamob2 from "../img/lokmanyamob-2.png";
import lokmanyamob3 from "../img/lokmanyamob-3.png";
import lokmanyamob4 from "../img/lokmanyamob-4.png";
import urbane1 from "../img/urbane1.png";
import urbane2 from "../img/urbane2.png";
import urbane3 from "../img/urbane3.png";
import urbane4 from "../img/urbane4.png";
import urbanemerc1 from "../img/urbanemerc1.png";
import urbanemerc2 from "../img/urbanemerc2.png";
import urbanemerc3 from "../img/urbanemerc3.png";
import urbanemerc4 from "../img/urbanemerc4.png";
import urbanemerc5 from "../img/urbanemerc5.png";

const projects = [
  {
    img: urbanemerc1,
    title: "One Urbane Merchant App",
    category:
      "React Native with TypeScript, Styled Components, ISG Payment Gateway, Cashfree Gateway",
    link: urbanemerc1,
    extraLinks: [urbanemerc2, urbanemerc3, urbanemerc4, urbanemerc5],
  },
  {
    img: urbane1,
    title: "One Urbane Web App",
    category:
      "ReactJS with TypeScript, Styled Components, ISG Payment Gateway, Cashfree Gateway",
    link: urbane1,
    extraLinks: [urbane2, urbane3, urbane4],
  },
  {
    img: lokmanyamob,
    title: "KIOSK-B2C (Lokmanya Digital App): React Native Mobile App",
    category:
      "React Native with TypeScript, Styled Components, Native module integration",
    link: lokmanyamob,
    extraLinks: [lokmanyamob2, lokmanyamob3, lokmanyamob4],
  },
  {
    img: lokmanyaweb,
    title: "KIOSK-B2B Lokmanya Website: React.js Web Application",
    category:
      "ReactJS with Typescript, Styled Components, Material UI components, NestJS at backend",
    link: lokmanyaweb,
    extraLinks: [lokmanyaweb2, lokmanyaweb3],
  },
  {
    img: pp1,
    title: "PinkPanda",
    category:
      "NextJS with Typescript, Sanity.io for CMS, SCSS, Styled Components",
    link: pp1,
    extraLinks: [pp2, pp3, pp4],
  },
  {
    img: gz2h1,
    title: "Guitarzero2hero",
    category: "AngularJS, SCSS with php laravel artisan at backend",
    link: gz2h1,
    extraLinks: [gz2h2, gz2h3],
  },
  {
    img: NoSS,
    title: "DirecTV Shopping Portal",
    category: "NextJS with Typescript, Material UI, Styled Components",
    link: NoSS,
  },
  {
    img: RESTATE,
    title: "Real Estate Project",
    category:
      "React with Typescript, Servicenow, Styled Components, Devextreme Components, Redux",
    link: RESTATE,
  },
  {
    img: SpaceRes,
    title: "Space Reservation",
    category:
      "React with Typescript, Servicenow, Styled Components, Devextreme Components, Redux",
    link: SpaceRes,
  },
  {
    img: leaflet,
    title: "Space Stacking and Blocking",
    category:
      "React with Typescript, Servicenow, Styled Components, Devextreme Components, Redux",
    link: leaflet,
  },
  {
    img: "https://docs.microsoft.com/en-us/office/dev/add-ins/images/quick-start-task-pane-3.png",
    title: "Nuvolo Outlook Plugin",
    category:
      "React with Typescript, Servicenow, Styled Components, Devextreme Components, Redux",
    link: "https://docs.microsoft.com/en-us/office/dev/add-ins/images/quick-start-task-pane-3.png",
  },
  {
    img: RacIT1,
    title: "Racit Web-desk Admin Panel",
    category: "React with JS, Styled Components, Bootstrap, Mongodb",
    link: RacIT1,
    extraLinks: [RacIT2, RacIT3],
  },
];

const Project = ({ img, title, category, link, extraLinks }) => (
  <div className="col-md-4">
    <div className="work-box">
      <a href={link} data-lightbox="gallery-todo">
        <div className="work-img">
          <img src={img} alt={title} className="img-fluid" />
        </div>
        <div className="work-content">
          <div className="row">
            <div className="col-sm-8">
              <h2 className="w-title">{title}</h2>
              <div className="w-more">
                <span className="w-ctegory">{category}</span>
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
      {extraLinks &&
        extraLinks.map((extraLink, index) => (
          <a
            href={extraLink}
            data-lightbox="gallery-todo"
            style={{ display: "none" }}
            key={index}
          >
            jsx-a11y/anchor-has-content warning
          </a>
        ))}
    </div>
  </div>
);

const Portfolio = () => (
  <section id="work" className="portfolio-mf sect-pt4 route">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="title-box text-center">
            <h3 className="title-a">Portfolio</h3>
            <p className="subtitle-a">
              Projects that I have participated / worked on
            </p>
            <div className="line-mf"></div>
          </div>
        </div>
      </div>
      <div className="row">
        {projects.map((project, index) => (
          <Project
            key={index}
            img={project.img}
            title={project.title}
            category={project.category}
            link={project.link}
            extraLinks={project.extraLinks}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
