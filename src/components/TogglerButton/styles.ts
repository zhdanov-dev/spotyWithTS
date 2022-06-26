import styled from 'styled-components';

export const Container = styled.div`
  .switch {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  input:checked + .slider {
    background-color: ${({ theme }) => theme.background};
  }

  span {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .ddd {
    display: none;
  }
  
`;

export const Icons = styled.span`

  svg {
    color: ${({ theme }: any) => theme.text};
    z-index: 11;
  }
`;

