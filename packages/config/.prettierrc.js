// @ts-check
const { getPrettierConfig } = require('./tooling/helpers');

/**
 * @type {import('prettier').Config}
 */
module.exports = {
  ...getPrettierConfig(),
  overrides: [
    // whatever you need
  ],
};
