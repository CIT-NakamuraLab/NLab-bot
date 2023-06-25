import { App, BlockAction } from '@slack/bolt'
import 'dotenv/config'
import { keyPickupAction, keyReturnAction } from './action'

const app = new App({
  appToken: process.env.SLACK_APP_TOKEN,
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  port: 3000
})

app.shortcut('key-pickup', keyPickupAction)
app.shortcut('key-return', keyReturnAction)

app.action<BlockAction>('key-pickup', keyPickupAction)
app.action<BlockAction>('key-return', keyReturnAction)

;(async () => {
  await app.start()

  console.log('⚡️ Bolt app is running!')
})()
