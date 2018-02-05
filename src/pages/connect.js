import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

export default class ConnectPage extends React.Component {

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
  query ConnectQuery {
    content: allContentfulPage(filter: { pageTitle: { eq: "Connect" } }) {
      edges {
         node {
            content { content } 
         }
      } 
    } 
  } 
`;