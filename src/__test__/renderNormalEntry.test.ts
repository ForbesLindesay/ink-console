import renderNormalEntry from '../renderNormalEntry';

test('renderNormalEntry', () => {
  expect(
    renderNormalEntry({type: 'log', values: ['Foo', 10, {foo: 'bar'}]}),
  ).toBe("Foo 10 { foo: 'bar' }");
});
