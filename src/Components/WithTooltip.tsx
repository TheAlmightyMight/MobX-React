import React from "react";
import Hint from "./Hint";

interface Arguments {
  Component: React.ComponentType<any>;
  info: string;
}

interface State {
  shown: boolean;
}

interface Props {
  handler: React.Dispatch<React.SetStateAction<any>>;
}

const WithTooltip = <T extends Arguments>({ Component, info }: T) => {
  return class Wrapper extends React.PureComponent<Props> {
    state: State;

    constructor(props: Props) {
      super(props);

      this.state = { shown: false };
    }

    mouseEnterHandler() {
      this.setState({ shown: true });
    }

    mouseLeaveHandler() {
      this.setState({ shown: false });
    }

    render() {
      return (
        <div
          style={{ position: "relative" }}
          onMouseEnter={this.mouseEnterHandler.bind(this)}
          onMouseLeave={this.mouseLeaveHandler.bind(this)}
        >
          {this.state.shown ? <Hint info={info} /> : null}
          <Component handler={this.props.handler} />
        </div>
      );
    }
  };
};

export default WithTooltip;
