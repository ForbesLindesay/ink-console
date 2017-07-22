import LogEntry from './LogEntry';

export default interface State {
  /**
   * All log entries, starting with the oldest entry
   */
  log: LogEntry[];
  /**
   * Is the view pinned to the bottom
   */
  pinned: boolean;
  /**
   * What is the index of the last entry visible on the screen
   */
  lastEntryToDisplayIndex: number;
  /**
   * How many lines of the last entry are hidden due to scrolling
   */
  offset: number;
  /**
   * What depth should log entries with nested objects be rendered to
   */
  depth: number;
};
