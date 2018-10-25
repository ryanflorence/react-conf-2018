import React, { useState, useEffect } from "react";

class Media extends React.Component {
  state = {
    matches: window.matchMedia(this.props.query)
      .matches
  };

  componentDidMount() {
    this.setup();
  }

  setup() {
    let media = window.matchMedia(this.props.query);
    if (media.matches !== this.state.matches) {
      this.setState({ matches: media.matches });
    }
    let listener = () =>
      this.setState({ matches: media.matches });
    media.addListener(listener);
    this.removeListener = () =>
      media.removeListener(listener);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.removeListener();
      this.setup();
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return this.props.children(this.state.matches);
  }
}

function App() {
  return (
    <Media query="(max-width: 400px)">
      {small => (
        <Media query="(min-width: 800px)">
          {large => (
            <div className="Media">
              <h1>Media</h1>
              <p>
                Small? {small ? "Yep" : "Nope"}.
              </p>
              <p>
                Large? {large ? "Yep" : "Nope"}.
              </p>
            </div>
          )}
        </Media>
      )}
    </Media>
  );
}

export default App;
