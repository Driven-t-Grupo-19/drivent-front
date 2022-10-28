import { useState } from 'react';
import styled from 'styled-components';
import { GenericButton } from '../../../components/Button';
import { HeaderPage } from '../../../components/Header';
import { ConfirmButton } from '../../../components/ConfirmButton';
import Payment from './Payment';

export default function TicketAndPayment() {
  // verifica se a pessoa ja escolheu algum ticket e salvou no localhost.
  const [modality, setModality] = useState(
    localStorage.getItem('modality') ? JSON.parse(localStorage.getItem('modality')) :
      {
        ticket: '',
        accommodation: '',
        value: 0
      });

  const [page, setPage] = useState(localStorage.getItem('modality') ? 'payment' : 'ticket');

  //valores dos ingressos presenciais/online/com hotel
  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = useState({
    presential: 250,
    online: 100,
    accommodation: 200
  });

  //chama a pagina de pagamento caso a pessoa tenha salvo no localstorage o ticket
  function paymentPage() {
    return (
      <TicketContainer>
        <HeaderPage> Ingresso e pagamento </HeaderPage>
        <Payment />
      </TicketContainer>
    );
  };

  //chama a pagina de ticket caso a pessoa nao tenha salvo no localstorage o ticket
  function ticketPage() {
    return (
      <TicketContainer>
        <HeaderPage> Ingresso e pagamento </HeaderPage>
        <p> Primeiro, escolha sua modalidade de ingresso: </p>
        <ModalityContainer>
          <GenericButton onClick={() => setModality({ ticket: 'Presencial', accommodation: '', value: values.presential })}
            clicked={modality.ticket === 'Presencial' ? true : false}>
            <h4> Presencial </h4>
            <h6>  R${values.presential} </h6>
          </GenericButton>
          <GenericButton onClick={() => setModality({ ticket: 'Online', accommodation: false, value: values.online })}
            clicked={modality.ticket === 'Online' ? true : false}>
            <h4> Online </h4>
            <h6>  R${values.online} </h6>
          </GenericButton>
        </ModalityContainer>
        {
          modality.ticket === 'Presencial' ?
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
            </> :
            ''
        }
        {
          modality.accommodation !== '' || modality.ticket === 'Online' ?
            <>
              <p> Fechado! O total ficou em <b> R$ {modality.value} </b> . Agora é só confirmar: </p>
              <ConfirmButton onClick={saveLocalStorage}> RESERVAR INGRESSO </ConfirmButton>
            </> :
            ''
        }
      </TicketContainer>
    );
  };

  //salva no localstorage o ticket como key 'modality'
  function saveLocalStorage() {
    localStorage.setItem('modality', JSON.stringify(modality));
    setPage('payment');
  };

  function getPage() {
    const isEnrolled = localStorage.getItem('isEnrolled');

    if (!isEnrolled) {
      return (
        <TicketContainer>
          <NotLoggedHeader> Ingresso e pagamento </NotLoggedHeader>
          <NotLoggedContainer>
            <p>Você precisa completar sua inscrição antes</p>
            <p>de prosseguir pra escolha de ingresso</p>
          </NotLoggedContainer>
        </TicketContainer>
      );
    } else {
      return page === 'ticket' ? ticketPage() : paymentPage();
    }
  }

  return (
    getPage()
  );
}

const NotLoggedContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #8E8E8E;
  flex-direction: column;
`;

const TicketContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  color: #454545;

  p {
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

const NotLoggedHeader = styled.h1`
  font-size: 34px;
`;
