import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SiteName from './Name';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    titles: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      headerLinks: []
    };
  }

  componentWillMount() {
    let navbarItems = [];
    this.props.titles.forEach((title, i) => {
      const NavbarItem = (
        <HeaderLink to={`/${title.node.pageTitle.toLowerCase()}`}
                    data-tag={title.node.shortDescription}
                    key={i}>
          {title.node.pageTitle}
        </HeaderLink>
      );
      navbarItems.push(NavbarItem);
    });
    this.setState({ headerLinks: navbarItems });
  }

  render() {
    return (
      <StyledHeader>
        <SiteName />
        <NavBar>{this.state.headerLinks}</NavBar>
      </StyledHeader>
    );
  }
}

export default Header;
