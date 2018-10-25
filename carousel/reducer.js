let [state, dispatch] = useReducer(
  (state, action) => {
    switch (action.type) {
      case "NEXT":
      case "PROGRESS":
        return {
          ...state,
          isPlaying: action.type === "PROGRESS",
          currentIndex:
            (state.currentIndex + 1) % slides.length
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
      default:
        return state;
    }
  },
  {
    currentIndex: 0,
    isPlaying: false
  }
);
