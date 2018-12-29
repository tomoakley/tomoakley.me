import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Project from '../components/Project'

const ProjectTemplate = ({ pathContext }) => (
  <div>
    <Helmet>
      <title>{pathContext.title}</title>  
    </Helmet>
    <Project details={pathContext} />
  </div>
)

ProjectTemplate.propTypes = {
  pathContext: PropTypes.object.isRequired
}

export default ProjectTemplate