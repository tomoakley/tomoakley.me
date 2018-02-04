import React from 'react';
import PropTypes from 'prop-types';
import ProjectList from "../components/Project/List";

export default class ProjectsPage extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { edges: projects } = this.props.data.projects;
    return <ProjectList projects={projects} />
  }
}

export const projectsQuery = graphql`
  query ProjectsQuery {
    projects: allContentfulProject(sort: { fields: [ started ], order: DESC }) {
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