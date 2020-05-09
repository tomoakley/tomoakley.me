import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import _get from 'lodash/get'

import Layout from '../components/Layout'

const Content = styled.div`
  max-width: 80ch;
`

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
        <Content dangerouslySetInnerHTML={{ __html: _get(content, ['content', 'childMarkdownRemark', 'html']) }} />
      </Layout>
    )
  }
}

export const contentQuery = graphql`
  query AboutPage {
    content: allContentfulPage(filter: { pageTitle: { eq: "About" } }) {
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
