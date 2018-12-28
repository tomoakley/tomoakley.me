import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'

import Project from './'

export default class ProjectList extends React.PureComponent {

  static propTypes = {
    projects: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        {_map(this.props.projects, (project, i) => (
          <Project 
            key={i}
            details={project.node}
            slug={`/project/${project.node.slug}`}
          />
        ))}
      </div>
    )

  }

}