import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";

import { theme } from "../../global-styles";

const StyledLink = styled(Link)`
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  padding: 0.8rem 0.5rem;
  font-family: ${(props) => props.theme.fonts.sansSerifBold};
  font-weight: 900;
  font-size: 16px;
  font-size: 1.6rem;
  color: ${(props) => props.theme.secondary};
  background: ${(props) => props.theme.primary};
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  &::after {
    content: attr(data-tag);
    display: block;
    font-family: ${(props) => props.theme.fonts.serif};
    font-size: 14px;
    font-size: 1.4rem;
    font-weight: normal;
    font-style: italic;
    text-transform: none;
  }

  &:active {
    background: #41addd;
    color: #fff;
  }

  > span {
    display: block;
  }
`;

const NavItem = styled.li`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 768px) {
    &:not(:first-child) {
      &::before {
        content: "♦";
        pointer-events: none;
      }
    }
  }
  &:hover > a {
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.primary};
    @media screen and (min-width: 660px) {
      animation: jump 1s 1;
      margin-top: -10px;
    }
  }
  &:active > a {
    margin-top: 0;
  }

  @keyframes jump {
    0% {
      margin-top: -10px;
    }
    50% {
      margin-top: -25px;
    }
    65% {
      margin-top: -5px;
    }
    85% {
      margin-top: -15px;
    }
    100% {
      margin-top: -10px;
    }
  }
`;

const HeaderLink = ({ to, tag, children }) => (
  <NavItem>
    <StyledLink
      to={to}
      data-tag={tag}
      activeStyle={{
        color: `${theme.primary}`,
        background: `${theme.secondary}`,
      }}
    >
      {children}
    </StyledLink>
  </NavItem>
);

HeaderLink.propTypes = {
  to: PropTypes.string,
  tag: PropTypes.string,
  children: PropTypes.node,
};

export default HeaderLink;
