/* eslint-disable */
import { useState } from 'react';
import styled from 'styled-components';
import Days from './Days';
import Section from './Sections';
import { getActivities } from '../../../services/activityApi';

export default function Activities() {
  const [selectDay, setSelectDay] = useState(0);
  const [sections, setSections] = useState([]);

  
  const modality = JSON.parse(localStorage.getItem('modality'));
  const payment = localStorage.getItem('payment');

  if(!modality || !payment) { 
    return (
      <MessageContainer> <p>Você precisa ter confirmado pagamento antes
      de fazer a escolha de atividades</p></MessageContainer>
    ); 
  }

  if (modality.ticket === 'Online') {
    return (
      <MessageContainer> <p>Sua modalidade de ingresso não necessita escolher
      atividade. </p><p> Você terá acesso a todas as atividades. </p></MessageContainer>
    );
  }

  function renderSection(sections) {
    return(
      sections.map((section, index) => 
      <Section 
        key={index} 
        sectionName={section.auditorium} 
        selectDay={selectDay}
        activities={sections} 
      />
      )
    )
  }
  
  return(
    <Container selectDay={selectDay}>
      <h1>Escolha de atividades</h1>
      <h2>Primeiro, filtre pelo dia do evento:</h2>
      <Days 
        getActivities={getActivities} 
        selectDay={selectDay}
        setSections={setSections} 
        setSelectDay={setSelectDay} 
      />
      <Sections>
        {
          sections.length > 0 ? renderSection(sections) : ''
        }
      </Sections>     
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  
  h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
    margin-bottom: 36px;
  }

  h2{
    display: ${props => props.selectDay === 0 ? 'flex' : 'none'};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
    margin-bottom: 24px;
  }
`;

const Sections = styled.div`
  display: flex;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none; 
  overflow-y: scroll; 

  &::-webkit-scrollbar {
    display: none;
  }
`
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