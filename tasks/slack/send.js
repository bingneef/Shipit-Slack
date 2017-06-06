const utils = require('shipit-utils')
const chalk = require('chalk')
const Slack = require('node-slackr')
const moment = require('moment')
const render = require('json-templater/object')

/**
 * Runs slack send
 */

module.exports = (gruntOrShipit) => {
  const task = () => {
    const shipit = utils.getShipit(gruntOrShipit)

    const install = () => {
      shipit.log('Sending slack notification.')
      const channel = shipit.config.slack.channel

      const slack = new Slack(shipit.config.slack.webhookUrl,
        {
          channel
        }
      )

      const defaultTemplate = {
        attachments: [
          {
            fallback: '{{message}}',
            color: '{{status}}',
            fields: [
              {
                title: '{{message}}',
                value: moment().format('MMMM Do YYYY, H:mm:ss'),
                short: true
              },
              {
                title: 'Environment',
                value: '{{buildEnv}}',
                short: true
              },
            ]
          }
        ]
      }

      const payload =
        render(shipit.config.slack.template || defaultTemplate, shipit.config.slack)

      return slack.notify(payload)
    }

    if (shipit.slack_inited) {
      try {
        install()
        shipit.log(chalk.green('slack notification sent'))
        shipit.emit('slack_finished')
      } catch (e) {
        shipit.log(chalk.red(e))
      }
    } else {
      throw new Error(
        shipit.log(
          chalk.gray('try running slack:init before slack:send')
        )
      )
    }
  }

  utils.registerTask(gruntOrShipit, 'slack:send', task)
}
