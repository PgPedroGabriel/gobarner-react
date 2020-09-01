import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import SignUp from '../../pages/Signup';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ push: mockedHistoryPush }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/AuthContext', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/ToastContext', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const emailField = getByPlaceholderText('E-mail');
    const nameField = getByPlaceholderText('Nome');
    const passwordField = getByPlaceholderText('Senha');
    const confirmPasswordField = getByPlaceholderText('Confirmação de Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, {
      target: { value: 'Pedro Gabriel' },
    });

    fireEvent.change(emailField, {
      target: { value: 'devpedrogabriel@gmail.com' },
    });

    fireEvent.change(passwordField, {
      target: { value: '123456' },
    });

    fireEvent.change(confirmPasswordField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/login');
    });
  });

  // it('should not be able to signin with invalid credentials', async () => {
  //   const { getByPlaceholderText, getByText } = render(<SignUp />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.change(emailField, {
  //     target: { value: 'a-a-a' },
  //   });

  //   fireEvent.change(passwordField, {
  //     target: { value: '123456' },
  //   });

  //   fireEvent.click(buttonElement);

  //   await waitFor(() => {
  //     expect(mockedHistoryPush).not.toHaveBeenCalled();
  //   });
  // });

  // it('it should be displayed error login fail', async () => {
  //   mockedSignIn.mockImplementation(() => {
  //     throw new Error();
  //   });

  //   const { getByPlaceholderText, getByText } = render(<SignUp />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.change(emailField, {
  //     target: { value: 'devpedrogabriel@gmail.com' },
  //   });

  //   fireEvent.change(passwordField, {
  //     target: { value: '123456' },
  //   });

  //   fireEvent.click(buttonElement);

  //   await waitFor(() => {
  //     expect(mockedAddToast).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         type: 'error',
  //       }),
  //     );
  //   });
  // });
});
