import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Article from '../components/Article'

const ArticleTemplate = ({ pageContext }) => (
  <Layout>
    <Helmet>
      <title>{pageContext.title}</title>  
    </Helmet>  
    <Article details={pageContext} />
  </Layout>
)

ArticleTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired
}

export default ArticleTemplate

