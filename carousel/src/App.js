import React, {
  useState,
  useReducer,
  useEffect,
  useRef
} from "react";
import Alert from "@reach/alert";
import VisuallyHidden from "@reach/visually-hidden";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward
} from "react-icons/fa";

import slides from "./whatevs/slides";
import useProgress from "./useProgress";

let SLIDE_DURATION = 3000;

function Carousel(props) {
  return (
    <section className="Carousel" {...props} />
  );
}

function Slides(props) {
  return <ul {...props} />;
}

function Slide({
  isCurrent,
  takeFocus,
  image,
  id,
  title,
  children
}) {
  return (
    <li
      aria-hidden={!isCurrent}
      tabIndex="-1"
      aria-labelledby={id}
      className="Slide"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="SlideContent">
        <h2 id={id}>{title}</h2>
        {children}
      </div>
    </li>
  );
}

function SlideNav(props) {
  return <ul className="SlideNav" {...props} />;
}

function SlideNavItem({ isCurrent, ...props }) {
  return (
    <li className="SlideNavItem">
      <button {...props} aria-current={isCurrent}>
        <span />
      </button>
    </li>
  );
}

function Controls(props) {
  return <div className="Controls" {...props} />;
}

function IconButton(props) {
  return (
    <button {...props} className="IconButton" />
  );
}

function ProgressBar({ animate, time }) {
  let progress = 0.5;

  return (
    <div className="ProgressBar">
      <div
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

function SpacerGif({ width }) {
  return (
    <div
      style={{ display: "inline-block", width }}
    />
  );
}

function App() {
  let currentIndex = 0;

  return (
    <Carousel aria-label="Images from Space">
      <Slides>
        {slides.map((image, index) => (
          <Slide
            key={index}
            id={`image-${index}`}
            image={image.img}
            title={image.title}
            isCurrent={index === currentIndex}
            takeFocus={null}
            children={image.content}
          />
        ))}
      </Slides>

      <SlideNav>
        {slides.map((slide, index) => (
          <SlideNavItem
            key={index}
            isCurrent={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => {}}
          />
        ))}
      </SlideNav>

      <Controls>
        {false ? (
          <IconButton
            aria-label="Pause"
            onClick={() => {}}
            children={<FaPause />}
          />
        ) : (
          <IconButton
            aria-label="Play"
            onClick={() => {}}
            children={<FaPlay />}
          />
        )}
        <SpacerGif width="10px" />
        <IconButton
          aria-label="Previous Slide"
          onClick={() => {}}
          children={<FaBackward />}
        />
        <IconButton
          aria-label="Next Slide"
          onClick={() => {}}
          children={<FaForward />}
        />
      </Controls>

      <ProgressBar
        time={SLIDE_DURATION}
        animate={false}
      />

      <VisuallyHidden>
        <Alert>
          Item {currentIndex + 1} of {slides.length}
        </Alert>
      </VisuallyHidden>
    </Carousel>
  );
}

export default App;
