import {h, Component, Text} from 'ts-ink';

let obj: any = {v: 42};

/**
 * A simple example of an ink component
 */
export default class Counter extends Component<{}, {i: number}> {
  state = {
    i: 0,
  };
  timer: any;

  componentDidMount() {
    this.timer = setInterval(() => {
      console.log(this.state.i + 1);
      console.dir(obj);
      obj = {v: [obj]};
      this.setState({
        i: this.state.i + 1,
      });
    }, 500);
  }

  componentWillUnmount() {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <Text green>
        {this.state.i} tests passed
      </Text>
    );
  }
}
