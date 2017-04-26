const utils = require('shipit-utils');

/**
 * Register Slack tasks.
 * - slack
 * - slack:send
 */

module.exports = (gruntOrShipit) => {
  let shipit = utils.getShipit(gruntOrShipit);

  require('./init')(gruntOrShipit);
  require('./send')(gruntOrShipit);

  shipit.on('deploy', () => {
    shipit.start('slack:init');
  })
};
