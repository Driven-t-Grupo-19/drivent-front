import { useState } from 'react';
import styled from 'styled-components';

export default function Payment() {
  // verifica se a pessoa ja escolheu algum ticket e salvou no localhost.
  const [modality, setModality] = useState(
    localStorage.getItem('modality') ?
      JSON.parse(localStorage.getItem('modality'))
      :
      {}
  );

  function getPage() {
    /* eslint-disable-next-line no-console */
    console.log(modality);

    return modality ?
      <></>
      :
      <>EAI MALUCO</>;
  }

  return (
    getPage()
  );
};

const TicketContainer = styled.div`
  width: 100%;
  height: 100%;
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
