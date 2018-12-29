import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _map from 'lodash/map'

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export default class List extends React.PureComponent {

  static propTypes = {
      items: PropTypes.arrayOf(PropTypes.object).isRequired,
      Component: PropTypes.node
  }

  render() {
    const { Component } = this.props
    return (
      <StyledList>
        { _map(this.props.items, (item, i) => (
          <Component
            key={i}
            details={item.node}
            hasSlug={true}
          />
        )) }
      </StyledList>
    )
  }
}