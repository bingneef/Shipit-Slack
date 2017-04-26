/* eslint-disable global-require */
const utils = require('shipit-utils')
const chalk = require('chalk')

/**
 * Init task.
 * - Emit npm_inited event.
 */

module.exports = (gruntOrShipit) => {
  const task = () => {
    const shipit = utils.getShipit(gruntOrShipit)

    shipit.config = shipit.config || {}
    shipit.config.slack = shipit.config.slack || {}
    shipit.config.slack.webhookUrl = shipit.config.slack.webhookUrl || null

    shipit.config.slack.triggerEvent = shipit.config.slack.triggerEvent || 'deployed'

    if (!shipit.config.slack.webhookUrl) {
      const msg = 'Please specify a webhookUrl in the shipit config.'
      throw new Error(
        shipit.log(chalk.red(msg))
      )
    }

    shipit.slack_inited = true
    shipit.emit('slack_inited')

    if (shipit.config.slack.triggerEvent) {
      shipit.on(shipit.config.slack.triggerEvent, () => {
        shipit.start('slack:send')
      })
    }
  }

  utils.registerTask(gruntOrShipit, 'slack:init', task)
}
