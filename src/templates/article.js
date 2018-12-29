import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Article from '../components/Article'

const ArticleTemplate = ({ pathContext }) => (
  <div>
    <Helmet>
      <title>{pathContext.title}</title>  
    </Helmet>  
    <Article details={pathContext} />
  </div>
)

ArticleTemplate.propTypes = {
  pathContext: PropTypes.object.isRequired
}

export default ArticleTemplate

