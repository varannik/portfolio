import React, { useRef, useLayoutEffect, useState } from "react";
import "./Landing.css";
import portrait from "./me.png";
import { useWindowDimension } from "./windowDimensions";


const AboutMe = () => {
  const WindowDimensions = useWindowDimension();

  const line = useRef(null);
  const startPointRef = useRef(null);

  const [startPointTop, setStartPointTop] = useState(null);
  const [startPointLeft, setStartPointLeft] = useState(null);
  const [startPointBottom, setStartPointBottom] = useState(null);
  const [startPointRight, setStartPointRight] = useState(null);


  useLayoutEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    function updatePosition() {
      setStartPointTop(startPointRef.current.getBoundingClientRect().top);
      setStartPointLeft(startPointRef.current.getBoundingClientRect().left);
      setStartPointBottom(startPointRef.current.getBoundingClientRect().bottom);
      setStartPointRight(startPointRef.current.getBoundingClientRect().right);
    }
    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [startPointRef]);


  const centerElmentX = startPointLeft + (startPointRight - startPointLeft) / 2;
  const centerElmentY = startPointTop + (startPointBottom - startPointTop) / 2;




  return (
    <div className="landingContainer">
      <div className="portfolio">
        Hello!
        <br />
        It's me and
        <br />
        This is my path
        <div ref={startPointRef} className="StartMyJourney">
          <p>Look at my Journey</p>
        </div>
      </div>
      <div className="frame">
        <img src={portrait} alt="" />
        <div className="name">Mohammadreza Mohammadi</div>
        <div className="jobTitle1">Data Scientist AI/ML</div>
        <div className="jobTitle2">Web Developer</div>
      </div>
      <svg className="startSVG">
        <path
          className="timeLine"
          ref={line}
          d={`M ${centerElmentX} ${centerElmentY},
              C ${WindowDimensions.width / 2 - 30} ${centerElmentY}
                ${WindowDimensions.width / 2} ${centerElmentY + 30}
                ${WindowDimensions.width / 2} ${WindowDimensions.height}  `}
        />
      </svg>
    </div>
  );
};

export default AboutMe;
