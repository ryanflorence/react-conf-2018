import { useState, useEffect } from "react";

let useMedia = query => {
  let [matches, setMatches] = useState(window.matchMedia(query));

  useEffect(
    () => {
      let media = window.matchMedia(query);
      let listener = () => setMatches(media.matches);
      media.addListener(listener);
      listener();
      return () => media.removeListener(listener);
    },
    [query]
  );

  return matches;
};

export default useMedia;
