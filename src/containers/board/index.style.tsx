import styled from 'styled-components';

export const BoardWrapper = styled.section<{columnCount: number}>`
  display: flex;
  margin: 0 auto;
  width: ${({ columnCount }) => columnCount * 42.34}px;
`;

export const BoardRow = styled.div``;