'use strict';

const baseAerospike = require('aerospike');
const config = require('@rainder/config');

const CONFIG = config.init({
  hosts: 'aerospike.hosts',
});

const aerospike = module.exports = Object.defineProperties(Object.assign({
  put: p('put'),
  get: p('get'),
  getArgs: pArgs('get'),
  remove: p('remove'),
  operate: p('operate'),
}, baseAerospike), {
  '_client': {
    get: () => {
      if (!this.__client) {
        this.__client = aerospike.connect(CONFIG);
      }

      return this.__client;
    },
  },
});


/**
 *
 * @param method
 * @returns {function(...[*]): Promise}
 */
function p(method) {
  return (...args) => new Promise((resolve, reject) => {
    return aerospike._client[method](...args, (err, result) => {
      err === null ? resolve(result) : reject(err);
    });
  });
}

/**
 *
 * @param method
 * @returns {function(...[*]): Promise}
 */
function pArgs(method) {
  return (...args) => new Promise((resolve, reject) => {
    return aerospike._client[method](...args, (err, ...args) => {
      err === null ? resolve(args) : reject(err);
    });
  });
}
