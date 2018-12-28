import React from 'react'
import PropTypes from 'prop-types'

import Article from '../components/Article'

const ArticleTemplate = ({ pathContext }) => (
  <Article details={pathContext} />
)

ArticleTemplate.propTypes = {
  pathContext: PropTypes.object.isRequired
}

export default ArticleTemplate

