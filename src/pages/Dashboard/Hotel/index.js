import { useState } from 'react';
import styled from 'styled-components';
import useHotel from '../../../hooks/api/useHotel';

export default function Hotel() {
  const modality = JSON.parse(localStorage.getItem('modality'));
  const payment = localStorage.getItem('payment');
  const [selectedHotel, setSelectedHotel] = useState();
  const { hotels } = useHotel();

  // if(!modality || !payment) { 
  //   return (
  //     <MessageContainer> <p>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</p></MessageContainer>
  //   ); 
  // }

  if (!modality.accommodation) {
    return (
      <MessageContainer> <p>Sua modalidade de ingresso não inclui hospedagem </p>
        <p>Prossiga para a escolha de atividades</p></MessageContainer>
    );
  }

  function getHotelCard(hotel) {
    return (
      <HotelCard width={'200px'} height={'270px'}
        onClick={() => selectHotel(hotel.id, hotel.Accommodations)}
        clicked={selectedHotel === hotel.id}>
        <img src={hotel.hotelPicture} alt="" style={{ height: '109px', width: '170px', borderRadius: '5px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <h4>{hotel.name}</h4>
          <h6>Tipos de acomodação:</h6>
          <h5>{getAccommodationsType(hotel.Accommodations)}</h5>
          <h6>Vagas disponíveis:</h6>
          <h5>{getAvailableAccommodations(hotel.Accommodations)}</h5>
        </div>
      </HotelCard>
    );
  }

  function getAccommodationsType(accommodations) {
    if (accommodations.length === 0) return 'Sem vagas';

    let responseString = '';

    if (testIfIncludesType(accommodations, 'SINGLE')) responseString += 'Single';
    if (testIfIncludesType(accommodations, 'DOUBLE')) responseString += 'Double';
    if (testIfIncludesType(accommodations, 'TRIPLE')) responseString += 'Triple';

    return getFinalAccommodationMessage(responseString);
  }

  function getFinalAccommodationMessage(responseString) {
    if (testOneSingleType(responseString)) return responseString;

    return testTwoTypes(responseString) ? testTwoTypes(responseString) : 'Single, Double e Triple';
  }

  function testOneSingleType(responseString) {
    return responseString === 'Single' || responseString === 'Double' || responseString === 'Triple';
  }

  function testTwoTypes(responseString) {
    if (responseString === 'DoubleTriple') return 'Double e Single';
    if (responseString === 'SingleTriple') return 'Single e Triple';
    if (responseString === 'SingleDouble') return 'Single e Double';

    return null;
  }

  function testIfIncludesType(accommodations, type) {
    for (let accommodation of accommodations) {
      if (accommodation.type === type) return true;
    }

    return false;
  }

  function getAvailableAccommodations(accommodations) {
    if (accommodations.length === 0) return 'Sem vagas';
    let saida = 0;

    for (let accommodation of accommodations) {
      saida += accommodation.slots;
    }

    return saida;
  }

  function selectHotel(id, accommodationsList) {
    setSelectedHotel(id);
  }

  return (
    <HotelContainer>
      <HeaderPage>Escolha de hotel e quarto</HeaderPage>
      <p>Primeiro, escolha seu hotel</p>

      <HotelsRow>
        {hotels === null ? '' : hotels.map(hotel => { return getHotelCard(hotel); })}
      </HotelsRow>
    </HotelContainer>
  );
}

export const HotelCard = styled.div`
    height: ${props => props.height || '145px'};
    width: ${props => props.width || '145px'};
    margin-right: ${props => props.marginright || '20px'};

    background-color: ${props => props.clicked ? '#FFFED2' : '#F1F1F1'};
    display: flex;
    flex-direction: column;

    padding: 14px 16px;
    box-sizing: border-box;

    border-radius: 20px;

    cursor: pointer;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */

    color: #454545;

    h4 {
      color: #343434;
      font-size: 20px;
      margin: 10px 0;
    }
    h5 {
      font-size: 13px;
      margin-bottom: 5px;
    }
    h6 {
      font-size: 14px;
      font-weight: bold;
    }
`;

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

const HotelsRow = styled.div`
  display: flex;
  overflow-y: scroll;
`;

const HotelContainer = styled.div`
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
    margin-bottom: 18px;
    b {
      font-weight: bold;
    }
  }
`;

export const HeaderPage = styled.h1`
    font-size: 34px;
    margin-bottom: 30px;
`;
