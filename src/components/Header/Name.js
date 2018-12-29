import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const NameContainer = styled(Link)`
  flex: 0 0 auto; 
  padding: 10px 20px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.secondary};
  text-align: center;
  text-decoration: none;
  line-height: 1.2;
  border: solid thin ${props => props.theme.primary};
  border-top-width: 0;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.background};
  }
`;

const Introducing = styled.span`
  font-family: ${props => props.theme.fonts.sansSerif};
  font-style: italic;
  font-size: 12px;
  font-size: 1.2rem;
  text-decoration: underline;
`;

const Name = styled.h1`
  font-family: ${props => props.theme.fonts.sansSerifBold};
  margin: 0;
  text-transform: uppercase;
  font-size: 22px;
  font-size: 2.2rem;
`;

const Tagline = styled.span`
  font-family: ${props => props.theme.fonts.serif};
  font-size: 16px;
  font-size: 1.6rem;
  font-style: italic;
`;

export default function SiteName() {
  return (
    <NameContainer to="/">
      <Introducing>from the desk of</Introducing>
      <Name>Tom Oakley</Name>
      <Tagline>developer // designer</Tagline>
    </NameContainer>
  );
}


