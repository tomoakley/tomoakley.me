import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import { format } from 'date-fns'

import Article from './'

export default class ArticleList extends React.PureComponent {

  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        {_map(this.props.articles, (article, i) => (
          <Article
            key={i}
            details={article.node}
            slug={`/article/${format(article.node.createdAt, 'YYYY')}/${format(article.node.createdAt, 'MM')}/${article.node.slug}`}
          />
        ))}
      </div>
    )
  }
}