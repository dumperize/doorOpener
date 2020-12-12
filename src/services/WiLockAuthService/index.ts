import axios from 'axios';

import { getConfigValue } from '../../config';

export const WilLockAuthService = (() => {
  let token: string;
  let expiresAt: number;

  return {
    getToken: async () => {
      if (token && expiresAt && Date.now() < expiresAt) {
        return token;
      }

      const loginParams = {
        login: getConfigValue('wiLockLogin'),
        pass: getConfigValue('wiLockPass'),
        applicationId: getConfigValue('wiLockApplicationId'),
      };

      const requestBody = { username: loginParams.login, password: loginParams.pass, lang: 'en' };

      const response = await axios.post('https://api.gizwits.com/app/login', requestBody, {
        headers: {
          'x-gizwits-application-id': loginParams.applicationId,
          'content-type': 'application/json',
        },
      });

      token = response.data.token;
      expiresAt = response.data.expire_at;

      return token;
    },
  };
})();
