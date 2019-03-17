/* eslint-disable brace-style */
const Assets = require("./assets");
const Layouts = require("./layouts");
const Config = require("./config");
const Behaviors = require("./behaviors");
const Draw = {};

Draw.el = null;

Draw.init = (el) => {
  Draw.el = el;
  Behaviors.el = el;
  Behaviors.SFX = el.SFX;
};

// -----------------------------------------------------------------------------
// DRAW NUMERICAL UI

Draw.numericalUI = () => {
  var wrapper = document.createElement("a-entity");
  wrapper.setAttribute("position", "0.025 0 0.12");
  wrapper.setAttribute("rotation", "0 25 0");
  wrapper.setAttribute("data-ui", true);

  var el = document.createElement("a-rounded");
  el.setAttribute("width", "0.280");
  el.setAttribute("height", "0.360");
  el.setAttribute("radius", "0.02");
  el.setAttribute("color", Config.KEYBOARD_COLOR);
  wrapper.appendChild(el);

  return wrapper;
};

// -----------------------------------------------------------------------------
// DRAW MAIN UI

Draw.mainUI = () => {
  var wrapper = document.createElement("a-entity");
  wrapper.setAttribute("position", "0.312 0 0");
  wrapper.setAttribute("data-ui", true);

  var el = document.createElement("a-rounded");
  el.setAttribute("width", "0.840");
  el.setAttribute("height", "0.360");
  el.setAttribute("radius", "0.02");
  el.setAttribute("color", Config.KEYBOARD_COLOR);
  wrapper.appendChild(el);

  return wrapper;
};

// -----------------------------------------------------------------------------
// DRAW ACTION UI

Draw.actionsUI = () => {
  var wrapper = document.createElement("a-entity");
  wrapper.setAttribute("position", "1.180 0 0.01");
  wrapper.setAttribute("rotation", "0 -25 0");
  wrapper.setAttribute("data-ui", true);

  var el = document.createElement("a-rounded");
  el.setAttribute("width", "0.180");
  el.setAttribute("height", "0.360");
  el.setAttribute("radius", "0.02");
  el.setAttribute("color", Config.KEYBOARD_COLOR);
  wrapper.appendChild(el);

  return wrapper;
};

// -----------------------------------------------------------------------------
// DRAW NUMERICAL LAYOUT

Draw.numericalLayout = () => {
  var data = Layouts.numerical;
  var wrapper = document.createElement("a-entity");
  wrapper.setAttribute("position", "0.02 0.26 0.001");

  let indexY = 0;
  for (var i in data) {
    let keyId = "num-" + i;
    let key = Draw.key(keyId, data[i].type, data[i].value);
    let indexX = i % 3;
    let x = Config.KEY_WIDTH * indexX;
    let y = Config.KEY_WIDTH * indexY;
    key.setAttribute("position", `${x} -${y} 0`);
    if (indexX === 2) { indexY++; }
    wrapper.appendChild(key);
  }

  return wrapper;
};

// -----------------------------------------------------------------------------
// DRAW ALPHABETICAL LAYOUT

Draw.alphabeticalLayout = () => {
  var data = Layouts.alphabetical;
  var wrapper = document.createElement("a-entity");
  wrapper.setAttribute("position", "0.02 0.26 0.001");

  let indexY = 0;
  let indexX = 0;
  let prevWasSpace = false;

  for (var i in data) {
    let keyId = "main-" + i;
    let key = Draw.key(keyId, data[i].type, data[i].value);

    let x = Config.KEY_WIDTH * indexX;
    let y = Config.KEY_WIDTH * indexY;

    // Add left padding on the second line
    if (indexY === 1) {
      x = x + Config.KEY_WIDTH / 2;
    }

    // Add margin on the key next to the spacebar key
    if (prevWasSpace) {
      x = x + Config.SPACE_KEY_WIDTH - Config.KEY_WIDTH + (0.055 * 2);
    }

    // Add margin to the spacebar key
    if (data[i].type === "spacebar") {
      prevWasSpace = true;
      x = x + 0.055;
      y = Config.KEY_WIDTH * indexY - 0.01;
    }

    key.setAttribute("position", `${x} -${y} 0`);

    if (indexY === 1 && indexX === 8) {
      indexX = -1;
      indexY++;
    } else if (indexX === 9) {
      indexX = -1;
      indexY++;
    }
    indexX++;

    wrapper.appendChild(key);
  }

  return wrapper;
};

// -----------------------------------------------------------------------------
// DRAW SYMBOLS LAYOUT

Draw.symbolsLayout = () => {
  var data = Layouts.symbols;
  var wrapper = document.createElement("a-entity");
  wrapper.setAttribute("position", "0.02 0.26 0.001");

  let indexY = 0;
  let indexX = 0;
  let prevWasSpace = false;

  for (var i in data) {
    let keyId = "symbols-" + i;
    let key = Draw.key(keyId, data[i].type, data[i].value);
    let x = Config.KEY_WIDTH * indexX;
    let y = Config.KEY_WIDTH * indexY;

    // Add margin on the key next to the spacebar key
    if (prevWasSpace) {
      x = x + Config.SPACE_KEY_WIDTH - Config.KEY_WIDTH + (0.055 * 2);
    }

    // Add margin to the spacebar key
    if (data[i].type === "spacebar") {
      prevWasSpace = true;
      x = x + 0.055;
      y = Config.KEY_WIDTH * indexY - 0.01;
    }

    key.setAttribute("position", `${x} -${y} 0`);

    if (indexX === 9) {
      indexX = -1;
      indexY++;
    }
    indexX++;
    wrapper.appendChild(key);
  }

  return wrapper;
};

// -----------------------------------------------------------------------------
// DRAW ACTIONS LAYOUT

Draw.actionsLayout = () => {
  var data = Layouts.actions;
  var wrapper = document.createElement("a-entity");
  wrapper.setAttribute("position", "0.02 0.26 0.001");

  let valY = 0;
  for (var i in data) {
    let keyId = "action-" + i;
    let key = Draw.key(keyId, data[i].type, data[i].value);

    key.setAttribute("position", `0 -${valY} 0`);
    if (i === 0) {
      valY += Config.ACTION_WIDTH + 0.01;
    } else if (i === 1) {
      valY += Config.KEY_WIDTH + 0.01;
    }
    wrapper.appendChild(key);
  }

  return wrapper;
};

// -----------------------------------------------------------------------------
// DRAW KEY

Draw.key = (id, type, value) => {
  var el = document.createElement("a-rounded");
  el.setAttribute("key-id", id);
  el.setAttribute("width", Config.KEY_WIDTH);
  el.setAttribute("height", Config.KEY_WIDTH);
  el.setAttribute("radius", "0.008");
  el.setAttribute("position", "0 0 0");
  el.setAttribute("key-type", type);
  el.setAttribute("key-value", value);
  el.setAttribute("color", Config.KEYBOARD_COLOR);

  // ---------------------------------------------------------------------------
  // EVENTS

  Behaviors.addKeyEvents(el);

  // ---------------------------------------------------------------------------
  // SHADOW

  el.shadow_el = document.createElement("a-image");
  el.shadow_el.setAttribute("width", Config.KEY_WIDTH * 1.25);
  el.shadow_el.setAttribute("height", Config.KEY_WIDTH * 1.25);
  el.shadow_el.setAttribute("position", Config.KEY_WIDTH / 2 + " " + Config.KEY_WIDTH / 2 + " -0.002");
  el.shadow_el.setAttribute("src", Assets.aframeKeyboardShadow);
  el.appendChild(el.shadow_el);

  // ---------------------------------------------------------------------------
  // TEXT KEY

  if (type === "text" || type === "spacebar" || type === "symbol") {
    var letterEl = document.createElement("a-text");
    letterEl.setAttribute("value", value);
    letterEl.setAttribute("color", "#dbddde");
    letterEl.setAttribute("position", Config.KEY_WIDTH / 2 + " " + Config.KEY_WIDTH / 2 + " 0.01");
    letterEl.setAttribute("scale", "0.16 0.16 0.16");
    letterEl.setAttribute("align", "center");
    letterEl.setAttribute("baseline", "center");
    el.appendChild(letterEl);
  }

  // ---------------------------------------------------------------------------
  // SPACEBAR KEY

  if (type === "spacebar") {
    el.setAttribute("width", Config.SPACE_KEY_WIDTH);
    el.setAttribute("height", Config.SPACE_KEY_HEIGHT);
    el.setAttribute("color", "#404b50");
    el.shadow_el.setAttribute("width", Config.SPACE_KEY_WIDTH * 1.12);
    el.shadow_el.setAttribute("height", Config.SPACE_KEY_HEIGHT * 1.2);
    el.shadow_el.setAttribute("position", Config.SPACE_KEY_WIDTH / 2 + " " + Config.SPACE_KEY_HEIGHT / 2 + " -0.02");
    letterEl.setAttribute("color", "#adb1b3");
    letterEl.setAttribute("scale", "0.12 0.12 0.12");
    letterEl.setAttribute("position", Config.SPACE_KEY_WIDTH / 2 + " " + Config.SPACE_KEY_HEIGHT / 2 + " 0");
  }

  // ---------------------------------------------------------------------------
  // SYMBOL KEY

  else if (type === "symbol") {
    letterEl.setAttribute("scale", "0.12 0.12 0.12");
  }

  // ---------------------------------------------------------------------------
  // ACTION KEY

  if (type === "backspace" || type === "enter" || type === "dismiss") {
    el.setAttribute("width", Config.ACTION_WIDTH);
    el.shadow_el.setAttribute("width", Config.ACTION_WIDTH * 1.25);
    el.shadow_el.setAttribute("position", Config.ACTION_WIDTH / 2 + " " + Config.KEY_WIDTH / 2 + " -0.02");
  }

  let iconEl;

  // ---------------------------------------------------------------------------
  // SHIFT KEY

  if (type === "shift") {
    iconEl = document.createElement("a-image");
    iconEl.setAttribute("data-type", "icon");
    iconEl.setAttribute("width", "0.032");
    iconEl.setAttribute("height", "0.032");
    iconEl.setAttribute("position", "0.04 0.04 0.01");
    iconEl.setAttribute("src", Assets.aframeKeyboardShift);
    el.appendChild(iconEl);
    Draw.el.shiftKey = el;
  }

  // ---------------------------------------------------------------------------
  // GLOBAL

  else if (type === "global") {
    iconEl = document.createElement("a-image");
    iconEl.setAttribute("width", "0.032");
    iconEl.setAttribute("height", "0.032");
    iconEl.setAttribute("position", "0.04 0.04 0.01");
    iconEl.setAttribute("src", Assets.aframeKeyboardGlobal);
    el.appendChild(iconEl);
  }

  // ---------------------------------------------------------------------------
  // BACKSPACE

  else if (type === "backspace") {
    iconEl = document.createElement("a-image");
    iconEl.setAttribute("width", "0.046");
    iconEl.setAttribute("height", "0.046");
    iconEl.setAttribute("position", "0.07 0.04 0.01");
    iconEl.setAttribute("src", Assets.aframeKeyboardBackspace);
    el.appendChild(iconEl);
  }

  // ---------------------------------------------------------------------------
  // ENTER

  else if (type === "enter") {
    el.setAttribute("height", Config.ACTION_WIDTH);
    el.shadow_el.setAttribute("height", Config.ACTION_WIDTH * 1.25);
    el.shadow_el.setAttribute("position", Config.ACTION_WIDTH / 2 + " " + Config.ACTION_WIDTH / 2 + " -0.02");

    var circleEl = document.createElement("a-circle");
    circleEl.setAttribute("color", "#4285f4");
    circleEl.setAttribute("radius", 0.044);
    circleEl.setAttribute("position", "0.07 0.07 0.01");
    el.appendChild(circleEl);

    iconEl = document.createElement("a-image");
    iconEl.setAttribute("width", "0.034");
    iconEl.setAttribute("height", "0.034");
    iconEl.setAttribute("position", "0.07 0.07 0.011");
    iconEl.setAttribute("src", Assets.aframeKeyboardEnter);
    el.appendChild(iconEl);
  }

  // ---------------------------------------------------------------------------
  // DISMISS

  else if (type === "dismiss") {
    iconEl = document.createElement("a-image");
    iconEl.setAttribute("width", "0.046");
    iconEl.setAttribute("height", "0.046");
    iconEl.setAttribute("position", "0.07 0.04 0.01");
    iconEl.setAttribute("src", Assets.aframeKeyboardDismiss);
    el.appendChild(iconEl);
  }

  return el;
};

module.exports = Draw;
