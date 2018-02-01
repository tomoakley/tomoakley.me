/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const moment = require('moment');

exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'ContentfulArticle' ||
      node.internal.type === 'ContentfulProject') {
    createNodeField({ node, name: 'slug', value: node.slug });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`{
      allContentfulArticle {
        edges {
          node {
            fields {
              slug
            }
            createdAt
            content {
              content
            }
            title
          }
        }
      }
      allContentfulProject {
        edges {
          node {
            fields {
              slug
            }
            employed
            started
            finished
            content {
              content
            }
            title
          }
        }
      }
    }`
    ).then(result => {
      const {
        allContentfulArticle,
        allContentfulProject
      } = result.data;
      allContentfulArticle.edges.forEach(({ node }) => {
        const date = {
          month: moment(node.createdAt).format('MM'),
          year: moment(node.createdAt).format('YYYY'),
        };
        createPage({
          path: `article/${date.year}/${date.month}/${node.fields.slug}`,
          component: path.resolve('./src/templates/article.js'),
          context: {
            slug: node.fields.slug,
            title: node.title,
            content: node.content.content,
            createdAt: node.createdAt
          }
        });
      });
      allContentfulProject.edges.forEach(({ node }) => {
        createPage({
          path: `project/${node.fields.slug}`,
          component: path.resolve('./src/templates/project.js'),
          context: {
            slug: node.fields.slug,
            title: node.title,
            content: node.content.content,
            employed: node.employed,
            started: node.started,
            finished: node.finished
          }
        });
      });
      resolve();
    });
  });
};
