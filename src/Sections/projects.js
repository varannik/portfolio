import React, { useEffect, useRef } from "react";
import "./projects.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "./DrawSVGPlugin.min";
import { useWindowDimension } from "../Sections/windowDimensions";


const projects = () => {
  const WindowDimensions = useWindowDimension();

  const l1 = useRef(null);

  const B0 = useRef(null);

  const projects = useRef(null);
  const MachineLearningTitle = useRef(null);

  const frame0 = useRef(null);
  const projectTitle0 = useRef(null);
  const projectDescription0 = useRef(null);
  const projectChart0 = useRef(null);
  const tools0 = useRef(null);
  const techniques0 = useRef(null);

  const frame1 = useRef(null);
  const projectTitle1 = useRef(null);
  const projectDescription1 = useRef(null);
  const projectChart1 = useRef(null);
  const tools1 = useRef(null);
  const techniques1 = useRef(null);

  const frame2 = useRef(null);
  const projectTitle2 = useRef(null);
  const projectDescription2 = useRef(null);
  const projectChart2 = useRef(null);
  const tools2 = useRef(null);
  const techniques2 = useRef(null);

  const frame3 = useRef(null);
  const projectTitle3 = useRef(null);
  const projectDescription3 = useRef(null);
  const projectChart3 = useRef(null);
  const tools3 = useRef(null);
  const techniques3 = useRef(null);

  const frame4 = useRef(null);
  const projectTitle4 = useRef(null);
  const projectDescription4 = useRef(null);
  const projectChart4 = useRef(null);
  const tools4 = useRef(null);
  const techniques4 = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);

    const tl0 = gsap.timeline({
      scrollTrigger: {
        trigger: projects.current,
        start: "top 75%",
        end: "top top",
        scrub: 1,
      },
    });
    tl0
      .from(MachineLearningTitle.current, {
        y: 100,
        ease: "power3.out",
      })
      .to(B0.current, {
        duration: 0.05,
        autoAlpha: 1,
        scale: 2,
        transformOrigin: "center",
        ease: "elastic(3.5, 1)",
      })
      .fromTo(l1.current, { drawSVG: "2% 2%" }, { drawSVG: "0% 100%" });

    ScrollTrigger.create({
      trigger: projects.current,
      start: "top top",
      end: "+=3500",
      pin: projects.current,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projects.current,
        start: "top top",
        end: "+=3500",
        scrub: 1,
      },
    });
    tl.fromTo(
      frame0.current,
      { height: 0 + "px" },
      {
        height: 450 + "px",
        opacity: 1,
        ease: "power1.out",
      }
    );

    tl.to(
      [
        projectTitle0.current,
        projectDescription0.current,
        projectChart0.current,
        tools0.current,
        techniques0.current,
      ],
      { opacity: 1, stagger: 1 }
    );
    tl.to(frame0.current, { rotateY: 180 + "deg" }, "end0");

    tl.to(
      [
        projectTitle0.current,
        projectDescription0.current,
        projectChart0.current,
        tools0.current,
        techniques0.current,
      ],
      { opacity: 0 },
      "end0"
    );
    tl.to(frame1.current, { opacity: 1, rotateY: 360 + "deg" }, "end0");

    tl.to(
      [
        projectTitle1.current,
        projectDescription1.current,
        projectChart1.current,
        tools1.current,
        techniques1.current,
      ],
      { opacity: 1, stagger: 1 }
    );

    tl.to(frame1.current, { rotateY: 180 + "deg" }, "end1");
    tl.to(
      [
        projectTitle1.current,
        projectDescription1.current,
        projectChart1.current,
        tools1.current,
        techniques1.current,
      ],
      { opacity: 0 },
      "end1"
    );
    tl.to(frame2.current, { opacity: 1, rotateY: 360 + "deg" }, "end1");
    tl.to(
      [
        projectTitle2.current,
        projectDescription2.current,
        projectChart2.current,
        tools2.current,
        techniques2.current,
      ],
      { opacity: 1, stagger: 1 }
    );

    tl.to(frame2.current, { rotateY: 180 + "deg" }, "end2");
    tl.to(
      [
        projectTitle2.current,
        projectDescription2.current,
        projectChart2.current,
        tools2.current,
        techniques2.current,
      ],
      { opacity: 0 },
      "end2"
    );
    tl.to(frame3.current, { opacity: 1, rotateY: 360 + "deg" }, "end2");

    tl.to(
      [
        projectTitle3.current,
        projectDescription3.current,
        projectChart3.current,
        tools3.current,
        techniques3.current,
      ],
      { opacity: 1, stagger: 1 }
    );

    tl.to(frame3.current, { rotateY: 180 + "deg" }, "end3");
    tl.to(
      [
        projectTitle3.current,
        projectDescription3.current,
        projectChart3.current,
        tools3.current,
        techniques3.current,
      ],
      { opacity: 0 },
      "end3"
    );
    tl.to(frame4.current, { opacity: 1, rotateY: 360 + "deg" }, "end3");

    tl.to(
      [
        projectTitle4.current,
        projectDescription4.current,
        projectChart4.current,
        tools4.current,
        techniques4.current,
      ],
      { opacity: 1, stagger: 1 }
    );
  }, []);
  return (
    <div ref={projects} className="freelanceProjects">
      <svg
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <circle
          ref={B0}
          className="ballProject"
          r="5"
          cx={WindowDimensions.width / 2}
          cy={90}
        ></circle>

        <rect
          ref={l1}
          x={WindowDimensions.width / 2 - 180}
          y="90"
          rx="150"
          width={360}
          height={490}
          style={{ fill: "none", stroke: "#444", strokeWidth: 3 }}
        />
      </svg>

      <div className="MachineLearningTitle">
        <span ref={MachineLearningTitle} className="hideText">
          Selected Machine learning Projects
        </span>
      </div>
      <div className="project">
        <div className="flip-card-front" ref={frame0}>
          <div className="projectTitle" ref={projectTitle0}>
            Forecast Currency
            <br />
            Exchange Rate
          </div>

          <div className="projectDescription" ref={projectDescription0}>
            Forecasting multi step exchange rate to find the best day of the
            next week for a company which has to transfer money every week.
          </div>

          <div className="tools" ref={tools0}>
            Tools
            <div>
              <p>Python - Keras</p>
            </div>
          </div>
          <div className="techniques" ref={techniques0}>
            Technique
            <div>
              <p>RNN(GRU,TCN) </p>
            </div>
          </div>
        </div>

        <div className="flip-card-front" ref={frame1}>
          <div className="projectTitle" ref={projectTitle1}>
            Engagement and Churn
            <br />
            In a fintech service
          </div>

          <div className="projectDescription" ref={projectDescription1}>
            To reduce churning rate in a fintech service by recognizing
            unengaged users. With a data exploration approach, I tried to find
            effective factors that led the user to use the app.
          </div>

          <div className="tools" ref={tools1}>
            Tools
            <div>
              <p>Python - XGBoost</p>
            </div>
          </div>
          <div className="techniques" ref={techniques1}>
            Technique
            <div>
              <p>Feature importance</p>
            </div>
          </div>
        </div>

        <div className="flip-card-front" ref={frame2}>
          <div className="projectTitle" ref={projectTitle2}>
            Optimization for
            <br />
            message delivery system
          </div>

          <div className="projectDescription" ref={projectDescription2}>
            Personalizing emails for each recipient by finding the best time for
            sending emails to increase the click-through rate. The trained model could improve the click-through
            rate by 25% by sending promotional emails to the customer in perfect
            time after the A/B testing.
          </div>

          <div className="tools" ref={tools2}>
            Tools
            <div>
              <p>Python - sklearn</p>
            </div>
          </div>
          <div className="techniques" ref={techniques2}>
            Technique
            <div>
              <p>Random decision forest</p>
            </div>
          </div>
        </div>
        <div className="flip-card-front" ref={frame3}>
          <div className="projectTitle" ref={projectTitle3}>
            Route planning for
            <br />
            merchandisers
          </div>

          <div className="projectDescription" ref={projectDescription3}>
            Creating route plan for merchandisers with the shortest route
            between multiple destinations. Base on the company’s need, each
            merchandiser has to cover specific range and equal number of shops
            to visit.
          </div>

          <div className="tools" ref={tools3}>
            Tools
            <div>
              <p>Python - KMeans</p>
            </div>
          </div>
          <div className="techniques" ref={techniques3}>
            Technique
            <div>
              <p>k-means clustering</p>
            </div>
          </div>
        </div>
        <div className="flip-card-front" ref={frame4}>
          <div className="projectTitle" ref={projectTitle4}>
            Epilepsy Detection
          </div>

          <div className="projectDescription" ref={projectDescription4}>
            Two-dimensional (2D) frequency-time scalograms were obtained in this
            project by applying Continuous Wavelet Transform to EEG records.
          </div>

          <div className="tools" ref={tools4}>
            Tools
            <div>
              <p>Python - Keras</p>
            </div>
          </div>
          <div className="techniques" ref={techniques4}>
            Technique
            <div>
              <p>Signal processing - CNN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default projects;
