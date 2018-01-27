import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import moment from 'moment'

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

const ArticleHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: baseline;
  justify-content: baseline;
  margin-top: 10px;
`;

const ArticleDate = styled.div`
  font-family: ${(props) => props.theme.fonts.sansSerifBold};
  background: ${(props) => props.theme.primary};
  padding: 5px 10px;
  text-align: center;
  line-height: 1.25;
`;

const Block = styled.span`
  display: block;
`;

const ArticleTitle = styled.h2`
  margin: 0 0 0 15px;
`;

export default class IndexPage extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  renderArticles() {
    const { edges: articles } = this.props.data.articles;
    const Articles = [];
    articles.forEach((article, key) => {
      const date = moment(article.node.createdAt);
      Articles.push(
        <div key={key}>
          <ArticleHeader>
            <ArticleDate>
              <Block>{date.format('D')}</Block>
              <Block>{date.format('MMM')}</Block>
              </ArticleDate>
            <ArticleTitle>{article.node.title}</ArticleTitle>
          </ArticleHeader>
          <p>{article.node.content.content}</p>
        </div>
      );
    });
    return Articles;
  }

  renderProjects() {
    const { edges: projects } = this.props.data.projects;
    const Projects = [];
    const date = (original) => moment(original).format('D MMM YYYY');
    projects.forEach((project, key) => {
      Projects.push(
        <div key={key}>
          <h2>{project.node.title}</h2>
          <Block>{project.node.employed}</Block>
          <Block>{date(project.node.started)} - {date(project.node.finished)}</Block>
          <p>{project.node.content.content}</p>
        </div>
      )
    });
    return Projects;
  }

  render() {
    const { node: content } = this.props.data.content.edges[0];
    console.log('data', this.props.data);
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
                <SectionH2>Articles</SectionH2>
                <SectionHeaderTagline>Assortment of coding, design, and life</SectionHeaderTagline>
              </SectionHeader>
              {this.renderArticles()}
            </Subsection>
            <Subsection>
              <SectionHeader>
                <SectionH2>Projects</SectionH2>
                <SectionHeaderTagline>Stuff I've worked on which I'm proud of</SectionHeaderTagline>
              </SectionHeader>
              {this.renderProjects()}
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
    articles: allContentfulArticle {
      edges {
        node {
          title
          content {
            content
          }
          createdAt
        }
      }
    }
    projects: allContentfulProject {
      edges {
        node {
          title
          content {
            content
          }
          employed
          started
          finished
        }
      } 
    }
  }
`;
