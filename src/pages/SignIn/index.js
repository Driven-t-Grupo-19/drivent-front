import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label, LoginWithGit } from '../../components/Auth';
import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';
import useSignIn from '../../hooks/api/useSignIn';
import qs from 'query-string';
import { useEffect } from 'react';
import axios from 'axios';
import GithubButton from '../../components/GithubButton';
import styled from 'styled-components';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  
  useEffect(() => {
    const { code } = qs.parseUrl(window.location.href).query;

    if (code) {
      oAuthLogin();
    }

    async function oAuthLogin() {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/oauth/login`, {
          code
        });
        const userData = response.data;
        console.log(userData);
        setUserData(userData);
        navigate('/dashboard');
      } catch (err) {
        console.log('err', err);
        toast(`${err.response.data.message}`);
      }
    }
  }, []);

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      console.log(userData);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast(`${err.response.data.message}`);
    }
  } 

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
        <LoginWithGit>Ou entre com o Github</LoginWithGit>
        <GithubButton height='4vh' width='100%'></GithubButton>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}

