import {inspect} from 'util';
import LogEntry from './LogEntry';

function sum(values: number[]): number {
  return values.reduce((acc, count) => acc + count, 0);
}
function countDirValueRows(value: any, depth: number): number {
  if (Array.isArray(value)) {
    if (depth === 0 || value.length === 0) {
      return 1;
    }
    return (
      // +2 for row with the `[` character and row with the `]` character
      2 + sum(value.map((v: any) => countDirValueRows(v, depth - 1)))
    );
  } else if (value && typeof value === 'object') {
    if (depth === 0 || Object.keys(value).length === 0) {
      return 1;
    }
    return (
      2 + // +2 for row with the `{` character and row with the `}` character
      sum(
        Object.keys(value).map(name =>
          countDirValueRows(value[name], depth - 1),
        ),
      )
    );
  }
  return inspect(value).split('\n').length;
}

function countNormalValueRows(values: any[]): number {
  return (
    1 +
    sum(
      values.map(
        v => (typeof v === 'string' ? v : inspect(v)).split('\n').length - 1,
      ),
    )
  );
}

export default function countRows(entry: LogEntry, depth: number): number {
  if (entry.type === 'dir') {
    return countDirValueRows(entry.value, depth);
  } else {
    return countNormalValueRows(entry.values);
  }
}
