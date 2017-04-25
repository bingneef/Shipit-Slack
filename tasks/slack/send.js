const utils = require('shipit-utils');
const chalk = require('chalk');
const Slack = require('node-slackr')
const moment = require('moment')
const s = require('underscore.string')

/**
 * Runs slack send
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'slack:send', task);

  function task () {
    var shipit = utils.getShipit(gruntOrShipit);
    
    function install() {
      shipit.log('Sending slack notification.');
      const channel = shipit.config.slack.channel
      const message = shipit.config.slack.message || 'Shipit-Slack'
      const status = shipit.config.slack.status || 'good'
      const buildEnv = s(shipit.environment).capitalize().value()

      const slack = new Slack(shipit.config.slack.webhookUrl,
        {
          channel
        }
      )

      const payload = {
        attachments: [
          {
            fallback: message,
            color: status,
            fields: [
              {
                title: message,
                value: moment().format('MMMM Do YYYY, H:mm:ss'),
                short: true
              },
              {
                title: 'Environment',
                value: buildEnv,
                short: true
              },
            ]
          }
        ]
      }

      return slack.notify(payload)

    }

    if(shipit.slack_inited) {
      try {
        install()
        shipit.log(chalk.green('slack notification sent'))
        shipit.emit('slack_finished')
      } catch (e) {
        shipit.log(chalk.red(e));
      }

    } else {
      throw new Error(
        shipit.log(
          chalk.gray('try running slack:init before slack:send')
        )
      );
    }
  }
};
