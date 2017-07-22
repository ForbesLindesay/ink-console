import countRows from '../countRows';
import Props from '../Props';
import State from '../State';
import topStop from './topStop';

export default function up(s: State, props: Props): State {
  if (s.pinned) {
    let lines = 0;
    let i = 0;
    while (lines < props.lines + 1 && i < s.log.length) {
      lines += countRows(s.log[i], s.depth);
      i++;
    }
    if (lines < props.lines + 1) {
      // if there aren't enough lines, do not start scrolling
      return s;
    }
    // go up one from the bottom position
    return up(
      {
        ...s,
        pinned: false,
        lastEntryToDisplayIndex: s.log.length - 1,
        offset: 0,
      },
      props,
    );
  } else {
    const offset = s.offset + 1;
    if (offset === countRows(s.log[s.lastEntryToDisplayIndex], s.depth)) {
      return topStop(
        {
          ...s,
          offset: 0,
          lastEntryToDisplayIndex: s.lastEntryToDisplayIndex - 1,
        },
        props,
      );
    } else {
      return topStop({...s, offset}, props);
    }
  }
}
