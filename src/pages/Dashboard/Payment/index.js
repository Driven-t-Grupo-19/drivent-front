import { useState } from 'react';
import styled from 'styled-components';
import { GenericButton } from '../../../components/Button'; 

export default function Payment() {
  const [modality, setModality] = useState('');
  const [hotel, setHotel] = useState('');
  const [total, setTotal] = useState(0);

  return(
    <PaymentContainer>
      <h1>Ingresso e pagamento</h1>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <ModalityContainer>
        <GenericButton onClick={() => setModality('Presential')} clicked={modality === 'Presential' ? true : false }>Presencial</GenericButton>
        <GenericButton onClick={() => setModality('Online')} clicked={modality === 'Online' ? true : false}>Online</GenericButton>
      </ModalityContainer>
      {
        modality ? 
          <>
            <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
            <HotelContainer>
              <GenericButton onClick={() => setHotel('noHotel')} clicked={hotel === 'noHotel' ? true : false }>Sem Hotel</GenericButton>
              <GenericButton onClick={() => setHotel('withHotel')} clicked={hotel === 'withHotel' ? true : false}>Com Hotel</GenericButton>
            </HotelContainer>
          </> : false
      }
      {
        hotel ?
          <>
            <h2>Fechado! O total ficou em R$ {total}. Agora é só confirmar:</h2>
          </> : false
      }
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

const HotelContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;
