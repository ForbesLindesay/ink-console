import assert = require('assert');
import countRows from '../countRows';
import State from '../State';

export default function down(s: State): State {
  if (s.pinned) {
    return s;
  }
  if (s.offset === 0) {
    if (s.lastEntryToDisplayIndex >= s.log.length - 1) {
      return s;
    }
    const lastEntryToDisplayIndex = s.lastEntryToDisplayIndex + 1;
    const lastEntryLines = countRows(s.log[lastEntryToDisplayIndex], s.depth);
    assert(lastEntryLines >= 1, 'All log entries should be at least one line');
    return {
      ...s,
      lastEntryToDisplayIndex,
      offset: lastEntryLines - 1,
    };
  } else {
    return {
      ...s,
      offset: s.offset - 1,
    };
  }
}
