import {h, Component, Text} from 'ts-ink';

import LogCatcher from './LogCatcher';

import Props from './Props';
import renderString from './renderString';
import State from './State';

import * as actions from './actions';

const CONTRACT_KEY = 'h';
const EXPAND_KEY = 'l';
const UP_KEY = 'k';
const DOWN_KEY = 'j';
const PAGE_UP_KEY = 'K';
const PAGE_DOWN_KEY = 'J';
const PIN_KEY = 'G';

export {LogCatcher, Props};

export default class LogOutput extends Component<Props, State> {
  readonly state: Readonly<State> = {
    log: [],
    pinned: true,
    lastEntryToDisplayIndex: 0,
    offset: 0,
    depth: 2,
  };
  _reset: undefined | (() => void);
  _logCatcher: undefined | LogCatcher;

  private handleKeyPress = (ch: string) => {
    switch (ch) {
      case UP_KEY:
        this.setState(s => actions.up(s, this.props));
        break;
      case DOWN_KEY:
        this.setState(actions.down);
        break;
      case PAGE_UP_KEY:
        this.setState(s => actions.pageUp(s, this.props));
        break;
      case PAGE_DOWN_KEY:
        this.setState(s => actions.pageDown(s, this.props));
        break;
      case PIN_KEY:
        this.setState(actions.pin);
        break;
      case EXPAND_KEY:
        this.setState(s => actions.expand(s, this.props));
        break;
      case CONTRACT_KEY:
        this.setState(s => actions.shrink(s, this.props));
        break;
    }
  };

  render() {
    return (
      <div>
        <div>
          <Text bold>Log Output</Text>
        </div>
        <br />
        <div>{renderString(this.state, this.props)}</div>
        <br />
        <div>
          <Text>
            (Move up: <Text blue>{UP_KEY}</Text>, Move down:{' '}
            <Text blue>{DOWN_KEY}</Text>, Page up:{' '}
            <Text blue>{PAGE_UP_KEY}</Text>, Page down:{' '}
            <Text blue>{PAGE_DOWN_KEY}</Text>, Pin to end of log:{' '}
            <Text blue>{PIN_KEY}</Text>, Expand objects:{' '}
            <Text blue>{EXPAND_KEY}</Text>, Shrink objects:{' '}
            <Text blue>{CONTRACT_KEY}</Text>)
          </Text>
        </div>
      </div>
    );
  }
  componentDidMount() {
    process.stdin.on('keypress', this.handleKeyPress);
    this._updateLogCatcher(this.props);
  }
  private _handleLogCatcherUpdate = () => {
    if (this.props.logCatcher) {
      this.setState({log: this.props.logCatcher.getLog()});
    } else if (this._logCatcher) {
      this.setState({log: this._logCatcher.getLog()});
    }
  };
  private _updateLogCatcher(props: Props) {
    if (this._reset) {
      this._reset();
    }
    if (this._logCatcher) {
      this._logCatcher.dispose();
      this._logCatcher = undefined;
    }
    if (this.props.logCatcher) {
      this._reset = this.props.logCatcher.onUpdate(
        this._handleLogCatcherUpdate,
      );
    } else {
      this._logCatcher = new LogCatcher();
      this._reset = this._logCatcher.onUpdate(this._handleLogCatcherUpdate);
    }
    this._handleLogCatcherUpdate();
  }
  componentWillReceiveProps(props: Props) {
    if (this.props.logCatcher !== props.logCatcher) {
      this._updateLogCatcher(props);
    }
  }
  componentWillUnmount() {
    process.stdin.removeListener('keypress', this.handleKeyPress);
    if (this._reset) {
      this._reset();
    }
    if (this._logCatcher) {
      this._logCatcher.dispose();
      this._logCatcher = undefined;
    }
  }
}
