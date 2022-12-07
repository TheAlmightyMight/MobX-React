import React, { useState } from "react";
import Hint from "./Hint";

interface Arguments {
  Component: React.ComponentType<{}>;
  info: string;
}

interface State {
  shown: boolean;
}

const WithTooltip = <T extends Arguments>({ Component, info }: T) => {
  return class Wrapper extends React.PureComponent {
    state: State;

    constructor(props: any) {
      super(props);

      this.state = { shown: false };
    }

    mouseEnterHandler() {
      console.log(this.state);
      this.setState({ shown: true });
    }

    mouseLeaveHandler() {
      console.log(this.state);
      this.setState({ shown: false });
    }

    render() {
      return (
        <div
          // onMouseOver={this.mouseOverHandler.bind(this)}
          onMouseEnter={this.mouseEnterHandler.bind(this)}
          onMouseLeave={this.mouseLeaveHandler.bind(this)}
        >
          {this.state.shown ? <Hint info={info} /> : null}
          <Component />
        </div>
      );
    }
  };
};

export default WithTooltip;
