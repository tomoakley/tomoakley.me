import React from 'react'
import PropTypes from 'prop-types'

import Book from '../components/Book'

const BookTemplate = ({ pathContext }) => (
  <Book details={pathContext} />
)

BookTemplate.propTypes = {
  pathContext: PropTypes.object.isRequired
}

export default BookTemplate



