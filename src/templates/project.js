import React from 'react'
import PropTypes from 'prop-types'

import Project from '../components/Project'

const ProjectTemplate = ({ pathContext }) => (
  <Project details={pathContext} />
)

ProjectTemplate.propTypes = {
  pathContext: PropTypes.object.isRequired
}

export default ProjectTemplate