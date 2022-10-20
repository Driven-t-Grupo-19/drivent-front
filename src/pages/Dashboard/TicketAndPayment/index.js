import { useState } from 'react';
import styled from 'styled-components';
import { GenericButton } from '../../../components/Button'; 
import { HeaderPage } from '../../../components/Header';
import { ConfirmButton } from '../../../components/ConfirmButton';
import Payment from './Payment';

export default function TickertAndPayment() {
  const [modality, setModality] = useState( 
    localStorage.getItem('modality')? JSON.parse(localStorage.getItem('modality')) : 
      {
        ticket: '',
        accommodation: '',
        value: 0
      });
  const [page, setPage] = useState(localStorage.getItem('modality')? 'payment' : 'ticket');
  
  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = useState({
    presential: 250,
    online: 100,
    accommodation: 200
  });

  function paymentPage() {
    return (
      <TicketContainer>
        <HeaderPage> Ingresso e pagamento </HeaderPage>
        <Payment/>
      </TicketContainer>
    );
  };

  function ticketPage() {
    return(
      <TicketContainer>
        <HeaderPage> Ingresso e pagamento </HeaderPage>
        <p> Primeiro, escolha sua modalidade de ingresso: </p>
        <ModalityContainer>
          <GenericButton onClick={() => setModality({ ticket: 'Presential', accommodation: '', value: values.presential })} 
            clicked={modality.ticket === 'Presential' ? true : false }>
            <h4> Presencial </h4>
            <h6>  R${values.presential} </h6>
          </GenericButton>
          <GenericButton onClick={() => setModality({ ticket: 'Online', accommodation: false, value: values.online  })} 
            clicked={modality.ticket === 'Online' ? true : false}>
            <h4> Online </h4>
            <h6>  R${values.online} </h6>
          </GenericButton>
        </ModalityContainer>
        {
          modality.ticket === 'Presential' ?  
            <>     
              <p> Otimo, agora escolha sua modalidade de hospedagem: </p>  
              <ModalityContainer>
                <GenericButton onClick={() => setModality({ ...modality, accommodation: true, value: values.presential + values.accommodation })} 
                  clicked={modality.accommodation}> 
                  <h4> Com Hotel </h4>
                  <h6> R${values.accommodation} </h6>
                </GenericButton>
                <GenericButton onClick={() => setModality({ ...modality, accommodation: false, value: values.presential })} 
                  clicked={modality.accommodation === false ? true : false}> 
                  <h4> Sem Hotel </h4> 
                  <h6> R$0</h6>
                </GenericButton>
              </ModalityContainer> 
            </>:
            ''
        }
        {
          modality.accommodation !== '' || modality.ticket === 'Online'? 
            <> 
              <p> Fechado! O total ficou em <b> R$ {modality.value} </b> . Agora é só confirmar: </p>
              <ConfirmButton onClick={saveLocalStorage}> RESERVAR INGRESSO </ConfirmButton>
            </>:
            ''
        }
      </TicketContainer>
    );
  };

  function saveLocalStorage() {
    localStorage.setItem('modality', JSON.stringify(modality));
    setPage('payment');
  };

  return(
    page === 'ticket'? ticketPage() :  paymentPage()
  );
}

const TicketContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  color: #454545;
  p{
    color: gray;
    font-size: 20px;
    b {
      font-weight: bold;
    }
  }
`;

const ModalityContainer = styled.div`
  margin-top: 20px;
  display: flex;
  margin-bottom: 20px;
`;

