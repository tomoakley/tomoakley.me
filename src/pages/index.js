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

const SubsectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const Subsection = styled.div`
  flex: 1 1 50%;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  background: ${(props) => props.theme.primary};
  color: #EBF3F6;
  font-family: ${props => props.theme.fonts.sansSerifBold};
  font-size: 22px;
  font-size: 2.2rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px 15px;
`;

const SectionHeaderTagline = styled.span`
  font-family: ${(props) => props.theme.fonts.sansSerif};
  font-size: 16px;
  font-size: 1.6rem;
  font-weight: normal;
  text-transform: none;
  font-style: normal;
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
          <SubsectionContainer>
            <Subsection>
              <SectionHeader>
                Articles
                <SectionHeaderTagline>Assortment of coding, design, and life</SectionHeaderTagline>
              </SectionHeader>
            </Subsection>
            <Subsection>
              <SectionHeader>
                Projects
                <SectionHeaderTagline>Stuff I've worked on which I'm proud of</SectionHeaderTagline>
              </SectionHeader>
            </Subsection>
          </SubsectionContainer>
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
