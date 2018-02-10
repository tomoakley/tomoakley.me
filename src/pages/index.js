import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import marked from 'marked'
import ProjectList from '../components/Project/List';
import ArticleList from "../components/Article/List";

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
  justify-content: space-between;
  margin-top: 30px;
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
      }
    } = this.props.data;
    return (
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
  }
`;
