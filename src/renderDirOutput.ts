import {blue} from 'chalk';
import {inspect} from 'util';
import indentString = require('indent-string');
import {DirEntry} from './LogEntry';

export interface DirOutputOptions {
  depth: number;
  expandKey: string;
}

export function renderDirOutputValue(
  value: any,
  depth: number,
  options: DirOutputOptions,
): string {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }
    if (depth === 0) {
      return '[Array] ' + blue('(press ' + options.expandKey + ' to expand)');
    } else {
      return (
        '[\n' +
        indentString(
          value
            .map(v => renderDirOutputValue(v, depth - 1, options) + ',')
            .join('\n'),
          2,
        ) +
        '\n]'
      );
    }
  } else if (value && typeof value === 'object') {
    if (Object.keys(value).length === 0) {
      return '{}';
    }
    if (depth === 0) {
      return '[Object] ' + blue('(press ' + options.expandKey + ' to expand)');
    } else {
      return (
        '{\n' +
        indentString(
          Object.keys(value)
            .map(
              name =>
                name +
                ': ' +
                renderDirOutputValue(value[name], depth - 1, options) +
                ',',
            )
            .join('\n'),
          2,
        ) +
        '\n}'
      );
    }
  } else {
    return inspect(value, {colors: true});
  }
}

export default function renderDirOutput(
  entry: DirEntry,
  options: DirOutputOptions,
) {
  return renderDirOutputValue(entry.value, options.depth, options);
}
