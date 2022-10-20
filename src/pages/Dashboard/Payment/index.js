import { useState } from 'react';
import styled from 'styled-components';
import { GenericButton } from '../../../components/Button'; 

export default function Payment() {
  const [modality, setModality] = useState('');

  return(
    <PaymentContainer>
      <h1>Ingresso e pagamento</h1>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <ModalityContainer>
        <GenericButton onClick={() => setModality('Presential')} clicked={modality === 'Presential' ? true : false }>Presential</GenericButton>
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

  h2{
    margin-top: 30px;
  }
`;

const ModalityContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;
