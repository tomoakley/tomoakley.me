import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Book from '../components/Book'

const BookTemplate = ({ pageContext }) => (
  <Layout>
    <Helmet>
      <title>{pageContext.title}</title>  
    </Helmet>
    <Book details={pageContext} />
  </Layout>
)

BookTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired
}

export default BookTemplate



