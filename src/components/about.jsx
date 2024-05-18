import React from "react";

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: [
        {
          id: "ReactJS/TS_skill",
          content: "ReactJS/TS",
          porcentage: "90%",
          value: "90",
        },
        {
          id: "ReactNative_skill",
          content: "React Native TS/JS",
          porcentage: "90%",
          value: "90",
        },
        {
          id: "NextJS_skill",
          content: "Next TS/JS",
          porcentage: "85%",
          value: "85%",
        },
        {
          id: "Sanity.io_skill",
          content: "Sanity.io (CMS)",
          porcentage: "85%",
          value: "85%",
        },
        {
          id: "ServiceNow_skill",
          content: "ServiceNow",
          porcentage: "50%",
          value: "50",
        },
        {
          id: "styledComponents_skill",
          content: "Styled Components",
          porcentage: "80%",
          value: "80",
        },
        { id: "HTML5_skill", content: "HTML5", porcentage: "80%", value: "80" },
        { id: "CSS3_skill", content: "CSS3", porcentage: "75%", value: "75" },
        {
          id: "JavaScript_skill",
          content: "JavaScript",
          porcentage: "90%",
          value: "90",
        },
        { id: "PHP_skill", content: "PHP", porcentage: "70%", value: "70" },
        {
          id: "Wordpress_skill",
          content: "Wordpress",
          porcentage: "80%",
          value: "80",
        },
      ],
      about_me: [
        {
          id: "first-p-about",
          content:
            "Hi, My name is Rohit Madas and I'm a Software Engineer. Welcome to my Personal Site!",
        },
        {
          id: "second-p-about",
          content:
            "- Based in India, Specializing in frontend development for complex scalable web app. Experience of building Web and Mobile applications with React JS/TS, JavaScript, TypeScript, React Native, Wordpress and some cool libraries/ frameworks.",
        },
        {
          id: "third-p-about",
          content:
            "- Currently working at KIPL Global, Pune, India. Delivering solutions to Sophisticated problems.",
        },
        {
          id: "fourth-p-about",
          content:
            "- Previously at Ampra Solutions Pvt. Ltd., Infosys Pvt. Ltd., Spriio",
        },
      ],
    };
  }

  render() {
    return (
      <section id="about" className="about-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="box-shadow-full">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div
                        className="col-sm-6 col-md-5"
                        style={{ margin: "0 auto" }}
                      >
                        <div
                          className="about-img"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            className="img-fluid rounded b-shadow-a"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="skill-mf">
                      {/* <p className="title-s">Skill</p> */}
                      {this.state.skills.map((skill) => {
                        return (
                          <React.Fragment key={skill.id}>
                            <span>{skill.content}</span>{" "}
                            <span className="pull-right">
                              {skill.porcentage}
                            </span>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: skill.porcentage }}
                                aria-valuenow={skill.value}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="about-me pt-4 pt-md-0">
                      <div className="title-box-2">
                        <h5 className="title-left">About Me</h5>
                      </div>
                      {this.state.about_me.map((content) => {
                        return (
                          <p className="lead" key={content.id}>
                            {content.content}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
