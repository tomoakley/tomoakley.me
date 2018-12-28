import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import marked from 'marked'
import ProjectList from '../components/Project/List';
import ArticleList from "../components/Article/List";
import BooksList from '../components/Books/List';

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  @media screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between; 
    align-items: flex-start;
  }
`;

const ProfilePic = styled.img`
  border: solid 10px ${(props) => props.theme.primary};
  flex: 1 1 auto;
  width: 20%;
  display: none;
  @media screen and (min-width: 600px) {
    display: block;
  }
`;

const IntroText = styled.div`
  flex: 1 1 auto;
  margin: 0;
  font-family: ${(props) => props.theme.fonts.sansSerif};
  font-size: 18px;
  font-size: 1.8rem;
  > p:first-child {
    margin-top: 0;
  }
  @media screen and (min-width: 600px) {
    margin-left: 40px;
  }
`;

const SubsectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 30px;
  @media screen and (min-width: 730px) {
    flex-direction: row;
  }
`;

const Subsection = styled.div`
  flex: 0 1 45%;
`;

const SectionHeader = styled.div`
  display: inline-flex;
  align-items: baseline;
  background: ${(props) => props.theme.primary};
  color: #EBF3F6;
  padding: 10px 15px;
`;

const SectionH2 = styled.h2`
  margin: 0;
  font-family: ${props => props.theme.fonts.sansSerifBold};
  font-size: 22px;
  font-size: 2.2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const SectionHeaderTagline = styled.span`
  font-family: ${(props) => props.theme.fonts.sansSerif};
  font-style: italic;
  padding-left: 15px;
`;

const Small = styled.small`
  margin-top: 15px;
  display: block;
`

export default class IndexPage extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const {
      content: {
        edges: {
          0: {
            node: content
          }
        }
      },
      projects: {
        edges: projects
      },
      articles: {
        edges: articles
      },
      books: {
        edges: books
      }
    } = this.props.data;
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div>
          <TopSection>
            <ProfilePic src={content.image.file.url} alt={content.image.title} />
            <IntroText dangerouslySetInnerHTML={{ __html: marked(content.content.content) }}/>
          </TopSection>
          <SubsectionContainer>
            <Subsection>
              <SectionHeader>
                <SectionH2>Articles</SectionH2>
                <SectionHeaderTagline>Assortment of coding, design, and life</SectionHeaderTagline>
              </SectionHeader>
              <ArticleList articles={articles} />
            </Subsection>
            <Subsection>
              <SectionHeader>
                <SectionH2>Projects</SectionH2>
                <SectionHeaderTagline>Stuff I've worked on which I'm proud of</SectionHeaderTagline>
              </SectionHeader>
              <ProjectList projects={projects} />
            </Subsection>
          </SubsectionContainer>
          <SubsectionContainer>
            <Subsection>
              <SectionHeader>
                <SectionH2>Books</SectionH2>
                <SectionHeaderTagline>Books I am reading or have read</SectionHeaderTagline>
              </SectionHeader>
              <BooksList books={books} />
              <Small>[Ed: Hi - if you like my book reviews, I have an <a href="http://amzn.eu/5yb7kVb">Amazon Wishlist</a> full of books; go there to find out what I'll be reading in the future! I'd be absolutely honoured if you wanted to buy me something off that list (but I'm not expecting that from anyone in the slightest). Thanks!]</Small>
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
    articles: allContentfulArticle(sort: { fields: [ createdAt ], order: DESC }, limit: 3) {
      edges {
        node {
          title
          content {
            content
          }
          createdAt
          slug
        }
      }
    }
    projects: allContentfulProject(sort: { fields: [ started ], order: DESC }, limit: 3) {
      edges {
        node {
          title
          content {
            content
          }
          employed
          started
          finished
          slug
        }
      } 
    }
    books: allContentfulReadingList(sort: { fields: [ startDate ], order: DESC }, limit: 3) {
      edges {
        node {
          title
          startDate
          finishDate
          linkToBuy
          rating
          tags
          author
          shortReview {
            shortReview
          }
          quotes
          coverPhoto {
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
