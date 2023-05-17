import { App, BlockAction } from "@slack/bolt"
import "dotenv/config"
import { getKeyPickupBlock, getKeyReturnBlock } from "./block"

const app = new App({
  appToken: process.env.SLACK_APP_TOKEN,
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  port: 3000
})

const getUserData = async(userId: string) => {
  const response = await app.client.users.info({
    user: userId
  })

  const result = {
    user_name: response.user.profile.display_name ? response.user.profile.display_name : response.user.profile.real_name,
    image: response.user.profile.image_512
  }

  return result
}

app.shortcut("key-pickup", async({ ack, body, client }) => {
  await ack();
  const data = await getUserData(body.user.id)
  await client.chat.postMessage({
    channel: process.env.SLACK_POST_CHANNEL_ID,
    text: `${data.user_name}が鍵を借りました`,
    blocks: getKeyPickupBlock(data.user_name, data.image)
  });
});

app.shortcut("key-return", async({ ack, body, client }) => {
  await ack();
  const data = await getUserData(body.user.id)
  await client.chat.postMessage({
    channel: process.env.SLACK_POST_CHANNEL_ID,
    text: `${data.user_name}が鍵を返却しました`,
    blocks: getKeyReturnBlock(data.user_name, data.image)
  });
});

app.action<BlockAction>("key-pickup", async ({ ack, client, body }) => {
  await ack();
  const data = await getUserData(body.user.id)
  await client.chat.postMessage({
    channel: process.env.SLACK_POST_CHANNEL_ID,
    text: `${data.user_name}が鍵を借りました`,
    blocks: getKeyPickupBlock(data.user_name, data.image)
  });
});

app.action<BlockAction>("key-return", async ({ ack, client, body }) => {
  await ack();
  const data = await getUserData(body.user.id)
  await client.chat.postMessage({
    channel: process.env.SLACK_POST_CHANNEL_ID,
    text: `${data.user_name}が鍵を返却しました`,
    blocks: getKeyReturnBlock(data.user_name, data.image)
  });
});

(async () => {
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();