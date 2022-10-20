import styled from 'styled-components';

export const GenericButton = styled.div`
    height: ${props => props.height || '145px'};
    width: ${props => props.width || '145px'};
    margin-right: ${props => props.marginright || '20px'};

    background-color: ${props => props.clicked ? '#FFFED2' : '#FFFFF' };
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border-radius: 20px;
    border: 1px solid #CECECE;

    cursor: pointer;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */

    text-align: center;

    color: #454545;
`;
