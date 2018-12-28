import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Link from 'gatsby-link'
import marked from 'marked'
import { format } from 'date-fns'

import Block from '../Block'

const ArticleHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: baseline;
  justify-content: baseline;
  margin-top: 10px;
`

const ArticleDate = styled.div`
  font-family: ${(props) => props.theme.fonts.sansSerifBold};
  background: ${(props) => props.theme.primary};
  padding: 5px 10px;
  text-align: center;
  line-height: 1.25;
`

const ArticleTitle = styled.h2`
  font-family: ${props => props.theme.fonts.sansSerif};
  margin: 0 0 0 15px;
`

const Article = ({
  details: {
    title,
    content,
    createdAt
  },
  slug
}) => (
  <div>
    <ArticleHeader>
      <ArticleDate>
        <Block>{format(createdAt, 'D')}</Block>
        <Block>{format(createdAt, 'MMM')}</Block>
      </ArticleDate>
      <ArticleTitle>{slug ? <Link to={slug}>{title}</Link> : title}</ArticleTitle>
    </ArticleHeader>
    <p dangerouslySetInnerHTML={{ __html: marked(content.content) }} />
  </div>
)

Article.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.objectOf(PropTypes.string),
    createdAt: PropTypes.string
  }).isRequired,
  slug: PropTypes.string
}

export default Article