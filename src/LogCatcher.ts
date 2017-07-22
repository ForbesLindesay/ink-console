import consoleMethods from './consoleMethods';
import LogEntry from './LogEntry';

export interface ILogCatcher {
  getLog(): LogEntry[];
  onUpdate(fn: () => void): () => void;
}
export default class LogCatcher implements ILogCatcher {
  private readonly _log: LogEntry[] = [];
  private readonly _reset: (() => void)[];
  private readonly _handlers: Set<() => void> = new Set();
  constructor() {
    this._reset = consoleMethods.map(method => {
      const originalFn = console[method];
      const customLog = (...args: any[]) => {
        this._log.push(
          method === 'dir'
            ? {type: 'dir', value: args[0]}
            : {type: method, values: args},
        );
        for (const value of this._handlers) {
          value();
        }
      };
      (customLog as any).restore = (originalFn as any).restore;
      console[method] = customLog;
      return () => {
        if (console[method] === customLog) {
          console[method] = originalFn;
        }
      };
    });
  }

  getLog() {
    return this._log.slice();
  }

  onUpdate(fn: () => void) {
    this._handlers.add(fn);
    return () => this._handlers.delete(fn);
  }

  dispose() {
    this._reset.forEach(fn => fn());
  }
}
