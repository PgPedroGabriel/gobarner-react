import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

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

import schema from '../../validations/ResetPasswordSchema';

interface SignFormData {
  email: string;
  password: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const { resetPassword } = useAuth();
  const { token } = useParams();

  const handleSubmit = useCallback(
    async (data: SignFormData) => {
      try {
        await schema.validate(data, {
          abortEarly: false,
        });
        formRef.current?.setErrors({});

        await resetPassword(data.password, token);
      } catch (err) {
        if (err instanceof ValidationError) {
          return formRef.current?.setErrors(getValidationErrors(err));
        }
        addToast({
          type: 'error',
          title: 'Erro ao enviar nova senha',
          description: 'Erro desconhecido',
        });
      }
    },
    [addToast, resetPassword, token],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Informe sua nova senha</h1>
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
              placeholder="Confirmação de senha"
            />
            <Button type="submit">Enviar</Button>

            <Link to="/login">Voltar para Login</Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
