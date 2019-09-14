/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

require("source-map-support").install();
require("ts-node").register();

const path = require(`path`);
const fs = require("fs");
const chatLogParseFactory = require("./src/chat/ChatLogParser")
  .createChatLogParser;
const SlackPage = require("./src/templates/SlackPage").SlackPage;

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const conversationDump = fs.readFileSync("./content/archi-dump.json", {
    encoding: "utf-8",
  });
  const parser = chatLogParseFactory();
  const messages = parser.extractMessages(conversationDump);
  const users = parser.extractUsers(conversationDump);
  const emojis = parser.extractEmojis(conversationDump);

  createPage({
    path: "/slack",
    component: path.resolve("./src/templates/SlackPage.tsx"),
    context: {
      messages,
      users,
      emojis,
    },
  });
};

const CopyWebpackPlugin = require("copy-webpack-plugin");

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  actions.setWebpackConfig({
    plugins: [
      new CopyWebpackPlugin([
        {
          from: "node_modules/emoji-datasource-google/img/google/64",
          to: "static/emojis",
        },
      ]),
    ],
  });
};
