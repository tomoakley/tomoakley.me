import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import List from '../components/List'
import Article from '../components/Article'

export default class ProjectsPage extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { edges: articles } = this.props.data.articles;
    return (
      <div>
        <Helmet>
          <title>Articles</title>
        </Helmet>
        <List
          items={articles}
          Component={Article}
        />
      </div>
    )
  }
}

export const articlesQuery = graphql`
  query ArticlesQuery {
    articles: allContentfulArticle(sort: { fields: [ createdAt ], order: DESC }, limit: 3) {
      edges {
        node {
          title
          content {
            content
          }
          createdAt
          slug
        }
      }
    }
  } 
`