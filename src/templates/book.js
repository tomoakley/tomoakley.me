import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Book from '../components/Book'

const BookTemplate = ({ pathContext }) => (
  <div>
    <Helmet>
      <title>{pathContext.title}</title>  
    </Helmet>
    <Book details={pathContext} />
  </div>
)

BookTemplate.propTypes = {
  pathContext: PropTypes.object.isRequired
}

export default BookTemplate



