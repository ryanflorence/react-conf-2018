import React from "react";

class Progress extends React.Component {
  state = {
    progress: 0
  };

  componentDidMount() {
    this.animate();
  }

  animate() {
    if (this.props.animate) {
      let start = null;
      let step = timestamp => {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        this.setState({ progress });
        if (progress < this.props.time) {
          this.rafId = requestAnimationFrame(step);
        }
      };
      this.rafId = requestAnimationFrame(step);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.animate !== this.props.animate ||
      prevProps.time !== this.props.time
    ) {
      cancelAnimationFrame(this.rafId);
      this.animate();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
  }

  render() {
    let progress = this.props.animate
      ? Math.min(
          this.state.progress / this.props.time,
          this.props.time
        )
      : 0;
    return this.props.children(progress);
  }
}

export default Progress;
