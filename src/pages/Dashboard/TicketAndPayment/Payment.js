import styled from 'styled-components';

export default function Payment() {
  return(
    <Container>
      <h1>Ingresso escolhido</h1>
      <InfoBox>
        <h2>Presencial + com hotel</h2>
        <h3>R$ 600</h3>
      </InfoBox>
      <h1>Pagamento</h1>
      <CreditCard></CreditCard>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  h1{
    color:#8E8E8E;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
  }
`;

const InfoBox = styled.div`
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

const CreditCard = styled.div`
`;
