
import { NbPasswordAuthStrategy } from '@nebular/auth';
import { environment } from '../../environments/environment';

export const authOptions = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      baseEndpoint: environment.userApiUrl,
      token: {
        key: 'access_token',
      },
      login: {
        endpoint: '/auth/signIn',
        method: 'post',
      },
      register: {
        endpoint: '/auth/signUp',
        method: 'post',
      },
      logout: {
        endpoint: '/auth/sign-out',
        method: 'post',
      },
      requestPass: {
        endpoint: '/auth/request-pass',
        method: 'post',
      },
      resetPass: {
        endpoint: '/auth/reset-pass',
        method: 'post',
      },
    }),
  ],
};