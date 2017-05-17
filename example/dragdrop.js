var parent = document.getElementById("parent");
var widget = document.getElementById("widget");

var mouseDowns$ = Servable.Observable.fromEvent("mousedown", widget);
var parentMouseMoves$ = Servable.Observable.fromEvent("mousemove", parent);
var parentMouseUps$ = Servable.Observable.fromEvent("mouseup", parent);

var drags$ = mouseDowns$
  .flatMap(() => parentMouseMoves$.takeUntil(parentMouseUps$))
  .do((e) => {
    widget.style.left = e.clientX + "px";
    widget.style.top = e.clientY + "px";
  });

var subscription =
  drags$.subscribe();