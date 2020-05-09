import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import List from '../components/List'
import Article from '../components/Article'

export default class ProjectsPage extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { edges: articles } = this.props.data.articles;
    return (
      <Layout>
        <Helmet>
          <title>Articles</title>
        </Helmet>
        <List
          items={articles}
          Component={Article}
        />
      </Layout>
    )
  }
}

export const articlesQuery = graphql`
  query ArticlesQuery {
    articles: allContentfulArticle(sort: { fields: [ createdAt ], order: DESC }, limit: 3) {
      edges {
        node {
          title
          coverPhoto {
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          content {
            childMarkdownRemark {
              html
            }
          }
          preview {
            childMarkdownRemark {
              html
            }
          }
          createdAt
          slug
        }
      }
    }
  }
`
