import { useState } from 'react';
import styled from 'styled-components';
import { GenericButton } from '../../../components/Button'; 

export default function Payment() {
  const [modality, setModality] = useState('');

  return(
    <PaymentContainer>
      <ModalityContainer>
        <GenericButton onClick={() => setModality('Presential')} clicked={modality === 'Presential' ? true : false }>Presencial</GenericButton>
        <GenericButton onClick={() => setModality('Online')} clicked={modality === 'Online' ? true : false}>Online</GenericButton>
      </ModalityContainer>
    </PaymentContainer>
  );
}

const PaymentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
`;

const ModalityContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;
