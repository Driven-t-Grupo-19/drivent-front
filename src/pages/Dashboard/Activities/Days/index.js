/* eslint-disable */
import { useState } from 'react';
import styled from 'styled-components';

export default function Days({selectDay, setSelectDay, getActivities, setSections}) {
    const [days, setDays] = useState([]);

    const { token } = JSON.parse(localStorage.getItem('userData'));

    function renderDays(days) {
        return(
            days.map((day, index) => 
            <Dia
                key={index}
                id={day.id} 
                selectDay={selectDay} 
                onClick={() => setSelectDay(day.id)} 
            >
                <h3>Sexta, 22/10</h3>
            </Dia>
            )
        );
    };

    return(
        <Container>
            <Dia 
                id={1}
                selectDay={selectDay} 
                onClick={async () => {
                    setSelectDay(1);
                    setSections(await getActivities(token));
                }} 
            >
                <h3>Sexta, 22/10</h3>
            </Dia>
            <Dia 
                id={2}
                selectDay={selectDay} 
                onClick={async () => {
                    setSelectDay(2);
                    setSections(await getActivities(token));
                }} 
            >
                <h3>Sábado, 23/10</h3>
            </Dia>
            <Dia 
                id={3}
                selectDay={selectDay} 
                onClick={async () => {
                    setSelectDay(3);
                    setSections(await getActivities(token));
                }} 
            >
                <h3>Domingo, 24/10</h3>
            </Dia>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height:60px;
    overflow-y: scroll;
    margin-bottom: 20px;
`;

const Dia = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 132px;
    height: 38px;
    background: ${props => props.id === props.selectDay ? '#FFD37D' : '#E0E0E0'};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    margin-right: 18px;
    margin-bottom: 14px;

    &:hover{
        cursor: pointer;
    }

    h3{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        color: #000000;
    }
`
