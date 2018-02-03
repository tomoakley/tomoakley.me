import styled from 'styled-components';

export default styled.ul`
  display: flex;
  justify-content: space-between;
  flex: 0 0 auto;
  width: 60%;
  height: 100%;
  list-style: none;
  margin: 0;
  text-align: center;
  background-color: ${props => props.theme.primary};
  border: solid thin ${props => props.theme.background};
  padding: 0;
`;
