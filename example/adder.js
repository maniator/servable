// same example as https://github.com/cujojs/most#simple-example

import { fromEvent, combine } from "../lib/index.js";

const xInput = document.querySelector('input.x');
const yInput = document.querySelector('input.y');
const resultNode = document.querySelector('.result');

const add = (x, y) => x + y;

const toNumber = e => Number(e.target.value);

const renderResult = result => {
  resultNode.textContent = result
};

// x represents the current value of xInput
const x = fromEvent('input', xInput).map(toNumber);

// y represents the current value of yInput
const y = fromEvent('input', yInput).map(toNumber);

// result is the live current value of adding x and y
const result = combine([x, y], add);

// Observe the result value by rendering it to the resultNode
result.subscribe(renderResult);
