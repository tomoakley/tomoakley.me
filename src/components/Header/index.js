import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';

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
    titles: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      headerLinks: {},
    };
  }

  componentWillMount() {
    const { titles, activePage } = this.props;
    let navbarItems = {};
    titles.forEach((title, i) => {
      navbarItems[title.node.pageTitle] = (
        <HeaderLink to={`/${title.node.slug}`}
                    data-tag={title.node.shortDescription}
                    key={i}>
          {title.node.pageTitle}
        </HeaderLink>
      );
    });
    this.setState({ headerLinks: navbarItems });
  }

  render() {
    return (
      <StyledHeader>
        <SiteName />
        <NavBar>{_map(this.state.headerLinks)}</NavBar>
      </StyledHeader>
    );
  }
}

export default Header;
