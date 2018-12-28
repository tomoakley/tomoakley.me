import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'

import { theme } from '../global-styles';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppWrapper = styled.div`
  max-width: calc(1140px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  line-height: 1.5;
`;

export default class TemplateWrapper extends React.PureComponent {

  getPageTitle() {
    const {
      location: { pathname }
    } = this.props;
    switch (pathname) {
      case '/':
        return 'Home';
      case '/about':
        return 'About';
      case '/articles':
        return 'Articles';
      case '/projects':
        return 'Projects';
      case '/resume':
        return 'Résumé';
    }
  }

  render() {
    const { data, children } = this.props;
    return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Helmet
          titleTemplate="%s // Tom Oakley, developer & designer"
          defaultTitle="Tom Oakley, developer & designer"
        >
          <html lang="en" />
          <title>{this.getPageTitle()}</title>
          <meta name="description" content="Tom Oakley // JavaScript developer and designer for the web" />
          <link rel="stylesheet" href="https://use.typekit.net/gri1fbz.css"/>
        </Helmet>
        <Header titles={data.pages.edges} />
        {children()}
        <Footer />
      </AppWrapper>
    </ThemeProvider>
    )
  }
}

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
          shortDescription,
          slug
        }
      }
    }
  }
`;
