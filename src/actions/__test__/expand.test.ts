import expand from '../expand';

test('down', () => {
  const noLogEntries = {
    pinned: true,
    log: [],
    depth: 0,
    offset: 0,
    lastEntryToDisplayIndex: 0,
  };
  expect(expand(noLogEntries, {lines: 20})).toBe(noLogEntries);

  const noDirEntries = {
    pinned: true,
    log: [
      {type: 'log' as 'log', values: ['foo\nbar\nbaz']},
      {type: 'log' as 'log', values: ['foo\nbar\nbaz']},
    ],
    depth: 0,
    offset: 0,
    lastEntryToDisplayIndex: 0,
  };
  expect(expand(noDirEntries, {lines: 20})).toBe(noDirEntries);

  const expandable = {
    pinned: true,
    log: [
      {type: 'dir' as 'dir', value: ['foo\nbar\nbaz']},
      {type: 'log' as 'log', values: ['foo\nbar\nbaz']},
    ],
    depth: 0,
    offset: 0,
    lastEntryToDisplayIndex: 0,
  };
  expect(expand(expandable, {lines: 20})).toEqual({...expandable, depth: 1});

  const semiExpandable = {
    pinned: true,
    log: [
      {type: 'dir' as 'dir', value: ['foo\nbar\nbaz']},
      {type: 'log' as 'log', values: ['foo\nbar\nbaz']},
    ],
    depth: 1,
    offset: 0,
    lastEntryToDisplayIndex: 0,
  };
  expect(expand(semiExpandable, {lines: 20})).toBe(semiExpandable);


  const nonPinned = {
    pinned: false,
    log: [
      {type: 'log' as 'log', values: ['foo\nbar\nbaz']},
      {type: 'dir' as 'dir', value: ['foo\nbar\nbaz']},
    ],
    depth: 0,
    offset: 0,
    lastEntryToDisplayIndex: 0,
  };
  expect(expand(nonPinned, {lines: 20})).toBe(nonPinned);
});
