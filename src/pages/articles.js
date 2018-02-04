import React from 'react';
import PropTypes from 'prop-types';
import ArticleList from "../components/Article/List";

export default class ProjectsPage extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { edges: articles } = this.props.data.articles;
    return <ArticleList articles={articles} />
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
`;