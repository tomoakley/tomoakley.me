import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #EBF3F6;
  margin: 10px 0 15px;
  font-size: 14px;
  font-size: 1.4rem;
`;

export default () => {
  return (
    <Footer>
      <span>
        &copy; Copyright Tom Oakley 2018, unless otherwise noted.
      </span>
      <span>
        <a href="https://github.com/tomoakley/tomoakley.me">View the source</a> |
        <a href="https://github.com/tomoakley/tomoakley.me/milestone/1">version 0.1 MVP</a>
      </span>
    </Footer>
  )
}