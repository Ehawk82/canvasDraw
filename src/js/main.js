var cColor = {

    r: 25,
    g: 55,
    b: 75

};
    
if(window.addEventListener) {
window.addEventListener('load', function () {
  LSinit("cColor", cColor);
  var canvas = createEle("canvas"), context = canvas.getContext('2d'), tool;
  canvas.width = 1200;
  canvas.height = 600;

  dvContain.append(canvas);
  function init () {
    if (!canvas) {
      alert('Error: I cannot find the canvas element!');
      return;
    }
    if (!canvas.getContext) {
      alert('Error: no canvas.getContext!');
      return;
    }
    context = canvas.getContext('2d');
    if (!context) {
      alert('Error: failed to getContext!');
      return;
    }

    tool = new tool_pencil();

    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);
  }
  function tool_pencil () {
    var ccc = parseLS("cColor");

    var tool = this;
    this.started = false;
    // This is called when you start holding down the mouse button.
    // This starts the pencil drawing.
    this.mousedown = function (ev) {
        context.beginPath();
        context.strokeStyle = "rgba(" + ccc.r + ", " + ccc.g + ", " + ccc.b + ", 1)";
        context.moveTo(ev._x, ev._y);
        tool.started = true;
    };
    // This function is called every time you move the mouse. Obviously, it only 
    // draws if the tool.started state is set to true (when you are holding down 
    // the mouse button).
    this.mousemove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
        context.stroke();
      }
    };
    // This is called when you release the mouse button.
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
      }
    };
  }
  // The general-purpose event handler. This function just determines the mouse 
  // position relative to the canvas element.
  function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

    // Call the event handler of the tool.
    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }

  init();

}, false); }
