# IM-poetry

When instant messaging reads like poetry.

A static site generator to export and publish IM conversations. The goal of this project is to render conversations in a way that mimics the original medium, while supporting rich message formatting.

This project is still in the early stages. Feel free to open an issue.

# How to use

1. Place a JSON dump of the conversations in the `content` directory.
   ( TODO publish Slack extraction scripts + document payload format.)
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
