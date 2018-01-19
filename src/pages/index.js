import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: flex-start;
  margin-top: 30px;
`;

const ProfilePic = styled.img`
  border: solid 10px ${(props) => props.theme.primary};
  flex: 1 1 auto;
  width: 20%;
`;

const IntroText = styled.p`
  flex: 1 1 auto;
  margin: 0 0 0 40px;
  font-family: ${(props) => props.theme.fonts.sansSerif};
  font-size: 18px;
  font-size: 1.8rem;
  white-space: pre-line;
`;

export default class IndexPage extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const { node: content } = this.props.data.content.edges[0];
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div>
          <TopSection>
            <ProfilePic src={content.image.file.url} alt={content.image.title} />
            <IntroText>{content.content.content}</IntroText>
          </TopSection>
        </div>
      </div>
    )
  }
}

export const contentQuery = graphql`
  query ContentQuery {
    content: allContentfulPage(filter: { pageTitle: { eq: "Home" } }) {
      edges {
        node {
          pageTitle,
          content {
            content
          } 
          image {
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    }
  }
`;
