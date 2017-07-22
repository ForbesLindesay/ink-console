import renderEntry from './renderEntry';
import Props from './Props';
import State from './State';

export default function renderString(s: State, p: Props): string {
  const dirOptions = {depth: s.depth, expandKey: 'l'};
  let {lastEntryToDisplayIndex, offset} = s;
  if (s.pinned) {
    lastEntryToDisplayIndex = s.log.length - 1;
    offset = 0;
  }
  const output: string[] = [];
  function addLine(str: string) {
    if (output.length < p.lines) {
      output.push(str);
    }
  }
  if (s.log.length) {
    // TODO: make expand key configurable
    const lastEntry = renderEntry(
      s.log[lastEntryToDisplayIndex],
      dirOptions,
    ).split('\n');
    lastEntry.slice(0, lastEntry.length - offset).reverse().forEach(addLine);
    for (
      let i = lastEntryToDisplayIndex - 1;
      i >= 0 && output.length < p.lines;
      i--
    ) {
      renderEntry(s.log[i], dirOptions).split('\n').reverse().forEach(addLine);
    }
  }
  output.reverse();
  while (output.length < p.lines) {
    output.push('');
  }
  return output.join('\n');
}
