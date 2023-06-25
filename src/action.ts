import { StringIndexed } from '@slack/bolt/dist/types/helpers'
import { getKeyPickupBlock, getKeyReturnBlock } from './block'

const getUserData = async (client: any, userId: string) => {
  const response = await client.users.info({
    user: userId
  })

  const result = {
    user_name: response.user.profile.display_name
      ? response.user.profile.display_name
      : response.user.profile.real_name,
    image: response.user.profile.image_512
  }

  return result
}

export const keyPickupAction = async ({ ack, client, body }: StringIndexed) => {
  await ack()
  const data = await getUserData(client, body.user.id)
  await client.chat.postMessage({
    channel: process.env.SLACK_POST_CHANNEL_ID,
    text: `${data.user_name}が鍵を借りました`,
    blocks: getKeyPickupBlock(data.user_name, data.image)
  })
}

export const keyReturnAction = async ({ ack, client, body }: StringIndexed) => {
  await ack()
  const data = await getUserData(client, body.user.id)
  await client.chat.postMessage({
    channel: process.env.SLACK_POST_CHANNEL_ID,
    text: `${data.user_name}が鍵を返却しました`,
    blocks: getKeyReturnBlock(data.user_name, data.image)
  })
}
