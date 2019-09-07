/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

require('source-map-support').install()
require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        target: 'es2017',
    },
})

const path = require(`path`);
const fs = require('fs');
const SlackPage = require('./src/templates/SlackPage').SlackPage;

exports.createPages = ({ actions }) => {
    const { createPage } = actions;
    const pageData = JSON.parse(fs.readFileSync('./content/archi-dump.json', { encoding: 'utf-8' }));

    createPage({
        path: "/slack",
        component: path.resolve("./src/templates/SlackPage.tsx"),
        context: {
            name: "foobar"
        }
    });
};
