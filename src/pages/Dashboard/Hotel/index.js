import styled from 'styled-components';

export default function Hotel() {
  const modality = JSON.parse(localStorage.getItem('modality'));
  const payment = localStorage.getItem('payment');
  if(!modality || !payment) { 
    return (
      <MessageContainer> <p>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</p></MessageContainer>
    ); 
  }

  if(!modality.accommodation) {
    return (
      <MessageContainer> <p>Sua modalidade de ingresso não inclui hospedagem </p>
        <p>Prossiga para a escolha de atividades</p></MessageContainer>
    );
  }

  return (
    <>
    </>
  );
}

const MessageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  p {
    color: gray;
  }
`;
