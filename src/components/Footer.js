import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  color: #EBF3F6;
  margin: 40px 0 15px;
`;

const ContactLink = styled.span`
  font-size: 1.6rem;
  &:not(:last-child) {
    padding-right: 10px; 
    &:after {
      content: '//';
      padding-left: 10px;
    }
  }
`

const CopyrightDetails = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.4rem;
  @media screen and (min-width: 400px) {
    flex-direction: row;
    align-items: center;
  }
`


export default () => {
  return (
    <Footer>
      <div>
        <ContactLink><a href="mailto:tom@tomoakley.me">tom@tomoakley.me</a></ContactLink>
        <ContactLink><a href="https://twitter.com/_tmkly">@_tmkly</a></ContactLink>
      </div>
      <CopyrightDetails>
        <span>
          &copy; Copyright Tom Oakley 2018, unless otherwise noted.
        </span>
        <span>
          <a href="https://github.com/tomoakley/tomoakley.me">View the source</a> |
          <a href="https://github.com/tomoakley/tomoakley.me/milestone/1">version 0.1 MVP</a>
        </span>
      </CopyrightDetails>
    </Footer>
  )
}