import { callAll } from '../src/utils';

test('callAll calls all functions', () => {
  const doThing = jest.fn();
  const doAnotherThing = jest.fn();
  callAll(doThing, doAnotherThing)('test');
  expect(doThing).toBeCalledWith('test');
  expect(doAnotherThing).toBeCalledWith('test');
});
