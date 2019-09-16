import json

import requests

# REPLACE THESE CONSTANTS WITH YOUR OWN
TOKEN = "<slack_personal_token>"
CHANNEL = "<channel_id>"


def get_messages(channel: str):
    has_more = True
    raw_messages = []
    while has_more:
        if (len(raw_messages) > 0):
            res = requests.get(
                f"https://slack.com/api/channels.history?token={TOKEN}&channel={channel}&count=1000&latest={raw_messages[-1]['ts']}")
        else:
            res = requests.get(f"https://slack.com/api/channels.history?token={TOKEN}&channel={channel}&count=1000")
        raw_messages.extend(res.json()["messages"])
        has_more = res.json()["has_more"]

    return raw_messages


def get_users():
    return requests.get(f"https://slack.com/api/users.list?token={TOKEN}").json()["members"]


def get_emojis():
    return requests.get(f"https://slack.com/api/emoji.list?token={TOKEN}").json()["emoji"]


if __name__ == '__main__':
    print(json.dumps({
        "type": "SLACK",
        "messages": get_messages(CHANNEL),
        "users": get_users(),
        "emojis": get_emojis()
    }))
