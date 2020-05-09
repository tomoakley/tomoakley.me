import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";
import Helmet from "react-helmet";
import _get from "lodash/get";

import Layout from "../components/Layout";
import List from "../components/List";
import Book from "../components/Book";
import Project from "../components/Project";
import Article from "../components/Article";

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

const ProfilePic = styled(Img)`
  border: solid 10px ${(props) => props.theme.primary};
  flex: 1 1 100%;
  max-width: 235px;
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
  color: #ebf3f6;
  padding: 10px 15px;
`;

const SectionH2 = styled.h2`
  margin: 0;
  font-family: ${(props) => props.theme.fonts.sansSerifBold};
  font-size: 22px;
  font-size: 2.2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const SectionHeaderTagline = styled.span`
  font-family: ${(props) => props.theme.fonts.serif};
  font-style: italic;
  padding-left: 15px;
`;

const Small = styled.small`
  margin-top: 15px;
  display: block;
`;

export default class IndexPage extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const {
      content: {
        edges: {
          0: { node: content },
        },
      },
      projects: { edges: projects },
      articles: { edges: articles },
      books: { edges: books },
    } = this.props.data;
    return (
      <Layout>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div>
          <TopSection>
            <ProfilePic
              fluid={content.image.fluid}
              alt={content.image.description}
            />
            <IntroText
              dangerouslySetInnerHTML={{
                __html: _get(
                  content,
                  ["content", "childMarkdownRemark", "html"],
                  ""
                ),
              }}
            />
          </TopSection>
          <SubsectionContainer>
            <Subsection>
              <SectionHeader>
                <SectionH2>Articles</SectionH2>
                <SectionHeaderTagline>
                  Assortment of coding, design, and life
                </SectionHeaderTagline>
              </SectionHeader>
              <List items={articles} Component={Article} />
            </Subsection>
            <Subsection>
              <SectionHeader>
                <SectionH2>Projects</SectionH2>
                <SectionHeaderTagline>
                  Stuff I've worked on which I'm proud of
                </SectionHeaderTagline>
              </SectionHeader>
              <List items={projects} Component={Project} />
            </Subsection>
          </SubsectionContainer>
          <SubsectionContainer>
            <Subsection>
              <SectionHeader>
                <SectionH2>Books</SectionH2>
                <SectionHeaderTagline>
                  Books I am reading or have read
                </SectionHeaderTagline>
              </SectionHeader>
              <List items={books} Component={Book} />
              <Small>
                [Ed: Hi - if you like my book reviews, I have an{" "}
                <a href="http://amzn.eu/5yb7kVb">Amazon Wishlist</a> full of
                books; go there to find out what I'll be reading in the future!
                I'd be absolutely honoured if you wanted to buy me something off
                that list (but I'm not expecting that from anyone in the
                slightest). Thanks!]
              </Small>
            </Subsection>
          </SubsectionContainer>
        </div>
      </Layout>
    );
  }
}

export const contentQuery = graphql`
  query ContentQuery {
    content: allContentfulPage(filter: { pageTitle: { eq: "Home" } }) {
      edges {
        node {
          pageTitle
          content {
            childMarkdownRemark {
              html
            }
          }
          image {
            description
            fluid(maxWidth: 235) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
    articles: allContentfulArticle(
      sort: { fields: [createdAt], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          title
          coverPhoto {
            fluid(maxWidth: 350) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          content {
            childMarkdownRemark {
              html
            }
          }
          createdAt
          slug
          preview {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    projects: allContentfulProject(
      sort: { fields: [started], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          title
          content {
            childMarkdownRemark {
              html
            }
          }
          employed
          started
          finished
          slug
        }
      }
    }
    books: allContentfulReadingList(
      sort: { fields: [startDate], order: DESC }
      limit: 3
    ) {
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
            childMarkdownRemark {
              html
            }
          }
          quotes
          coverPhoto {
            description
            fluid(maxWidth: 106) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
