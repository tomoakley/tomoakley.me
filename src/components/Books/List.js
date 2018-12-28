import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import marked from 'marked'
import _map from 'lodash/map'
import _join from 'lodash/join'
import { format, isSameYear, isSameMonth } from 'date-fns'

const BookList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const BookContainer = styled.li`
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

const BookImg = styled.img`
  float: left;
  width: 20%;
  max-width: 125px;
  padding: 0 10px 0 0;
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

export default class BooksList extends React.PureComponent {

  static propTypes = {
      books: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  renderStartAndFinishDates(startDate, finishDate) {
    return isSameMonth(startDate, finishDate) ?
      format(startDate, 'MMM YYYY') :
      isSameYear(startDate, finishDate) ?
        `${format(startDate, 'MMM')} - ${format(finishDate, 'MMM')} ${format(finishDate, 'YYYY')}` :
        `${format(startDate, 'MMM YY')} - ${format(finishDate, 'MMM YY')}`
  }

  renderBook({ 
    node: {
      title,
      author,
      startDate,
      finishDate,
      rating,
      tags,
      shortReview,
      coverPhoto,
      linkToBuy
    }
  }) {
      return (
          <BookContainer>
              <BookHeader>
                  <h2>{title}</h2>
                  <AuthorName>{author}</AuthorName>
              </BookHeader>
              <BookDetails>
                  <DetailsItem>
                      {this.renderStartAndFinishDates(startDate, finishDate)}
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
                    <BookImg src={coverPhoto.file.url} alt={`${title} cover`} />
                    <P dangerouslySetInnerHTML={{ __html: marked(shortReview.shortReview) }} />
                </ItemContents>
              )}
              <AmazonLink href={linkToBuy}>Amazon &#8594;</AmazonLink>
          </BookContainer>
      )
  }

  render() {
    const { books } = this.props
    return (
      <BookList>
        { _map(books, book => this.renderBook(book)) }
      </BookList>
    )
  }
}