import dayjs from "dayjs"

export const getKeyPickupBlock = (userName: string, userIcon: string) => {
  const messageBlock = [
    {
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "image",
					"image_url": userIcon,
					"alt_text": "images"
				},
				{
					"type": "mrkdwn",
					"text": userName
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":large_green_circle: *鍵を借りました*"
			}
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": `*日付*\n${dayjs().format('YYYY/MM/DD')}`
				},
				{
					"type": "mrkdwn",
					"text": `*時刻*\n${dayjs().format('HH:mm')}`
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "返却する",
						"emoji": true
					},
					"value": "key-return",
					"style": "danger",
					"action_id": "key-return"
				}
			]
		},
    {
			"type": "divider"
		}
	]

  return messageBlock
}

export const getKeyReturnBlock = (userName: string, userIcon: string) => {
  const messageBlock = [
    {
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "image",
					"image_url": userIcon,
					"alt_text": "images"
				},
				{
					"type": "mrkdwn",
					"text": userName
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":red_circle: *鍵を返却しました*"
			}
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": `*日付*\n${dayjs().format('YYYY/MM/DD')}`
				},
				{
					"type": "mrkdwn",
					"text": `*時刻*\n${dayjs().format('HH:mm')}`
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "借りる",
						"emoji": true
					},
					"value": "key-pickup",
					"style": "primary",
					"action_id": "key-pickup"
				}
			]
		},
    {
			"type": "divider"
		}
	]

  return messageBlock
}