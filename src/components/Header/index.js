import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _map from 'lodash/map'

import SiteName from './Name'
import NavBar from './NavBar'
import HeaderLink from './HeaderLink'

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 600px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const Header = ({ titles }) => (
  <StyledHeader>
    <SiteName />
    <NavBar>
      {_map(titles, (title, i) => (
        <HeaderLink 
          to={`/${title.node.slug}`}
          tag={title.node.shortDescription}
          key={i}
        >
          {title.node.pageTitle}
        </HeaderLink> 
      ))}
    </NavBar>
  </StyledHeader>
)

Header.propTypes = {
  titles: PropTypes.array.isRequired
}

export default Header;
