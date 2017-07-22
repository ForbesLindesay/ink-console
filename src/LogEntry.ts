export interface DirEntry {
  type: 'dir';
  value: any;
}

export interface NormalEntry {
  type: 'log' | 'info' | 'warn' | 'error';
  values: any[];
}

export type LogEntry = DirEntry | NormalEntry;

export default LogEntry;
