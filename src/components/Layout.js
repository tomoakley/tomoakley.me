import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'

import { theme, GlobalStyle } from '../global-styles'
import Header from '../components/Header'
import Footer from '../components/Footer'

const AppWrapper = styled.div`
  max-width: calc(1140px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  line-height: 1.5;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <Helmet
            titleTemplate="%s // Tom Oakley, developer & designer"
            defaultTitle="Tom Oakley, developer & designer"
          >
            <html lang="en" />
            <meta name="description" content="Tom Oakley // JavaScript developer and designer for the web" />
            <link rel="stylesheet" href="https://use.typekit.net/gri1fbz.css"/>
          </Helmet>
          <GlobalStyle />
          <Header titles={data.pages.edges} />
          {children}
          <Footer />
        </AppWrapper>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
