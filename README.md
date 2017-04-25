# shipit-slack

A set of tasks for [Shipit](https://github.com/shipitjs/shipit) used for [slack](https://slack.com/) slack notifications.


**Features:**

- Triggered on the `updated` or `fetched` event from [shipit-deploy](https://github.com/shipitjs/shipit-deploy)
- Works via [shipit-cli](https://github.com/shipitjs/shipit) and [grunt-shipit](https://github.com/shipitjs/grunt-shipit)

## Install

```
npm install shipit-slack --save--dev
yarn add shipit-slack --dev
```

## Usage
It is required to set the webhookUrl that links to a Slack services. This can be done in the `shipit.config.slack` key in the config. (an example belof)

```
slack: {
  webhookUrl: 'https://hooks.slack.com/services/XXX',
}
```

Afterwards, just simply run: (This triggers the `slack` task on the deploy `deployed` or `fetched` event. No additional config necessary.)

```
shipit staging deploy

```

Or you can run the tasks separatly :

```
shipit staging slack:init slack:install

```


## Options `shipit.config.slack`

### `slack.webhookUrl`

Type: `String`
Default: `null`
Required: `true`

The webhook url that is configured for your Slack channel.

### `slack.channel`

Type: `String`
Default: `null`

A string that decides what channel the webhook is send to. If this value is null, the default channel is used that is configured in the `incoming webhook`.

### `slack.message`

Type: `String`
Default: `Shipit-Slack`

A string that determines the message that is send with the Slack notification.

### `slack.triggerEvent`

Type: `String`
Default: `fetched`

An event name that triggers `slack:install`.

### `slack.status`

Type: `String`
Default: `good`
Options: [`good`, `warning`, `error`]

An string that decides what color the notification in Slack gets, they are respectively: green, orange and red.

### Example `shipitfile.js` options usage

```js
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-slack')(shipit);

  shipit.initConfig({
    default: {
      slack: {
        webhookUrl: 'https://hooks.slack.com/services/__XXX__',
        status: 'good',
        message: 'Shipit-Slack',
        triggerEvent: 'deployed',
        channel: '#default'
      }
    }
  });
};
```

## Workflow tasks

- slack
  - slack:init
      - Emit event "slack_inited".
  - slack:install
    - Runs slack install
    - Emit event "slack_installed"
  - slack:send
      - Sends slack notification.

##### Event flow:

- on Event "deploy" (shipit-deploy initialized)
  - Runs *slack:init*
  - on Event "slack_inited"
    - Runs *slack:install* (Triggered on the `fetched` event from [shipit-deploy](https://github.com/shipitjs/shipit-deploy) or by a custom `slack.triggerEvent` as mentioned above.)

## License

MIT
