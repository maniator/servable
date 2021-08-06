import { Observable } from "../lib/index.js";

const parent = document.body;
const widget = document.getElementById("widget");

const mouseDowns$ = Observable.fromEvent("mousedown", widget);
const parentMouseMoves$ = Observable.fromEvent("mousemove", parent);
const parentMouseUps$ = Observable.fromEvent("mouseup", parent);

const drags$ = mouseDowns$
  .flatMap(() => parentMouseMoves$.takeUntil(parentMouseUps$))
  .do((e) => {
    widget.style.left = e.clientX + "px";
    widget.style.top = e.clientY + "px";
  });

const subscription = drags$.subscribe();
