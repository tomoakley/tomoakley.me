import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import marked from 'marked'

export default class AboutPage extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { node: content } = this.props.data.content.edges[0];
    return (
      <div>
        <Helmet>
          <title>About</title>
        </Helmet>
        <div dangerouslySetInnerHTML={{ __html: marked(content.content.content) }} />
      </div>
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