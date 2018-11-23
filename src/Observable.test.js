import { Observable } from "./Observable";
import { Subscription } from "./Subscription";

describe('Observable', () => {
  test('new Observable will give you a new Observable instance', () => {
    expect(new Observable()).toBeInstanceOf(Observable);
    expect(Observable.create()).toBeInstanceOf(Observable);
  });

  test('observerCallback is the same as the function passed to the constructor', () => {
    const callback = () => null;
    const obs$ = new Observable(callback);
    expect(obs$.observerCallback).toBe(callback);
  });

  test('subscribe returns a subscription object', () => {
    const obs$ = new Observable();
    expect(obs$.subscribe()).toBeInstanceOf(Subscription);
  });

  test('the observerCallback will not be called when subscribe is never called', () => {
    expect.assertions(0);
    new Observable(() => {
      expect(true).toBeTruthy();
    });
  });

  test('the observerCallback will be called when subscribe is called once', () => {
    expect.assertions(1);
    const obs$ = new Observable(() => {
      expect(true).toBeTruthy();
    });
    obs$.subscribe();
  });

  test('the error callback will get hit if observerCallback throws an error', () => {
    expect.assertions(2);
    const obs$ = new Observable(() => {
      expect(true).toBeTruthy();

      throw new Error('I have an error');
    });
    obs$.subscribe({
      error() {
        expect(true).toBeTruthy()
      }
    });
  });

  test('the error callback will receive the error thrown by the observerCallback', () => {
    expect.assertions(2);
    const error = new Error('I have an error');
    const obs$ = new Observable(() => {
      expect(true).toBeTruthy();

      throw error;
    });
    obs$.subscribe({
      error(_error) {
        expect(_error).toBe('error')
      }
    });
  });
});

