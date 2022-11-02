/* eslint-disable */
import styled from 'styled-components';
import { IoExitOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { useState } from 'react';

export default function Section({sectionName, selectDay}) {
    const [activities, setActivities] = useState([]);

    function renderActivities() {
        return(
            activities.map((activity, index) =>
            <Activity key={index} activityTime={1} spots={activity.spots}>
                <div className="info">
                    <h3>Minecraft montando o pc ideal</h3>
                    <h4>09:00 - 10:00</h4>
                </div>
                <div className="bar"></div>
                <div className="spots">
                    {
                        activity.spots > 0 ?
                        <>
                            <IoExitOutline color='#078632' />
                            <h5>{activity.spots + ' vagas'}</h5>
                        </>
                            
                            :
                        <>
                            <IoCloseCircleOutline color='#CC6666' />
                            <h5>Esgotado</h5>
                        </>
                    }
                    
                </div>
            </Activity> 
            )
        )
    }

    return(
        <Container selectDay={selectDay}>
            <Element>
                <h2>{sectionName}</h2>
                <div className="content">
                    <Activity activityTime={1} spots={1}>
                        <div className="info">
                            <h3>Minecraft montando o pc ideal</h3>
                            <h4>09:00 - 10:00</h4>
                        </div>
                        <div className="bar"></div>
                        <div className="spots">
                            <IoExitOutline color='#078632' />
                            <h5>27 vagas</h5>
                        </div>
                    </Activity>
                    <Activity activityTime={2} spots={1}>
                        <div className="info">
                            <h3>Minecraft montando o pc ideal</h3>
                            <h4>09:00 - 10:00</h4>
                        </div>
                        <div className="bar"></div>
                        <div className="spots">
                            <IoExitOutline color='#078632' />
                            <h5>27 vagas</h5>
                        </div>
                    </Activity>
                    <Activity activityTime={1.5} spots={0}>
                        <div className="info">
                            <h3>Minecraft montando o pc ideal</h3>
                            <h4>09:00 - 10:00</h4>
                        </div>
                        <div className="bar"></div>
                        <div className="spots">
                            <IoCloseCircleOutline color='#CC6666' />
                            <h5>Esgotado</h5>
                        </div>
                    </Activity>
                    <Activity activityTime={1.5} spots={0}>
                        <div className="info">
                            <h3>Minecraft montando o pc ideal</h3>
                            <h4>09:00 - 10:00</h4>
                        </div>
                        <div className="bar"></div>
                        <div className="spots">
                            <IoCloseCircleOutline color='#CC6666' />
                            <h5>Esgotado</h5>
                        </div>
                    </Activity>
                    <Activity activityTime={1.5} spots={0}>
                        <div className="info">
                            <h3>Minecraft montando o pc ideal</h3>
                            <h4>09:00 - 10:00</h4>
                        </div>
                        <div className="bar"></div>
                        <div className="spots">
                            <IoCloseCircleOutline color='#CC6666' />
                            <h5>Esgotado</h5>
                        </div>
                    </Activity>
                    <Activity activityTime={3} spots={0}>
                        <div className="info">
                            <h3>Minecraft montando o pc ideal</h3>
                            <h4>09:00 - 10:00</h4>
                        </div>
                        <div className="bar"></div>
                        <div className="spots">
                            <IoCloseCircleOutline color='#CC6666' />
                            <h5>Esgotado</h5>
                        </div>
                    </Activity>
                </div>
            </Element>
        </Container>
    )
};

const Container = styled.div`
    display: ${props => props.selectDay > 0 ? 'flex' : 'none'};
    height: 392px;
`;

const Element = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 288px;

    h2{
        display: flex !important;
    }

    .content{
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        border: 1px solid #D7D7D7;
        padding: 10px;
    
        -ms-overflow-style: none;
        scrollbar-width: none; 
        overflow-y: scroll; 
    }

    .content::-webkit-scrollbar {
        display: none;
    }
`

const Activity = styled.div`
    display: flex;
    width: 100%;
    min-height: ${props => props.activityTime > 0 ? `calc(80px * ${props.activityTime})` : ''};
    background: #F1F1F1;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 12px;

    .info{
        h3{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 700;
            font-size: 12px;
            line-height: 14px;
            color: #343434;
        }

        h4{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            color: #343434;
            margin-top: 6px;
        }
    }

    .bar{
        border: 1px solid #CFCFCF;
        margin-left: 8%;
        margin-right: 8%;
    }

    .spots{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        h5{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 9px;
            line-height: 11px;
            color: ${props => props.spots > 0 ? '#078632' : '#CC6666'};
            margin-top: 4px;
        }
    }
`
