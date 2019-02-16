import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import List from '../components/List'
import Project from '../components/Project'

export default class ProjectsPage extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { edges: projects } = this.props.data.projects;
    return (
      <Layout>
        <Helmet>
          <title>Projects</title>
        </Helmet>
        <List
          items={projects}
          Component={Project}
        />
      </Layout>
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
  } 
`