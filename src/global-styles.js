import { injectGlobal } from 'styled-components';

export const theme = {
  background: '#17263F',
  primary: '#A4C6CF',
  secondary: '#EBF3F6',
  fonts: {
    sansSerif: "'futura-pt', 'Helvetica Neue', Helvetica, sans-serif",
    sansSerifBold: "'futura-pt-bold', 'Helvetica Neue', Helvetica, sans-serif",
    serif: "'adelle', Georgia, Times New Roman, serif"
  }
};

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    font-size: 62.5%; 
  }
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    font-family: ${theme.fonts.sansSerif};
    font-size: 16px;
    font-size: 1.6rem;
    background-color: #17263F;
  }

  #___gatsby {
    color: #EBF3F6;
    min-height: 100%;
    min-width: 100%;
  }
  
  a:link,
  a:visited {
    color: #EBF3F6;
  }
`;
