import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import marked from 'marked'

import Block from '../Block'
import { renderStartAndFinishDates } from '../Book'

const Title = styled.h2`
  font-family: ${props => props.theme.fonts.sansSerif};
`

const Project = ({
  details: {
    title,
    employed,
    started,
    finished,
    content
  },
  slug
}) => (
  <div>
    <Title>{slug ? <Link to={slug}>{title}</Link> : title}</Title>
    <Block>{employed}</Block>
    <Block>{renderStartAndFinishDates(started, finished)}</Block>
    {content && <p dangerouslySetInnerHTML={{ __html: marked(content.content) }} />}
  </div>
)

Project.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    employed: PropTypes.node.string,
    started: PropTypes.string,
    finish: PropTypes.string,
    content: PropTypes.objectOf(PropTypes.string)
  }),
  slug: PropTypes.string,
}

export default Project