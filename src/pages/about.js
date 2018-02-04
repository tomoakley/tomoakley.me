import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import marked from 'marked';

export default class AboutPage extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { node: content } = this.props.data.content.edges[0];
    return (
      <div dangerouslySetInnerHTML={{ __html: marked(content.content.content) }} />
    );
  }
}

export const contentQuery = graphql`
  query AboutPage {
    content: allContentfulPage(filter: { pageTitle: { eq: "About" } }) {
      edges {
         node {
            content { content } 
         }
      } 
    } 
  } 
`;