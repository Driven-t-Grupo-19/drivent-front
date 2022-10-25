import { useState } from 'react';
import styled from 'styled-components';
import CardForm from './formCard';

export default function Payment() {
  // verifica se a pessoa ja escolheu algum ticket e salvou no localhost.
  const [modality, setModality] = useState(
    localStorage.getItem('modality') ?
      JSON.parse(localStorage.getItem('modality'))
      :
      {}
  );

  function getModalityText() {
    let result = `${modality.ticket}`;

    if (modality.accomodation) {
      result += ' + Com Hotel';
    } else {
      result += ' + Sem Hotel';
    };

    return result;
  }

  return (
    <TicketContainer>
      <p>Ingresso escolhido</p>
      <TicketResult>
        <h3>{getModalityText()}</h3>
        <h4>R$ {modality.value}</h4>
      </TicketResult>
      <p> Pagamento </p>
      <CardForm />
    </TicketContainer>
  );
};

const TicketResult = styled.div`
  height: 109px;
  width: 290px;
  margin-top: 20px;
  min-height: 109px;
  background-color: #FFEED2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 290px;
  height: 100px;
  background-color: #FFEED2;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 20px;

  h2{
    margin-bottom: 6px;
    font-size: 16px;
    color: #454545;
  }

  h3{
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }

`;

const TicketContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
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
