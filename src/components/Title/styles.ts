import styled from 'styled-components';

export const Container = styled.div<{
    variant: 'primary' | 'secondary'
}>`
    font-family: Atkinson Hyperlegible;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 50px;
    color: ${ props => props.variant === 'primary' ? '#FCFCFC' : '#152938' };
    margin-bottom: 78px;
`;
