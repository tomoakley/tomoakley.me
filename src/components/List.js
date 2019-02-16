import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'

export default class List extends React.Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    Component: PropTypes.func
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  render() {
    const { Component } = this.props
    return _map(this.props.items, (item, i) => (
      <Component
        key={i}
        details={item.node}
        hasSlug={true}
      />
    ))
  }
}