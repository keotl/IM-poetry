# IM-poetry

When instant messaging reads like poetry.

A static site generator to export and publish IM conversations. The goal of this project is to render conversations in a way that mimics the original medium, while supporting rich message formatting.

This project is still in the early stages. Feel free to open an issue.

# How to use

1. Run the `slack-dump.py` script in the `scripts` directory. Replace the `TOKEN` and `CHANNEL` constants with a personal access token and the channel id. The output should be piped to a file. Make sure to install the `requests` pypi package using `pip` first.

```bash
# install requests
pip3 install requests
# run the extraction script and save the output to conversation.json
python3 slack-dump.py > conversation.json
```

1. Place a JSON dump of the conversations in the `content` directory.
2. Build your static site!

```bash
npm install
npx gatsby build
```

3. Serve the `public` folder containing your static site using any HTTP server. E.g. `python -m http.server`.

# Example

![Screenshot](docs/screenshots/slack-screenshot.png)

# Credits

Built using GatsbyJS, using the default starter template. https://github.com/gatsbyjs/gatsby-starter-default.
