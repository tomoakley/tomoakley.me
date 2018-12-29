import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Project from '../components/Project'

const ProjectTemplate = ({ pageContext }) => (
  <Layout>
    <Helmet>
      <title>{pageContext.title}</title>  
    </Helmet>
    <Project details={pageContext} />
  </Layout>
)

ProjectTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired
}

export default ProjectTemplate