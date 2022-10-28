/* eslint-disable */
import styled from 'styled-components';
import { FaUser, FaRegUser } from 'react-icons/fa';
import { getHotelRooms, bookRoom, checkUserPurchase } from '../../../services/roomApi';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Hotel() {
  const [displayRooms, setDisplayRooms] = useState(false);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [purchaseInfo, setPurchaseInfo] = useState([]);
  const [roomId, setRoomId] = useState();
  const [controlRender, setControlRender] = useState(0);
  const modality = JSON.parse(localStorage.getItem('modality'));
  const payment = localStorage.getItem('payment');
  const { token } = JSON.parse(localStorage.getItem('userData'));

  useEffect(async ()=>{
    const data = await checkUserPurchase(token);
    setPurchaseInfo(data);
    console.log(purchaseInfo);
  },[controlRender])

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

  function renderIcons(room) {
    let icons = [];
    let emptyIcons = [];

    if(room.type === 'SINGLE') {
      if(room.slots === 1){
        emptyIcons = [1];
      }else{
        icons = [1];
      }
    };

    if(room.type === 'DOUBLE') {
      if(room.slots === 2){
        emptyIcons = [1,2]
      }
      if(room.slots === 1){
        emptyIcons = [1];
        icons = [1];
      }
      if(room.slots === 0){
        icons = [1,2]
      }
    };

    if(room.type === 'TRIPLE') {
      if(room.slots === 3){
        emptyIcons = [1, 2, 3]
      }
      if(room.slots === 2){
        emptyIcons = [1, 2];
        icons = [1];
      }
      if(room.slots === 1){
        emptyIcons = [1];
        icons = [1, 2]
      }
      if(room.slots === 0){
        icons = [1, 2, 3]
      }
    };

    const myIcons = icons.map((icon, index) => <FaUser key={index} size={20} color={room.slots === 0 ? '#8C8C8C' : '#000000'} />);
    const myEmptyIcons = emptyIcons.map((icon, index) => <FaRegUser key={index} size={20} color={room.slots === 0 ? '#8C8C8C' : '#000000'} />);

    if(selectedRoom[room.id]){
      myEmptyIcons[myEmptyIcons.length-1] = <FaUser size={20} color={'#FF4791'} />;
    };

    const result = [...myIcons, ...myEmptyIcons];

    return(
      result
    );
    
  };

  async function selectHotel(token, id) {
    setDisplayRooms(true);
    const rooms = await getHotelRooms(token, id);
    setHotelRooms(rooms);
    const hashtable = {}
    for(let i = 0; i < rooms.length; i++){
      hashtable[rooms[i].id] = false
    };
    setSelectedRoom({...hashtable})
  };

  function renderRooms(hotelRooms) {
    return(
      hotelRooms.map((room, index) => 
        <Room 
          onClick={() => {
            const hashtable = selectedRoom;
            for(let i = 0; i < hotelRooms.length; i++){
              hashtable[hotelRooms[i].id] = false
            };
            hashtable[room.id] = true;
            setSelectedRoom(hashtable);
            setRoomId(room.id);
            setControlRender(controlRender+1);
          }} 
          key={index} 
          selectedRoom={selectedRoom[room.id]} 
          slots={room.slots} 
        >
          <h4>{room.number}</h4>
          <div className='icons'>
            {renderIcons(room)}
          </div>
        </Room>)   
    );
  };

  return (
    <Container displayRooms={displayRooms} controlRender={controlRender} >
      <h1>Escolha de hotel e quarto</h1>
      {
        purchaseInfo.length > 0 ?
        <>
         <h6>Você já escolheu seu quarto:</h6>
         <MyRoom>
            <img src={purchaseInfo[0].Hotel.hotelPicture} alt="" srcset="" />
            <h1>{purchaseInfo[0].Hotel.name}</h1>
            <h2>Quarto reservado</h2>
            <h3>{purchaseInfo[0].number + ' (' + purchaseInfo[0].type + ')'}</h3>
            <h2>Pessoas no seu quarto</h2>
            <h3>
              Você
              {
                purchaseInfo[0].slots === 0 && purchaseInfo[0].type === 'TRIPLE' ? ' e mais 2' 
                : purchaseInfo[0].slots === 1 && purchaseInfo[0].type === 'TRIPLE' ? ' e mais 1'
                : purchaseInfo[0].slots === 2 && purchaseInfo[0].type === 'TRIPLE' ? ' somente' 
                : purchaseInfo[0].slots === 1 && purchaseInfo[0].type === 'DOUBLE' ? ' somente'
                : purchaseInfo[0].slots === 0 && purchaseInfo[0].type === 'DOUBLE' ? ' e mais 1'
                : purchaseInfo[0].slots === 0 && purchaseInfo[0].type === 'SINGLE' ? ' somente' : ''
              }
            </h3>
         </MyRoom>
        </>   
        :
        <>
        <div className='hoteis'>
          <div onClick={() => selectHotel(token, 1)}>1</div>
          <div onClick={() => selectHotel(token, 2)}>2</div>
          <div onClick={() => selectHotel(token, 3)}>3</div>
        </div>
        <h5>Ótima pedida! agora escolha seu quarto:</h5>
        <RoomContainer displayRooms={displayRooms}>
          {
            hotelRooms.length > 0 ? renderRooms(hotelRooms) : ''
          }
        </RoomContainer>
        <button onClick={async () => {
            await bookRoom(token, roomId);
          }}>RESERVAR QUARTO
        </button>
        </>
      }
    </Container>
  );
}

const Container = styled.div`

  h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
  }

  h5,h6{
    display: ${props => props.displayRooms ? 'flex' : 'none' };
    color: #8E8E8E;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  h6{
    display: flex;
  }


  button{
    display: ${props => props.controlRender > 0 ? 'flex' : 'none' };
    justify-content: center;
    align-items: center;
    height: 36px;
    background-color: #E0E0E0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    &:hover{
      cursor: pointer;
    }
  }

  .hoteis{
    display: flex;
    justify-content: space-around;
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

const RoomContainer = styled.div`
  display: ${props => props.displayRooms ? 'flex' : 'none' };
  flex-wrap: wrap;
  overflow-y: scroll;
  width: 100%;
  height: 26vh;
`;

const Room = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 190px;
  height: 44px;
  border: 1px solid #CECECE;
  border-radius: 10px;
  margin-right: 16px;
  margin-bottom: 8px;
  padding: 12px;
  background-color: ${
    props => props.slots === 0 ? '#CECECE' 
    : props.selectedRoom ? '#FFEED2' : '#ffffff'
  };

  h4{
    color: ${props => props.slots === 0 ? '#9D9D9D' : '#454545'};
  }

  .icons{
    display: flex;
    width: 70px;
    justify-content: flex-end;
  }

  &:hover{
    cursor: pointer;
  }
`;

const MyRoom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 196px;
  height: 264px;
  background: #FFEED2;
  border-radius: 10px;
  padding: 12px;

  img{
    width: 168px;
    height: 110px;
    object-fit: cover;
  }

  h1{
    width: 100%;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    color: #343434;

    margin: 10px 0;

    text-align: start;
  }

  h2{
    width: 100%;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;

    color: #3C3C3C;

    text-align: start;
  }

  h3{
    width: 100%;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    color: #3C3C3C;

    margin-bottom: 14px;

    text-align: start;
  }
`
