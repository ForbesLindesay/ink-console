import State from '../State';

export default function pin(s: State): State {
  return {
    ...s,
    pinned: true,
    lastEntryToDisplayIndex: s.log.length - 1,
    offset: 0,
  };
}
