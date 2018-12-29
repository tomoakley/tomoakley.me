import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import List from '../components/List'
import Book from '../components/Book'

export default class BooksList extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const { edges: books } = this.props.data.books;
    return (
      <Layout>
        <Helmet>
          <title>Books</title>
        </Helmet>
        <List
          items={books}
          Component={Book}
        />
      </Layout>
    )
  }
}

export const projectsQuery = graphql`
  query BooksQuery {
    books: allContentfulReadingList(sort: { fields: [ startDate ], order: DESC }) {
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
              shortReview
            }
            quotes
            coverPhoto {
              file {
                url
                fileName
                contentType
              }
            }
          }
        }
      }
  } 
`;