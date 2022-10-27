import styled from 'styled-components';
import githubIcon from '../assets/images/icons8-github-50.png';
import qs from 'query-string';

export default function GithubButton({ height, width }) {
  function redirectToGithub() {
    console.log('enctrou');
    const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user public_repo',
      client_id: `${process.env.REACT_APP_CLIENT_ID}`,
      redirect_uri: `${process.env.REACT_APP_REDIRECT_URL}`,
      state: 'zzfgh'
    };
  
    const queryStrings = qs.stringify(params);
    const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;
    //console.log(authorizationUrl);
    window.location.href = authorizationUrl;
  }
    
  return(
    <Button onClick={redirectToGithub} height={height} width={width}>
      <img src={githubIcon}></img>
    </Button>
  );   
}

const Button = styled.button`
    height: ${props => props.height || '4vh'};
    width: ${props => props.width || '100%'}; 
    margin-bottom: 10px;

    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border-radius: 10px;

    cursor: pointer;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: white;
    text-align: center;

    img{
        width: 30px;
        height: 30px;
    }
`;
