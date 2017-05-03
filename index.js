class Observable {
	constructor (subscriber) {
		this.subscriber = subscriber;
	}
	
	subscribe ({ next }) {
		const dispose = this.subscriber({ next });
		
		if (typeof dispose === 'function') {
			return dispose;
		}
		
		return () => null;
	}
	
	map (mapCallback) {
		return new Observable(({ next }) => {
			const unsub = this.subscribe({
				next(value) {
					next(mapCallback(value));
				}
			});
			
			return unsub;
		})
	}
	
	filter (mapCallback) {
		return new Observable(({ next }) => {
			const unsub = this.subscribe({
				next(value) {
					if(mapCallback(value)) {
						next(value);
					}
				}
			});
			
			return unsub;
		})
	}
}

// test event binding
const inputObservable$ = new Observable(({ next }) => {
	const input = document.getElementById('myInput');
	
	const listener = () => {
		next(input.value);
	}
	
	input.addEventListener('input', listener, false);
	
	return () => input.removeEventListener('input', listener, false);
})
const div = document.getElementById('myText');

inputObservable$
	// .filter((value) => value.length > 4)
	.map(value => value.split('').reverse().join(''))
  .subscribe({
		next (value) {
			div.textContent = value;
		}
	});