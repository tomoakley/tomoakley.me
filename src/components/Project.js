import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import _get from 'lodash/get'

import Block from './Block'
import { renderStartAndFinishDates } from './Book'

const Title = styled.h2`
  font-family: ${props => props.theme.fonts.sansSerif};
`

const Project = ({
  details: {
    title,
    employed,
    started,
    finished,
    content,
    slug
  },
  hasSlug
}) => (
  <div>
    <Title>{hasSlug ? <Link to={`/project/${slug}`}>{title}</Link> : title}</Title>
    <Block>{employed}</Block>
    <Block>{renderStartAndFinishDates(started, finished)}</Block>
    {content && <div dangerouslySetInnerHTML={{ __html: _get(content, ['childMarkdownRemark', 'html'], '') }} />}
  </div>
)

Project.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    employed: PropTypes.string,
    started: PropTypes.string,
    finish: PropTypes.string,
    content: PropTypes.objectOf(PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({
        html: PropTypes.string
      })
    })),
    slug: PropTypes.string
  }).isRequired,
  hasSlug: PropTypes.bool,
}

export default Project