/**
 * Calls all functions
 * @private
 * @param {Array<function>} fns - functions to call in sequence
 * @returns {function}
 */
export function callAll(...fns) {
  return (...args) => fns.forEach(fn => fn && fn(...args));
}
