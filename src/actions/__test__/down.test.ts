import down from '../down';

test('down', () => {
  const pinnedState = {
    pinned: true,
    log: [],
    depth: 0,
    offset: 0,
    lastEntryToDisplayIndex: 0,
  };
  expect(down(pinnedState)).toBe(pinnedState);
  const noRows = {
    pinned: false,
    log: [],
    depth: 0,
    offset: 0,
    lastEntryToDisplayIndex: 0,
  };
  expect(down(noRows)).toBe(noRows);
  const lastRow = {
    pinned: false,
    log: [{type: 'log' as 'log', values: []}],
    depth: 0,
    offset: 0,
    lastEntryToDisplayIndex: 0,
  };
  expect(down(lastRow)).toBe(lastRow);
  const noOffset = {
    pinned: false,
    log: [
      {type: 'log' as 'log', values: ['foo\nbar\nbaz']},
      {type: 'log' as 'log', values: ['foo\nbar\nbaz']},
    ],
    depth: 0,
    offset: 0,
    lastEntryToDisplayIndex: 0,
  };
  expect(down(noOffset)).toEqual({
    ...noOffset,
    lastEntryToDisplayIndex: 1,
    offset: 2,
  });
  const withOffset = {
    ...noOffset,
    lastEntryToDisplayIndex: 1,
    offset: 2,
  };
  expect(down(withOffset)).toEqual({
    ...withOffset,
    offset: 1,
  });
});
