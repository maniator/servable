const noop = () => null;

class Observable {
    constructor (observer = noop) {
        this.observer = observer;
    }

    subscribe ({ next = noop, error = noop, complete = noop }) {
        return this.observer({ next, error, complete }) || noop;
    }

    map (cb = (v) => v) {
        return new Observable(({ next }) => {
            return this.subscribe({
                next (value) {
                    next(cb(value));
                }
            })
        })
    }

    do (cb = (v) => v) {
        return new Observable(({ next }) => {
            return this.subscribe({
                next (value) {
                    cb(value);

                    next(value);
                }
            })
        })
    }

    filter (cb = (v) => v) {
        return new Observable(({ next }) => {
            return this.subscribe({
                next (value) {
                    if (cb(value)) {
                        next(value);
                    }
                }
            })
        })
    }
}

const inputObservable$ = new Observable(({next}) => {
    const max = 10;
    let i = 0;

    console.log('I AM RUNNING')

    while (i <= max) {
        ((idx) => setTimeout(() => next(idx), idx * 1000))(i);
        i++;
    }
});

const inputObservable2$ = new Observable(({ next }) => {
    const input = document.getElementById('myInput');

    const l = () => {
        next(input.value);
    };

    input.addEventListener('input', l, false);

    return () => input.removeEventListener('input', l, false)
});

const unsubscribe = inputObservable2$
    .do(console.log.bind(null, 'IN THE DO FN'))
    .filter((value) => value.length > 2 && value.length < 10)
    .map((text) => text.split('').reverse().join(''))
    .subscribe({
        next: (value) => {
            console.log('Input value', value);
        }
    });

document.getElementById('unsub')
    .addEventListener('click', unsubscribe, false);
