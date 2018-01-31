import styled from 'styled-components';

const ArticleHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: baseline;
  justify-content: baseline;
  margin-top: 10px;
`;

const ArticleDate = styled.div`
  font-family: ${(props) => props.theme.fonts.sansSerifBold};
  background: ${(props) => props.theme.primary};
  padding: 5px 10px;
  text-align: center;
  line-height: 1.25;
`;

const ArticleTitle = styled.h2`
  margin: 0 0 0 15px;
`;

export { ArticleTitle, ArticleHeader, ArticleDate };