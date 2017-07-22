import {inspect} from 'util';
import {NormalEntry} from './LogEntry';

export default function renderNormalEntry(entry: NormalEntry): string {
  return entry.values
    .map(v => (typeof v === 'string' ? v : inspect(v)))
    .join(' ');
}
