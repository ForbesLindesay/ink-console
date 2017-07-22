import LogEntry from './LogEntry';
import renderDirOutput, {DirOutputOptions} from './renderDirOutput';
import renderNormalEntry from './renderNormalEntry';

export default function renderEntry(
  entry: LogEntry,
  options: DirOutputOptions,
): string {
  if (entry.type === 'dir') {
    return renderDirOutput(entry, options);
  }
  return renderNormalEntry(entry);
}
