import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "./DrawSVGPlugin.min";
import { Icon } from "semantic-ui-react";
import {useWindowDimension} from "./windowDimensions";

import "./skills.css";

const skills = () => {
  const windowDimension = useWindowDimension()

  const skillsContainer = useRef(null);
  const skillsTitle = useRef(null);
  const upTextTitle = useRef(null);
  const lowTextTitle = useRef(null);
  const FrontEnd = useRef(null);
  const BackEnd = useRef(null);
  const Database = useRef(null);
  const restLine = useRef(null);
  const restLine2 = useRef(null);
  const restLine3 = useRef(null);
  const restLine4 = useRef(null);
  const restLine5 = useRef(null);
  const restLine6 = useRef(null);
  const restLineText0 = useRef(null);
  const restLineText1 = useRef(null);



  const [BackEndTop, setBackEndTop] = useState(0);
  const [FrontEndTop, setFrontEndTop] = useState(0);
  const [DatabaseTop, setDatabaseTop] = useState(0);
  const AllTop = (((windowDimension.height-90)/2)+90-125-20)
  const Alldown = (((windowDimension.height-90)/2)+90+125+20)

  useLayoutEffect(() => {
    function updatePosition() {
      setDatabaseTop(Database.current.getBoundingClientRect().left);
      setFrontEndTop(FrontEnd.current.getBoundingClientRect().right);
      setBackEndTop(BackEnd.current.getBoundingClientRect().right);

    }

    window.addEventListener("resize", updatePosition);
    updatePosition();
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);
    ScrollTrigger.create({
      trigger: skillsContainer.current,
      start: "top top",
      end: "+=500",
      pin: skillsContainer.current,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsContainer.current,
        start: "top 75%",
        end: "+=50",
        scrub: 1,
      },
    });
    tl.from(upTextTitle.current, { duration: 0.75, y: 30 }, "text");
    tl.from(lowTextTitle.current, { duration: 0.75, y: -30 }, "text");

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: skillsContainer.current,
        start: "top top",
        end: "+=450",
        scrub: 1,
      },
    });
    tl2.from(Database.current, { opacity: 0, x: 30 });
    tl2.from(BackEnd.current, { opacity: 0, x: 30 });
    tl2.from(FrontEnd.current, { opacity: 0, x: 30 });
    // tl2.fromTo(restLine.current, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%" });
    // tl2.fromTo(restLine2.current, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%" },'rest');
    // tl2.fromTo(restLine3.current, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%" },'rest');
    // tl2.from(restLineText0.current, { opacity: 0, y: + 4} ,'rest' );

    // tl2.fromTo(restLine4.current, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%" });
    // tl2.fromTo(restLine5.current, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%" },'docker');
    // tl2.fromTo(restLine6.current, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%" },'docker');
    // tl2.from(restLineText1.current, { opacity: 0, y: - 4} ,'docker' );

  }, []);

  return (
    <div className="skillsContainer" ref={skillsContainer}>
      <div className="skillsTitle" ref={skillsTitle}>
        <div className="upperWrap">
          <div className="upper" ref={upTextTitle}>
            Technical skills
          </div>
        </div>
        <div className="lowerWrap">
          <div className="lower" ref={lowTextTitle}>
            My comforte zone in web development
          </div>
        </div>
      </div>
      <div className="skillZone">
        <div className="zone" ref={Database}>
          <div className="zoneTitle">Database</div>
          <div className="sepline"></div>
          <div className="skills">
            <div>
              <Icon name="list layout" size="small" />
              SQL
            </div>
            <div>
              <Icon name="hubspot" size="small" />
              NoSQL
            </div>
          </div>
        </div>

        <div className="zone" ref={BackEnd}>
          <div className="zoneTitle">Back End</div>
          <div className="sepline"></div>
          <div className="skills">
            <div>
              <Icon name="node js" size="small" />
              Node.
              <span style={{ fontSize: "15px", fontStyle: "italic" }}>
                Express
              </span>
            </div>
            <div>
              <Icon name="python" size="small" />
              Python.
              <span style={{ fontSize: "15px", fontStyle: "italic" }}>
                Django
              </span>
            </div>
          </div>
        </div>
        <div className="zone" ref={FrontEnd}>
          <div className="zoneTitle">Front End</div>
          <div className="sepline"></div>
          <div className="skills">
            <div>
              <Icon name="react" size="small" />
              React
            </div>
            <div>
              <Icon name="js square" size="small" />
              JavaScript
            </div>
            <div>
              <Icon name="html5" size="small" />
              HTML
            </div>
            <div>
              <Icon name="css3" size="small" />
              CSS
            </div>
          </div>
        </div>
        {/* <svg className="dev">
          <path className="rest" ref={restLine} d={`M ${DatabaseTop} ${AllTop } L ${FrontEndTop} ${AllTop}`}></path>
          <path className="rest" ref={restLine2} d={`M ${DatabaseTop} ${AllTop+4 } L ${DatabaseTop} ${AllTop-4 }`}></path>
          <path className="rest" ref={restLine3} d={`M ${FrontEndTop} ${AllTop+4 } L ${FrontEndTop} ${AllTop-4 }`}></path>

          <path className="rest" ref={restLine4} d={`M ${DatabaseTop} ${Alldown} L ${BackEndTop} ${Alldown}`}></path>
          <path className="rest" ref={restLine5} d={`M ${DatabaseTop} ${Alldown+4} L ${DatabaseTop} ${Alldown-4}`}></path>
          <path className="rest" ref={restLine6} d={`M ${BackEndTop} ${Alldown+4} L ${BackEndTop} ${Alldown-4}`}></path>

          <text ref={restLineText0} x={DatabaseTop+(FrontEndTop-DatabaseTop)/2} y={AllTop-4} className="devtext">RESTful API</text>
          <text ref={restLineText1}  x={DatabaseTop+(BackEndTop-DatabaseTop)/2} y={Alldown+18} className="devtext">Docker</text>
        </svg> */}
      </div>
    </div>
  );
};

export default skills;
