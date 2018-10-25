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
  let ref = useRef();

  useEffect(
    () => {
      if (isCurrent && takeFocus) {
        ref.current.focus();
      }
    },
    [isCurrent, takeFocus]
  );

  return (
    <li
      ref={ref}
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
  let progress = useProgress(animate, time);

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
  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "NEXT":
        case "PROGRESS":
          return {
            ...state,
            isPlaying: action.type === "PROGRESS",
            currentIndex:
              (state.currentIndex + 1) %
              slides.length
          };
        case "PAUSE":
          return {
            ...state,
            isPlaying: false
          };
        case "PLAY":
          return {
            ...state,
            isPlaying: true
          };
        case "PREV":
          return {
            ...state,
            currentIndex:
              (state.currentIndex -
                1 +
                slides.length) %
              slides.length,
            isPlaying: false
          };
        case "GOTO":
          return {
            ...state,
            takeFocus: true,
            currentIndex: action.index
          };
        case "UNSET_FOCUS":
          return {
            ...state,
            takeFocus: false
          };
        default:
          return state;
      }
    },
    {
      currentIndex: 0,
      isPlaying: false,
      takeFocus: false
    }
  );

  useEffect(
    () => {
      if (state.isPlaying) {
        let timeout = setTimeout(() => {
          dispatch({ type: "PROGRESS" });
        }, SLIDE_DURATION);
        return () => clearTimeout(timeout);
      }
    },
    [state.currentIndex, state.isPlaying]
  );

  useEffect(
    () => {
      if (state.takeFocus) {
        dispatch({ type: "UNSET_FOCUS" });
      }
    },
    [state.takeFocus]
  );

  return (
    <Carousel aria-label="Images from Space">
      <Slides>
        {slides.map((image, index) => (
          <Slide
            key={index}
            id={`image-${index}`}
            image={image.img}
            title={image.title}
            isCurrent={index === state.currentIndex}
            takeFocus={state.takeFocus}
            children={image.content}
          />
        ))}
      </Slides>

      <SlideNav>
        {slides.map((slide, index) => (
          <SlideNavItem
            key={index}
            isCurrent={index === state.currentIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => {
              dispatch({ type: "GOTO", index });
            }}
          />
        ))}
      </SlideNav>

      <Controls>
        {state.isPlaying ? (
          <IconButton
            aria-label="Pause"
            onClick={() => {
              dispatch({ type: "PAUSE" });
            }}
            children={<FaPause />}
          />
        ) : (
          <IconButton
            aria-label="Play"
            onClick={() => {
              dispatch({ type: "PLAY" });
            }}
            children={<FaPlay />}
          />
        )}
        <SpacerGif width="10px" />
        <IconButton
          aria-label="Previous Slide"
          onClick={() => {
            dispatch({ type: "PREV" });
          }}
          children={<FaBackward />}
        />
        <IconButton
          aria-label="Next Slide"
          onClick={() => {
            dispatch({ type: "NEXT" });
          }}
          children={<FaForward />}
        />
      </Controls>

      <ProgressBar
        key={state.currentIndex + state.isPlaying}
        time={SLIDE_DURATION}
        animate={state.isPlaying}
      />

      <VisuallyHidden>
        <Alert>
          Item {state.currentIndex + 1} of{" "}
          {slides.length}
        </Alert>
      </VisuallyHidden>
    </Carousel>
  );
}

export default App;
