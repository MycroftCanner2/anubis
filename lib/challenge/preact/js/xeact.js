/**
 * Creates a DOM element, assigns the properties of `data` to it, and appends all `children`.
 *
 * @type{function(string|Function, Object=, Node|Array.<Node|string>=)}
 */
const hasDocument = typeof document !== "undefined";
const hasWindow = typeof window !== "undefined";

const h = (name, data = {}, children = []) => {
  if (typeof name == "function") {
    return name(data);
  }
  if (!hasDocument) {
    return null;
  }
  const result = Object.assign(document.createElement(name), data);
  if (!Array.isArray(children)) {
    children = [children];
  }
  result.append(...children);
  return result;
};

/**
 * Create a text node.
 *
 * Equivalent to `document.createTextNode(text)`
 *
 * @type{function(string): Text}
 */
const t = (text) => (hasDocument ? document.createTextNode(text) : text);

/**
 * Remove all child nodes from a DOM element.
 *
 * @type{function(Node)}
 */
const x = (elem) => {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
};

/**
 * Get all elements with the given ID.
 *
 * Equivalent to `document.getElementById(name)`
 *
 * @type{function(string): HTMLElement}
 */
const g = (name) => (hasDocument ? document.getElementById(name) : null);

/**
 * Get all elements with the given class name.
 *
 * Equivalent to `document.getElementsByClassName(name)`
 *
 * @type{function(string): HTMLCollectionOf.<Element>}
 */
const c = (name) => (hasDocument ? document.getElementsByClassName(name) : []);

/** @type{function(string): HTMLCollectionOf.<Element>} */
const n = (name) => (hasDocument ? document.getElementsByName(name) : []);

/**
 * Get all elements matching the given HTML selector.
 *
 * Matches selectors with `document.querySelectorAll(selector)`
 *
 * @type{function(string): Array.<HTMLElement>}
 */
const s = (selector) =>
  hasDocument ? Array.from(document.querySelectorAll(selector)) : [];

/**
 * Generate a relative URL from `url`, appending all key-value pairs from `params` as URL-encoded parameters.
 *
 * @type{function(string=, Object=): string}
 */
const u = (url = "", params = {}) => {
  const base = hasWindow ? window.location.href : "http://localhost";
  let result = new URL(url, base);
  Object.entries(params).forEach(([k, v]) => {
    result.searchParams.set(k, v);
  });
  return result.toString();
};

/**
 * Takes a callback to run when all DOM content is loaded.
 *
 * Equivalent to `window.addEventListener('DOMContentLoaded', callback)`
 *
 * @type{function(function())}
 */
const r = (callback) => {
  if (hasWindow) {
    window.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
};

/**
 * Allows a stateful value to be tracked by consumers.
 *
 * This is the Xeact version of the React useState hook.
 *
 * @type{function(any): [function(): any, function(any): void]}
 */
const useState = (value = undefined) => {
  return [
    () => value,
    (x) => {
      value = x;
    },
  ];
};

/**
 * Debounce an action for up to ms milliseconds.
 *
 * @type{function(number): function(function(any): void)}
 */
const d = (ms) => {
  let debounceTimer = null;
  return (f) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(f, ms);
  };
};

/**
 * Parse the contents of a given HTML page element as JSON and
 * return the results.
 * 
 * This is useful when using templ to pass complicated data from
 * the server to the client via HTML[1].
 * 
 * [1]: https://templ.guide/syntax-and-usage/script-templates/#pass-server-side-data-to-the-client-in-a-html-attribute
 */
const j = (id) => JSON.parse(g(id)?.textContent ?? "null");

export { h, t, x, g, j, c, n, u, s, r, useState, d };
