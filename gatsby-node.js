/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const format = require('date-fns').format
const _kebabCase = require('lodash').kebabCase

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'ContentfulArticle' ||
      node.internal.type === 'ContentfulProject' ||
      node.internal.type === 'ContentfulReadingList') {
    createNodeField({ node, name: 'slug', value: node.slug || _kebabCase(node.title) })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
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
              childMarkdownRemark {
                html
              }
            }
            title
            tags
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
              childMarkdownRemark {
                html
              }
            }
            title
          }
        }
      }
      allContentfulReadingList {
        edges {
          node {
            title
            startDate
            finishDate
            linkToBuy
            rating
            tags
            author
            shortReview {
              childMarkdownRemark {
                html
              }
            }
            quotes
            coverPhoto {
              description
              fluid(maxWidth: 106) {
                src
                srcSet
                srcWebp
                srcSetWebp
                aspectRatio
                sizes
              }
            }
          }
        }
      }
    }`
    ).then(result => {
      const {
        allContentfulArticle,
        allContentfulProject,
        allContentfulReadingList
      } = result.data;
      allContentfulArticle.edges.forEach(({ node }) => {
        createPage({
          path: `article/${format(node.createdAt, 'YYYY')}/${format(node.createdAt, 'MM')}/${node.fields.slug}`,
          component: path.resolve('./src/templates/article.js'),
          context: {
            slug: node.fields.slug,
            title: node.title,
            content: node.content,
            createdAt: node.createdAt,
            tags: node.tags,
          }
        })
      })
      allContentfulProject.edges.forEach(({ node }) => {
        createPage({
          path: `project/${node.fields.slug}`,
          component: path.resolve('./src/templates/project.js'),
          context: {
            title: node.title,
            content: node.content,
            employed: node.employed,
            started: node.started,
            finished: node.finished
          }
        })
      })
      allContentfulReadingList.edges.forEach(({ node }) => {
        createPage({
          path: `book/${format(node.startDate, 'YYYY')}/${_kebabCase(node.title)}`,
          component: path.resolve('./src/templates/book.js'),
          context: {
            title: node.title,
            author: node.author,
            startDate: node.startDate,
            finishDate: node.finishDate,
            tags: node.tags,
            rating: node.rating,
            shortReview: node.shortReview,
            coverPhoto: node.coverPhoto,
            linkToBuy: node.linkToBuy
          }
        })
      })
      resolve()
    })
  })
}
