import React, { useCallback, useRef } from 'react';
import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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

import schema from '../../validations/RecoveryPasswordSchema';

interface SignFormData {
  email: string;
  password: string;
}

const RecoveryPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const { recovery } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignFormData) => {
      try {
        await schema.validate(data, {
          abortEarly: false,
        });
        formRef.current?.setErrors({});
        await recovery(data.email);
      } catch (err) {
        if (err instanceof ValidationError) {
          return formRef.current?.setErrors(getValidationErrors(err));
        }

        addToast({
          type: 'error',
          title: 'Erro ao enviar recuperar senha',
          description: 'Erro desconhecido',
        });
      }
    },
    [addToast, recovery],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Informe o e-mail de seu login</h1>
            <Input name="email" icon={FiMail} placeholder="E- mail" />
            <Button type="submit">Enviar</Button>

            <Link to="/login">Voltar para Login</Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default RecoveryPassword;
