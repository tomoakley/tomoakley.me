import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'

import { theme } from '../global-styles';
import Header from '../components/header';

const AppWrapper = styled.div`
  max-width: calc(1140px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  line-height: 1.5;
`;

const TemplateWrapper = ({children, data}) => (
  <ThemeProvider theme={theme}>
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Tom Oakley"
        defaultTitle="Tom Oakley"
      >
        <meta name="description" content="Tom Oakley - software developer" />
        <link rel="stylesheet" href="https://use.typekit.net/gri1fbz.css" />
      </Helmet>
      <Header titles={data.pages.edges} />
      {children()}
    </AppWrapper>
  </ThemeProvider>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
}

export const pageQuery = graphql`
  query PageQueryAndContentQuery {
    pages: allContentfulPage(filter: { includeInNavbar: { eq: true } }) {
      edges {
        node {
          pageTitle
          shortDescription
        }
      }
    }
  }
`;

export default TemplateWrapper;
