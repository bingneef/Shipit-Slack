var utils = require('shipit-utils');

/**
 * Register Slack tasks.
 * - slack
 * - slack:send
 */

module.exports = (gruntOrShipit) => {
  var shipit = utils.getShipit(gruntOrShipit);

  require('./init')(gruntOrShipit);
  require('./send')(gruntOrShipit);

  shipit.on('deploy', () => {
    shipit.start('slack:init');
  })
};