import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { format } from 'date-fns'
import _get from 'lodash/get'

import Layout from '../components/Layout'

const ArticleContainer = styled.div`
  max-width: 960px;
  margin: 10px auto 0;
  @media screen and (min-width: 768px) {
    width: 70%;
  }
`

const ArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-content: baseline;
  justify-content: baseline;
  margin-top: 10px;
`

const ArticleTitle = styled.h2`
  font-family: ${props => props.theme.fonts.sansSerif};
  margin: 0;
`

const ArticleMetaData = styled.div`
  font-size: 1.4rem;
  > span:not(:last-child) {
    margin-right: 5px;
    &:after {
      padding-left: 5px;
      content: '//';
    }
  }
`

const ArticleFooter = styled.div`
  width: 40%;
  max-width: 400px;
  margin: 10px auto;
  border-top: solid thin 1px;
  padding-top: 10px;
  font-size: 1.4rem;
`

const ArticleTemplate = ({ 
  pageContext: {
    title,
    createdAt,
    tags,
    content
  }
}) => (
  <Layout>
    <Helmet>
      <title>{title}</title>  
    </Helmet>  
    <ArticleContainer>
      <ArticleHeader>
        <ArticleTitle>{title}</ArticleTitle>
        <ArticleMetaData>
          <span>Published on {format(createdAt, 'D MMMM YYYY')}</span>
          {tags && <span>Tags: {tags.join(', ')}</span>}
        </ArticleMetaData>
      </ArticleHeader>
      <div dangerouslySetInnerHTML={{ __html: _get(content, ['childMarkdownRemark', 'html'], '') }} />
      <ArticleFooter>
        Hi, I'm Tom. Thanks for reading! I'm a front-end developer and sometimes-designer; everyday I write JavaScript and React.
      </ArticleFooter>
    </ArticleContainer>
  </Layout>
)

ArticleTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired
}

export default ArticleTemplate

