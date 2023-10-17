import React, { useRef, useEffect, createRef } from "react";
import { gsap } from "gsap";
import "./App.css";
import AboutMe from "./Sections/Landing";
import {useWindowDimension} from "./Sections/windowDimensions";
import { nodes } from "./Sections/Nodes.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "./Sections/DrawSVGPlugin.min";
import projects from "./Sections/projects";
import skills from './Sections/skills'
import contactMe from './Sections/contactMe'

function App() {
  const WindowDimensions = useWindowDimension();


  
  

  const shapeheight = WindowDimensions.height - WindowDimensions.height * 0.2;
  const endDim = shapeheight;
  const startDim = shapeheight * 0.1;
  const wi = 5;

  function GetYear(year) {
    return year.getFullYear() + (year.getMonth() + 1) / 12;
  }
  function GetRangeYear(date) {
    return date.getFullYear() + "-" + date.getMonth();
  }

  const startYear = Math.min.apply(
    Math,
    nodes.map(function (o) {
      return GetYear(o.start_date);
    })
  );
  const endYear = Math.max.apply(
    Math,
    nodes.map(function (o) {
      return GetYear(o.end_date);
    })
  );

  function XPosition(type) {
    return type === "Education"
      ? WindowDimensions.width / 2 + WindowDimensions.width / wi
      : WindowDimensions.width / 2 - WindowDimensions.width / wi;
  }
  function YPosition(year) {
    const value = GetYear(year);
    return (
      startDim +
      ((endDim - startDim) / (endYear - startYear)) * (value - startYear)
    );
  }


  function startScrollPath(pathRef) {
    const top = pathRef.current.getBoundingClientRect().top;
    const start = top - WindowDimensions.height - startDim;
    return (WindowDimensions.height * 2 * start) / WindowDimensions.height;
  }
  function endScrollPath(pathRef) {
    const bottom = pathRef.current.getBoundingClientRect().bottom;
    const start = bottom - WindowDimensions.height - startDim;
    return (WindowDimensions.height * 2 * start) / WindowDimensions.height;
  }

  const refPaths = useRef(nodes.map(() => createRef()));
  function pathCreator(nodes) {
    useEffect(() => {
      refPaths.current[0].current.focus();
    }, []);

    return nodes.map((node, i) => {
      const x1 = WindowDimensions.width / 2;
      const y1 = YPosition(node.start_date);
      const xc1 = WindowDimensions.width / 2;
      const yc1 = YPosition(node.start_date) + 40;
      const xc2 = XPosition(node.type);
      const yc2 = YPosition(node.end_date) - 40;
      const x2 = XPosition(node.type);
      const y2 = YPosition(node.end_date);

      return (
        <path
          className="timeLine"
          key={i}
          ref={refPaths.current[i]}
          d={`M ${x1} ${y1} C ${xc1} ${yc1} ${xc2} ${yc2} ${x2} ${y2} `}
        />
      );
    });
  }

  const refCircles = useRef(nodes.map(() => createRef()));
  function circleCreator(nodes) {
    return nodes.map((node, i) => {
      const cx = WindowDimensions.width / 2;
      const cy = YPosition(node.start_date);
      return (
        <circle
          ref={refCircles.current[i]}
          className="ball_path"
          key={`${node.type}_${i}`}
          r="8"
          cx={cx}
          cy={cy}
          style={{ visibility: "hidden" }}
        ></circle>
      );
    });
  }

  const refYear = useRef(nodes.map(() => createRef()));
  function yearCreator(nodes) {
    return nodes.map((node, i) => {
      const cx = WindowDimensions.width / 2;
      const cy = YPosition(node.start_date);
      return (
        <circle
          ref={refYear.current[i]}
          className="ball"
          key={`${node.start_date}_Year_${i}`}
          r="8"
          cx={cx}
          cy={cy}
        ></circle>
      );
    });
  }

  const refYearText = useRef(nodes.map(() => createRef()));
  function yearTextCreator(nodes) {
    return nodes.map((node, i) => {
      const cx = WindowDimensions.width / 2;
      const cy = YPosition(node.start_date);
      return (
        <text
          ref={refYearText.current[i]}
          key={`${node.start_date}_${i}`}
          className="text_year"
          x={cx}
          y={cy}
          textAnchor="middle"
        >
          {GetRangeYear(node.start_date)}
        </text>
      );
    });
  }

  const refYearEndText = useRef(nodes.map(() => createRef()));
  function yearEndTextCreator(nodes) {
    return nodes.map((node, i) => {
      const x2 = XPosition(node.type);
      const y2 = YPosition(node.end_date);
      return (
        <text
          ref={refYearEndText.current[i]}
          className="text_year"
          key={`${node.end_date}_End_${i}`}
          x={x2}
          y={y2}
          textAnchor="middle"
        >
          {GetRangeYear(node.end_date)}
        </text>
      );
    });
  }
  const refExEdText = useRef(nodes.map(() => createRef()));
  function ExEdText(nodes) {
    return nodes.map((node, i) => {
      const x2 = XPosition(node.type);
      const y2 = YPosition(node.end_date);
      return node.type === "Education" ? (
        <text
          ref={refExEdText.current[i]}
          className="ExEdText"
          textAnchor="middle"
          key={`${node.Field_of_study}_Field_${i}`}
        >
          <tspan x={x2} y={y2 + 30}>
            {node.Degree}
          </tspan>
          <tspan x={x2} y={y2 + 45}>
            {node.Field_of_study}
          </tspan>
        </text>
      ) : (
        <text
          ref={refExEdText.current[i]}
          className="ExEdText"
          textAnchor="middle"
        >
          <tspan x={x2} y={y2 + 30}>
            {node.Title}
          </tspan>
          <tspan x={x2} y={y2 + 45}>
            {node.Duration}
          </tspan>
        </text>
      );
    });
  }

  // References
  const MyJourney = useRef(null);
  const header = useRef(null);

  const l1 = useRef(null);
  const l2 = useRef(null);
  const l3 = useRef(null);
  const l4 = useRef(null);
  const l5 = useRef(null);
  const l6 = useRef(null);

  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);


  const ball0M = useRef(null);
  const ball0L = useRef(null);
  const ball0R = useRef(null);
  const ball01 = useRef(null);
  const ball02 = useRef(null);
  const ball03 = useRef(null);



  useEffect(() => {
    

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);

    ScrollTrigger.create({
      trigger: MyJourney.current,
      start: "top top",
      end: "bottom bottom",
      pin: header.current,
    });

    const points = gsap
      .timeline({
        defaults: {
          duration: 0.05,
          autoAlpha: 1,
          scale: 2,
          transformOrigin: "center",
          ease: "elastic(2.5, 1)",
        },
      })
      .to(
        [
          ball01.current,
          ball02.current,
          ball03.current,
          text1.current,
          text2.current,
          text3.current,
        ],
        {},
        0.4
      );

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: l1.current,
        scrub: 1,
        start: "top bottom",
        end: `bottom ${startDim}px`,
      },
    });
    tl1

      .from([l1.current, l2.current, l3.current], { drawSVG: 0 })

      .to(
        ball0M.current,
        {
          motionPath: {
            path: l1.current,
            align: l1.current,
            alignOrigin: [0.5, 0.5],
          },
        },
        0
      )
      .to(
        ball0L.current,
        {
          motionPath: {
            path: l3.current,
            align: l3.current,
            alignOrigin: [0.5, 0.5],
          },
        },
        0
      )

      .to(
        ball0R.current,
        {
          motionPath: {
            path: l2.current,
            align: l2.current,
            alignOrigin: [0.5, 0.5],
          },
        },
        0
      )
      .add(points, 0);

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: MyJourney.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
    tl2
      .from(l4.current, { drawSVG: 0 })
      .to(
        ball0M.current,
        {
          motionPath: {
            path: l4.current,
            align: l4.current,
            alignOrigin: [0.5, 0.5],
          },
        },
        0
      )
      .to(ball0M.current, {
        duration: 0.05,
        autoAlpha: 1,
        scale: 2,
        transformOrigin: "center",
        ease: "elastic(3.5, 1)",
      });

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: MyJourney.current,
        start: "bottom bottom",
        end: "bottom 75%",
        scrub: 1,
      },
    });
    tl3.fromTo(l5.current, { drawSVG: "0% 0%" } , { drawSVG: "80% 100%" })
    tl3.to(l5.current , { drawSVG: "100% 100%" },'s')
    tl3.fromTo(l6.current, { drawSVG: "50% 50%" } , { drawSVG: "0% 100%" },'s')





    const pathArray = [];
    refPaths.current.forEach((v) => {
      return pathArray.push(
        gsap.timeline({
          scrollTrigger: {
            trigger: MyJourney.current,
            start: `${startScrollPath(v)} top`,
            end: `${endScrollPath(v)} top`,
            scrub: 1,
          },
        })
      );
    });
    pathArray.forEach((v, i) => {
      v.from(refPaths.current[i].current, { drawSVG: 0 })
        .to(
          refCircles.current[i].current,
          {
            duration: 0.05,
            autoAlpha: 1,
            scale: 2,
            transformOrigin: "center",
            ease: "elastic(3.5, 1)",
          },
          0
        )
        .to(
          refCircles.current[i].current,
          {
            motionPath: {
              path: refPaths.current[i].current,
              align: refPaths.current[i].current,
              alignOrigin: [0.5, 0.5],
            },
          },
          0
        )
        .to(
          [refYear.current[i].current, refYearText.current[i].current],
          {
            duration: 0.05,
            autoAlpha: 1,
            scale: 2,
            transformOrigin: "center",
            ease: "elastic(3.5, 1)",
          },
          0
        )
        .to(refYearEndText.current[i].current, {
          duration: 0.05,
          autoAlpha: 1,
          scale: 2,
          transformOrigin: "center",
          ease: "elastic(3.5, 1)",
        })
        .to(refExEdText.current[i].current, {
          opacity: 1,
          ease: "power4.out",
        });
    });
  }, [WindowDimensions.height,WindowDimensions.width]);

  return (
    <div className="App">
      <div className="parent">
        <div className="AboutMe">
          <AboutMe />
        </div>
        <div ref={MyJourney} className="MyJourney">
          <svg className="myPathway" ref={header}>
            <path
              ref={l1}
              className="timeLine"
              d={`M ${WindowDimensions.width / 2} 0 L 
              ${WindowDimensions.width / 2}
              ${startDim} `}

            />
            <path
              ref={l2}
              className="timeLine"
              d={`M ${WindowDimensions.width / 2} 0 
              c 0, ${startDim / 4}
              ${WindowDimensions.width / wi},${startDim - startDim / wi}
              ${WindowDimensions.width / wi} , ${startDim} `}
            />
            <path
              ref={l3}
              className="timeLine"
              d={`M ${WindowDimensions.width / 2} 0 
              c 0, ${startDim / 4}
              ${-(WindowDimensions.width / wi)},${startDim - startDim / wi}
              ${-(WindowDimensions.width / wi)}, ${startDim} `}

            />
            <path
              ref={l5}
              className="timeLine"
              d={`M ${WindowDimensions.width / 2} ${endDim} L 
              ${WindowDimensions.width / 2}
              ${WindowDimensions.height-2} `}

            />

            <path
              ref={l6}
              className="timeLine"
              d={`M ${(WindowDimensions.width / 2)-(WindowDimensions.width / 8)} ${WindowDimensions.height-2} L 
              ${(WindowDimensions.width / 2)+(WindowDimensions.width / 8)}
              ${WindowDimensions.height-2 } `}

            />
            <circle
              ref={ball01}
              className="ball"
              r="17"
              cx={WindowDimensions.width / 2 - WindowDimensions.width / wi}
              cy={startDim}
            ></circle>

            <circle
              ref={ball02}
              className="ball"
              r="17"
              cx={WindowDimensions.width / 2 + WindowDimensions.width / wi}
              cy={startDim}
            ></circle>

            <circle
              ref={ball03}
              className="ball"
              r="10"
              cx={WindowDimensions.width / 2}
              cy={startDim}
            ></circle>
            <path
              ref={l4}
              className="timeLine"
              d={`M ${WindowDimensions.width / 2} ${startDim} L 
              ${WindowDimensions.width / 2}
              ${endDim} `}
            />

            <circle
              ref={ball0M}
              className="ball_path"
              stroke="#444"
              r="6"
              cx={WindowDimensions.width / 2}
              cy={0}
            ></circle>

            <circle
              ref={ball0L}
              className="ball_path"
              r="6"
              cx={WindowDimensions.width / 2}
              cy={0}
            ></circle>

            <circle
              ref={ball0R}
              className="ball_path"
              r="6"
              cx={WindowDimensions.width / 2}
              cy={0}
            ></circle>

            <text
              ref={text1}
              className="headers"
              x={WindowDimensions.width / 2 + WindowDimensions.width / wi}
              y={startDim}
              textAnchor="middle"
            >
              Education
            </text>

            <text
              ref={text2}
              className="headers"
              x={WindowDimensions.width / 2 - WindowDimensions.width / wi}
              y={startDim}
              textAnchor="middle"
            >
              Experience
            </text>

            <text
              ref={text3}
              className="headers"
              x={WindowDimensions.width / 2}
              y={startDim}
              textAnchor="middle"
            >
              Year
            </text>

            {pathCreator(nodes)}
            {circleCreator(nodes)}
            {yearCreator(nodes)}
            {yearTextCreator(nodes)}
            {yearEndTextCreator(nodes)}
            {ExEdText(nodes)}
          </svg>
        </div>
        {projects()}
        {skills()}
        {contactMe()}
        
      </div>
    </div>
  );
}

export default App;
