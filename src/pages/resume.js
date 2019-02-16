import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import _get from 'lodash/get'

import Layout from '../components/Layout'

export default class ResumePage extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { node: content } = this.props.data.content.edges[0]
    return (
      <Layout>
        <Helmet>
          <title>Résumé</title>
        </Helmet>
        <div dangerouslySetInnerHTML={{ __html: _get(content, ['content', 'childMarkdownRemark', 'html']) }} />
      </Layout>
    )
  }
}

export const contentQuery = graphql`
  query ResumePage {
    content: allContentfulPage(filter: { contentful_id: { eq: "3iDyj3aXRCmUKSymySaQI0" } }) {
      edges {
         node {
            content {
              childMarkdownRemark {
                html
              }
            } 
         }
      } 
    } 
  } 
`