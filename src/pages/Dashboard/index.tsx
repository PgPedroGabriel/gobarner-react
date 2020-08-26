import React from 'react';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
} from './styles';
import { FiPower } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Logo" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars1.githubusercontent.com/u/5057307?s=400&u=cd7d26d2d856a1f6dc01e1d6c88aa773ed1a7ae5&v=4"
                alt="Diego Fernandes"
              />
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar></Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
