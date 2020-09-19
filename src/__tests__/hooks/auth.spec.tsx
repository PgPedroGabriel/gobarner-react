import { act, renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/AuthContext';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('auth hook', () => {
  it('should be able to signin', async () => {
    apiMock.onPost('sessions').reply(200, {
      user: { id: 123, email: 'teste@teste', name: 'pedro' },
      token: '123123',
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'teste@teste',
      password: '123456',
    });

    await waitForNextUpdate();
    expect(setItemSpy).toHaveBeenCalledWith('@Gobarber:token', '123123');
    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify({ id: 123, email: 'teste@teste', name: 'pedro' }),
    );
    expect(result.current.user.email).toEqual('teste@teste');
  });

  it('should restore saved date from storage on init state', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    getItemSpy.mockImplementation(key => {
      switch (key) {
        case '@Gobarber:token':
          return '123123';
        case '@Gobarber:user':
          return JSON.stringify({
            id: 123,
            email: 'teste@teste',
            name: 'pedro',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('teste@teste');
    expect(result.current.user.id).toEqual(123);
    expect(result.current.user.name).toEqual('pedro');
  });

  it('should be able to signout', async () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.user).toBeUndefined();
    expect(removeItemSpy).toBeCalled();
  });
});
