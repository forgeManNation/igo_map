import React from "react";
import "./about.scss";

const About = () => {
  return (
    <>
      <div className="aboutContainer">
        <div className="about">
          <h1>About ACH</h1>
          <p>
            <a
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Analysis_of_competing_hypotheses"
              target="_blank"
            >
              Analysis of competing hypotheses (ACH)
            </a>{" "}
            is a process whereby you identify a set of hypotheses,
            systematically evaluate data that is consistent and inconsistent
            with each hypothesis, and reject the hypotheses that contain too
            much inconsistent data. ACH is a tool to aid judgment on important
            issues which require careful weighing of alternative explanations or
            conclusions. It helps an analyst to overcome, or at least minimize,
            some of the cognitive limitations that make intelligence analysis so
            difficult.
            <br />
            <br />
            This applicaiton than focuses on only one step of the ACH process -
            the matrix - which is the third one out of seven, this application
            can numerically show which hypothesis have the most probability in
            percentages. The table you create can than be printed and user can
            add it to his whole seven steps long analysis.
            <br />
            <br />
            To undersand ACH a little bit more, watch this video.
          </p>
          <iframe
            width="660"
            height="415"
            src="https://www.youtube.com/embed/KTSF4HEKBj0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <footer>
        Created by&nbsp;
        <a
          href="https://radekstaryportfolio.web.app"
          target="_blank"
          rel="noreferrer"
        >
          Radek Starý
        </a>
      </footer>
    </>
  );
};

export default About;
