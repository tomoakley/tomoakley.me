import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _map from 'lodash/map'
import _kebabCase from 'lodash/kebabCase'
import { format } from 'date-fns'

import Book from './Book'

const BookList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export default class BooksList extends React.PureComponent {

  static propTypes = {
      books: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    const { books } = this.props
    return (
      <BookList>
        { _map(books, book => (
          <Book
            details={book.node}
            slug={`/book/${format(book.node.startDate, 'YYYY')}/${_kebabCase(book.node.title)}`}
          />
        )) }
      </BookList>
    )
  }
}