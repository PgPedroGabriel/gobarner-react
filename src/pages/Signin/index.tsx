import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { ValidationError } from 'yup';

import logo from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { getValidationErrors } from '../../utils/validation';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

import schema from '../../validations/SingInSchema';

interface SignFormData {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignFormData) => {
      try {
        await schema.validate(data, {
          abortEarly: false,
        });
        formRef.current?.setErrors({});
        await signIn({ email: data.email, password: data.password });

        history.push('/');
      } catch (err) {
        if (err instanceof ValidationError) {
          return formRef.current?.setErrors(getValidationErrors(err));
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Falha ao realizar login, cheque as credenciais',
        });
      }
    },
    [addToast, history, signIn],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>

            <Link to="/recovery-password">Esqueci minha senha</Link>
          </Form>

          <Link to="/sign-up">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Signin;
