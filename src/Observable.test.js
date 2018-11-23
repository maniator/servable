import { Observable } from "./Observable";

test('new Observable will give you a new Observable instance', () => {
  expect(new Observable()).toBeInstanceOf(Observable);
});

test('observerCallback is the same as the function passed to the constructor', () => {
  const callback = () => null;
  const obs$ = new Observable(callback)
  expect(obs$.observerCallback).toBe(callback);
});