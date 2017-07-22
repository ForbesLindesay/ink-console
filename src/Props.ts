import {ILogCatcher} from './LogCatcher';

export default interface Props {
  /**
   * How many lines to display
   */
  lines: number;
  /**
   * A record of log messages
   */
  logCatcher?: ILogCatcher;
};
