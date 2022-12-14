import styled from 'styled-components';

export const ConfirmButton = styled.button`
    color: ${props => props.color || 'black'};
    height: ${props => props.height || '37px'};
    min-height: 37px;
    min-width: 180px;
    width: ${props => props.width || '180px'};
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    border: none;

    background:  ${props => props.background || '#E0E0E0'};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    cursor: pointer;
    margin: 15px 0 15px 0;
`;
