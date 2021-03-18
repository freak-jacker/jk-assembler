/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(val) {
  return val && val instanceof Array && val.length;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isFunction(val) {
  return val && typeof val === 'function';
}
