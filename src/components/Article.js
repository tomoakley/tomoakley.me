import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { format } from 'date-fns'
import _get from 'lodash/get'

import Block from './Block'

const ArticleHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: baseline;
  justify-content: baseline;
  margin-top: 10px;
`

const ArticleDate = styled.div`
  font-family: ${props => props.theme.fonts.sansSerifBold};
  background: ${props => props.theme.primary};
  padding: 5px 10px;
  text-align: center;
  line-height: 1.25;
`

const ArticleTitle = styled.h2`
  font-family: ${props => props.theme.fonts.sansSerif};
  margin: 0 0 0 15px;
`

export const getSlug = (createdAt, slug) => (
  `/article/${format(createdAt, 'YYYY')}/${format(createdAt, 'MM')}/${slug}`
)

const Article = ({
  details: {
    title,
    content,
    preview,
    createdAt,
    slug
  },
  hasSlug
}) => (
  <div>
    <ArticleHeader>
      <ArticleDate>
        <Block>{format(createdAt, 'D')}</Block>
        <Block>{format(createdAt, 'MMM')}</Block>
      </ArticleDate>
      <ArticleTitle>{hasSlug ? <Link to={getSlug(createdAt, slug)}>{title}</Link> : title}</ArticleTitle>
    </ArticleHeader>
    <div dangerouslySetInnerHTML={{ __html: _get(preview, ['childMarkdownRemark', 'html'], _get(content, ['childMarkdownRemark', 'html'], '')) }} />
  </div>
)


Article.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.objectOf(PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({
        html: PropTypes.string
      })
    })),
    createdAt: PropTypes.string,
    slug: PropTypes.string,
    preview: PropTypes.objectOf(PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({
        html: PropTypes.string
      })
    }))
  }).isRequired,
  hasSlug: PropTypes.bool
}

export default Article