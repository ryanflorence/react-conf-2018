import React, { useState, useEffect } from "react";

let useMedia = query => {
  let [matches, setMatches] = useState(
    window.matchMedia(query).matches
  );

  useEffect(
    () => {
      let media = window.matchMedia(query);
      let listener = () =>
        setMatches(media.matches);
      media.addListener(listener);
      listener();
      return () => media.removeListener(listener);
    },
    [query]
  );

  return matches;
};

function App() {
  let small = useMedia("(min-width: 600px)");
  let large = useMedia("(min-width: 1000px)");
  return (
    <div className="Media">
      <h1>Media</h1>
      <p>Small? {small ? "Yep" : "Nope"}.</p>
      <p>Large? {large ? "Yep" : "Nope"}.</p>
    </div>
  );
}

export default App;
