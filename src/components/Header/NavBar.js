import styled from 'styled-components';

export default styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 0 0 auto;
  height: 100%;
  width: 100%;
  list-style: none;
  margin: 0;
  text-align: center;
  background-color: ${props => props.theme.primary};
  border: solid thin ${props => props.theme.background};
  padding: 0;
  @media screen and (min-width: 660px) {
    width: 60%;
  }
`;
