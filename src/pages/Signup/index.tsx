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

import { Container, Content, Background, AnimationContainer } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { getValidationErrors } from '../../utils/validation';
import schema from '../../validations/SingUpSchema';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      formRef.current?.setErrors({});
    } catch (err) {
      formRef.current?.setErrors(getValidationErrors(err));
    }
  }, []);

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
              placeholder="E- mail"
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
