import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import marked from 'marked'

import Layout from '../components/Layout'

export default class AboutPage extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { node: content } = this.props.data.content.edges[0];
    return (
      <Layout>
        <Helmet>
          <title>About</title>
        </Helmet>
        <div dangerouslySetInnerHTML={{ __html: marked(content.content.content) }} />
      </Layout>
    )
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
`