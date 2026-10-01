"use strict";
const {
  __spreadValues,
  __spreadProps,
  __export,
  __toESM,
  __toCommonJS
} = require('./esblib.cjs');


// src/util.ts
var util_exports = {};
__export(util_exports, {
  bufArrJoin: () => bufArrJoin,
  bufToString: () => bufToString,
  getLast: () => getLast,
  getLines: () => getLines,
  identity: () => identity,
  isString: () => isString,
  isStringLiteral: () => import_vendor_core.isStringLiteral,
  iteratorToArray: () => iteratorToArray,
  noop: () => noop,
  once: () => once,
  parseBool: () => parseBool,
  parseDuration: () => parseDuration,
  preferLocalBin: () => preferLocalBin,
  proxyOverride: () => proxyOverride,
  quote: () => quote,
  quotePowerShell: () => quotePowerShell,
  randomId: () => randomId,
  toCamelCase: () => toCamelCase
});
module.exports = __toCommonJS(util_exports);
var import_node_path = __toESM(require("path"), 1);
var import_node_process = __toESM(require("process"), 1);
var import_vendor_core = require("./vendor-core.cjs");
function noop() {
}
function identity(v) {
  return v;
}
function randomId() {
  return Math.random().toString(36).slice(2);
}
function isString(obj) {
  return typeof obj === "string";
}
var utf8Decoder = new TextDecoder("utf-8");
var bufToString = (buf) => isString(buf) ? buf : utf8Decoder.decode(buf);
var bufArrJoin = (arr) => arr.reduce((acc, buf) => acc + bufToString(buf), "");
var getLast = (arr) => arr[arr.length - 1];
function preferLocalBin(env, ...dirs) {
  const pathKey = import_node_process.default.platform === "win32" ? Object.keys(env).reverse().find((key) => key.toUpperCase() === "PATH") || "Path" : "PATH";
  const pathValue = dirs.map(
    (c) => c && [
      import_node_path.default.resolve(c, "node_modules", ".bin"),
      import_node_path.default.resolve(c)
    ]
  ).flat().concat(env[pathKey]).filter(Boolean).join(import_node_path.default.delimiter);
  return __spreadProps(__spreadValues({}, env), {
    [pathKey]: pathValue
  });
}
function quote(arg) {
  if (arg === "") return `$''`;
  if (/^[\w/.\-+@:=,%]+$/.test(arg)) return arg;
  return `$'` + arg.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0").replace(/\x07/g, "\\a").replace(/\x08/g, "\\b").replace(/\x1b/g, "\\e") + `'`;
}
function quotePowerShell(arg) {
  if (arg === "") return `''`;
  if (/^[\w/.\-@:=,+%]+$/.test(arg)) return arg;
  return `'` + arg.replace(/'/g, "''") + `'`;
}
function parseDuration(d) {
  var _a;
  if (typeof d === "number") {
    if (isNaN(d) || d < 0) throw new Error(`Invalid duration: "${d}".`);
    return d;
  }
  const match = String(d).trim().match(/^(\d+(?:\.\d+)?)\s*(ms|s|m|h|d)?$/i);
  if (!match) throw new Error(`Unknown duration: "${d}".`);
  const val = parseFloat(match[1]);
  const unit = (match[2] || "ms").toLowerCase();
  const multipliers = {
    ms: 1,
    s: 1e3,
    m: 6e4,
    h: 36e5,
    d: 864e5
  };
  return val * ((_a = multipliers[unit]) != null ? _a : 1);
}
var once = (fn) => {
  let called = false;
  let result;
  return (...args) => called ? result : (called = true, result = fn(...args));
};
var proxyOverride = (origin, ...fallbacks) => new Proxy(origin, {
  get(target, key) {
    var _a, _b;
    return (_b = (_a = fallbacks.find((f) => key in f)) == null ? void 0 : _a[key]) != null ? _b : Reflect.get(target, key);
  }
});
var toCamelCase = (str) => str.toLowerCase().replace(/^[_-]+/, "").replace(/([a-z0-9])[_-]+([a-z0-9])/g, (_, p1, p2) => p1 + p2.toUpperCase());
var parseBool = (v) => v === "true" || v !== "false" && v;
var getLines = (chunk, next, delimiter) => {
  const lines = ((next.pop() || "") + bufToString(chunk)).split(delimiter);
  next.push(lines.pop());
  return lines;
};
var iteratorToArray = (it) => {
  const arr = [];
  let entry;
  while (!(entry = it.next()).done) arr.push(entry.value);
  return arr;
};
/* c8 ignore next 100 */
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bufArrJoin,
  bufToString,
  getLast,
  getLines,
  identity,
  isString,
  isStringLiteral,
  iteratorToArray,
  noop,
  once,
  parseBool,
  parseDuration,
  preferLocalBin,
  proxyOverride,
  quote,
  quotePowerShell,
  randomId,
  toCamelCase
});