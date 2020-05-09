import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
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

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  max-width: 80ch;
  @media screen and (min-width: 830px) {
    flex-direction: row;
  }
`

const ArticlePic = styled(Img)`
  flex: 1 0 auto;
  height: fit-content;
  @media screen and (min-width: 830px) {
    margin-right: 15px;
  }
`

const ArticleContent = styled.div`
  flex: 2;
  @media screen and (min-width: 830px) {
    > p:first-child {
      margin-top: 0;
    }
  }
`

export const getSlug = (createdAt, slug) => (
  `/article/${format(createdAt, 'YYYY')}/${format(createdAt, 'MM')}/${slug}`
)

const Article = ({
  details: {
    title,
    content,
    coverPhoto,
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
    <ArticleContainer>
      {coverPhoto && <ArticlePic fluid={coverPhoto.fluid} />}
      <ArticleContent dangerouslySetInnerHTML={{ __html: _get(preview, ['childMarkdownRemark', 'html'], _get(content, ['childMarkdownRemark', 'html'], '')) }} />
    </ArticleContainer>
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
