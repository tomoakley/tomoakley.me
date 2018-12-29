import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import ProjectList from '../components/Project/List'

export default class ProjectsPage extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { edges: projects } = this.props.data.projects;
    return (
      <div>
        <Helmet>
          <title>Projects</title>
        </Helmet>
        <ProjectList projects={projects} />
      </div>
    )
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
`