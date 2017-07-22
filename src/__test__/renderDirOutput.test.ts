import {inspect} from 'util';
import renderDirOutput from '../renderDirOutput';

test('renderDirOutput', () => {
  expect(
    renderDirOutput({type: 'dir', value: 5}, {depth: 0, expandKey: 'l'}),
  ).toBe(inspect(5, {colors: true}));
  expect(
    renderDirOutput({type: 'dir', value: 'foo'}, {depth: 0, expandKey: 'l'}),
  ).toBe(inspect('foo', {colors: true}));
  expect(
    renderDirOutput({type: 'dir', value: {}}, {depth: 0, expandKey: 'l'}),
  ).toMatchSnapshot('{}, depth=0');
  expect(
    renderDirOutput({type: 'dir', value: {}}, {depth: 1, expandKey: 'l'}),
  ).toMatchSnapshot('{}, depth=1');
  expect(
    renderDirOutput({type: 'dir', value: {v: {}}}, {depth: 1, expandKey: 'l'}),
  ).toMatchSnapshot('{v: {}}, depth=1');
  expect(
    renderDirOutput({type: 'dir', value: {v: {}}}, {depth: 2, expandKey: 'l'}),
  ).toMatchSnapshot('{v: {}}, depth=2');
});
