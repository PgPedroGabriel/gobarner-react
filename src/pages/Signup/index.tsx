import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft,
  FiPhoneCall,
  FiMail,
  FiLock,
  FiUser,
} from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import logo from '../../assets/logo.svg';

import api from '../../services/api';

import { Container, Content, Background, AnimationContainer } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { getValidationErrors } from '../../utils/validation';
import schema from '../../validations/SingUpSchema';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/ToastContext';
import { ValidationError } from 'yup';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        await schema.validate(data, {
          abortEarly: false,
        });
        formRef.current?.setErrors({});

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro efetuado com sucesso!',
        });

        history.push('/login');
      } catch (err) {
        if (err instanceof ValidationError) {
          return formRef.current?.setErrors(getValidationErrors(err));
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Falha ao realizar cadastro',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" type="text" icon={FiUser} placeholder="Nome" />
            <Input
              name="email"
              type="text"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Input
              name="phone"
              icon={FiPhoneCall}
              type="text"
              placeholder="Celular"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input
              name="confirm_password"
              icon={FiLock}
              type="password"
              placeholder="Confirmação de Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/login">
            <FiArrowLeft />
            Voltar para Login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
