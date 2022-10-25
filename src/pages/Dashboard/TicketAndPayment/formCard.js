import { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Input from '../../../components/Form/Input';
import { ConfirmButton } from '../../../components/ConfirmButton';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ptBR } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import { toast } from 'react-toastify';
import Payment from 'payment';
import { createEnroll } from '../../../services/postEnrollApi';
import { postOrUpdatePurchase } from '../../../services/purchaseApi';
import Vector from '../../../assets/images/Vector.png';

export default function CardForm() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [focus, setFocus] = useState('');
  const expiryDateFormatted = dayjs(expiry).format('MM/YY').toString();
  const token = JSON.parse(localStorage.getItem('userData'));
  const [payment, setPayment] = useState(localStorage.getItem('payment')? localStorage.getItem('payment') : '');

  async function finalizedOrder(e) {
    e.preventDefault();
    const paymentExpiryDate = expiryDateFormatted.split('/');

    if (!Payment.fns.validateCardNumber(number)) {
      toast('Número de cartão inválido.');
      return;
    }
    if (!Payment.fns.validateCardExpiry(...paymentExpiryDate)) {
      toast('Validade de cartão inválida.');
      return;
    }
    if (!Payment.fns.validateCardCVC(cvc)) {
      toast('CVC de cartão inválido.');
      return;
    }
    await createEnroll(token.token);
    const postPayment = await postOrUpdatePurchase(token.token);
    setPayment(postPayment);
    if(postPayment === 'OK') {
      localStorage.setItem('payment', 'true');
    };
  }

  if(payment !== '') {
    return (
      <Container>
        <div>
          <img src={Vector} alt="Confirm" />
        </div>
        <div>
          <h4> <b> Pagamento confirmado!  </b> </h4>
          <h6> Prossiga para escolha de hospedagem e atividades </h6>
        </div>
      </Container>
    );
  }

  return(
    <>
      <Container>
        <CardContainer>
          <Cards
            cvc={cvc}
            expiry={expiryDateFormatted === 'Invalid Date' ? '' : expiryDateFormatted}
            name={name}
            number={number}
            focused={focus}
          />
        </CardContainer>
        <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
          <FormContainer id= 'card' onSubmit={finalizedOrder}>
            <Input 
              name="cc-number"
              label="Número do Cartão"
              type="text"
              maxLength="19"
              mask="9999 9999 9999 9999"
              value={number}
              onChange={e => setNumber(e.target.value)}
              onFocus={() => setFocus('number')}
              onBlur={() => setFocus('')}
              required
            />
            <Input   
              name="name"
              label="Nome"
              type="text"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setFocus('name')}
              onBlur={() => setFocus('')}
              required
            />
            <DateAndCVC>
              <DatePicker
                name="expiry"
                format="MM / yy"
                error={false}
                helperText={null}
                label="Validade"
                inputVariant="outlined"
                views={['year', 'month']}
                value={expiry || null}
                onChange={date => date && setExpiry(date)}
                onFocus={() => setFocus('expiry')}
                onBlur={() => setFocus('')}
                required
              />
              <Input
                name="cc-cvc"
                label="CVC"
                type="text"
                maxLength="4"
                mask="9999"
                value={cvc}
                onChange={e => setCVC(e.target.value)}
                onFocus={() => setFocus('cvc')}
                onBlur={() => setFocus('')}
                required
              />  
            </DateAndCVC>
          </FormContainer>
        </MuiPickersUtilsProvider>
      </Container>
      <ConfirmButton type='submit' form= 'card'> FINALIZAR PAGAMENTO </ConfirmButton>
    </>
  );
}; 

const Container = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    b {
      font-weight: bold;
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 468px;
`;

const CardContainer = styled.div`
    height: auto;
`;

const DateAndCVC = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;

`;
