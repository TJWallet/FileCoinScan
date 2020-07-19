'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  BASE_API: '"[#TEMP#]"',
  // BASE_URL: '"https://admin.tianjiyun.net"',
  BASE_URL: '"http://dapp.loc"'
})
