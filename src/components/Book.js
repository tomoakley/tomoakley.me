import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { format, isSameYear, isSameMonth } from 'date-fns'
import _kebabCase from 'lodash/kebabCase'
import _join from 'lodash/join'
import marked from 'marked'

const BookContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`

const BookHeader = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  @media screen and (min-width: 420px) {
    flex-direction: row;
  }
  > h2, h3 {
    margin: 0;
    font-family: ${props => props.theme.fonts.sansSerif};
  }
`

const AuthorName = styled.h3`
  @media screen and (min-width: 420px) {
    padding-left: 10px;
  }
`

const BookDetails = styled.ul`
  margin: 5px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`

const DetailsItem = styled.li`
  padding-right: 10px;
  flex: 0 0 auto;
  &:not(:last-child):after {
      content: '//';
      padding-left: 10px;
  }
`

const ItemContents = styled.div`
  margin-top: 10px;
`

const BookImg = styled(Img)`
  float: left;
  width: 20%;
  max-width: 125px;
  margin: 0 10px 0 0;
`

const P = styled.p`
  margin: 0;
  > p {
    margin: 0;
  }
`

const AmazonLink = styled.a`
  font-size: 1.4rem;
  display: block;
  margin-top: 5px;
`

export const renderStartAndFinishDates = (startDate, finishDate) => {
  return isSameMonth(startDate, finishDate) ?
    format(startDate, 'MMM YYYY') :
    isSameYear(startDate, finishDate) ?
      `${format(startDate, 'MMM')} - ${format(finishDate, 'MMM')} ${format(finishDate, 'YYYY')}` :
      `${format(startDate, 'MMM YYYY')} - ${format(finishDate, 'MMM YYYY')}`
}

const getSlug = (startDate, title) => (
  `/book/${format(startDate, 'YYYY')}/${_kebabCase(title)}`
)

const Book = ({ 
  details: {
    title,
    author,
    startDate,
    finishDate,
    rating,
    tags,
    shortReview,
    coverPhoto,
    linkToBuy
  },
  hasSlug
}) => (
  <BookContainer>
    <BookHeader>
      <h2>{hasSlug ? <Link to={getSlug(startDate, title)}>{title}</Link> : title}</h2>
      <AuthorName>{author}</AuthorName>
    </BookHeader>
    <BookDetails>
      <DetailsItem>
        {renderStartAndFinishDates(startDate, finishDate)}
      </DetailsItem>
      <DetailsItem>
        {rating} {' '} &#9733;
      </DetailsItem>
      <DetailsItem>
        {_join(tags, ', ')}
      </DetailsItem>
    </BookDetails>
    {shortReview && (
      <ItemContents>
        <BookImg fluid={coverPhoto.fluid} alt={coverPhoto.description} />
        <P dangerouslySetInnerHTML={{ __html: marked(shortReview.shortReview) }} />
      </ItemContents>
    )}
    {linkToBuy && <AmazonLink href={linkToBuy}>Amazon &#8594;</AmazonLink>}
  </BookContainer>
)

Book.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    startDate: PropTypes.string,
    finishDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    shortReview: PropTypes.objectOf(PropTypes.string),
    coverPhoto: PropTypes.shape({
      description: PropTypes.string,
      fluid: PropTypes.object
    }),
    linkToBuy: PropTypes.string
  }).isRequired,
  hasSlug: PropTypes.bool
}

export default Book