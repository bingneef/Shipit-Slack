/* eslint-disable global-require */
module.exports = (shipit) => {
  require('./tasks/slack')(shipit)
}
