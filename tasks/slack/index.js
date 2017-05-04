/* eslint-disable global-require */
const utils = require('shipit-utils')
const init = require('./init')
const send = require('./send')

/**
 * Register Slack tasks.
 * - slack
 * - slack:send
 */

module.exports = (gruntOrShipit) => {
  const shipit = utils.getShipit(gruntOrShipit)
  init(gruntOrShipit)
  send(gruntOrShipit)

  shipit.on('deploy', () => {
    shipit.start('slack:init')
  })
}
