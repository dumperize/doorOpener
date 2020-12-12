import axios from 'axios';

import { getConfigValue } from '../../config';
import { logger } from '../../utils/logger';
import { WilLockAuthService } from '../WiLockAuthService';

export const WilLockService = {
  openTheDoor: async (): Promise<boolean> => {
    const applicationId = getConfigValue('wiLockApplicationId');
    const deviceId = getConfigValue('wiLockDeviceId');
    const switchName = getConfigValue('wiLockDeviceSwitchName');
    const requestBody = {
      attrs: {
        [switchName]: true,
      },
    };

    try {
      const token = await WilLockAuthService.getToken();
      await axios.post(`https://api.gizwits.com/app/control/${deviceId}`, requestBody, {
        headers: {
          'x-gizwits-application-id': applicationId,
          'x-gizwits-user-token': token,
          'content-type': 'application/json',
        },
      });
      return true;
    } catch (e) {
      logger.info({
        scope: 'WiLockService open door',
        reason: e.message,
      });
      return false;
    }
  },
};
