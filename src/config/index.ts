// eslint-disable-next-line no-restricted-imports
import config from 'config';
import { createCheckers } from 'ts-interface-checker';

import { AppConfig } from '../../config/types';
import AppConfigValidationShape from '../../config/types-ti';

const { AppConfig: AppConfigValidator } = createCheckers(AppConfigValidationShape);

const appConfigSerialized = config.util.toObject();

export const validateAppConfig = (): void => {
  AppConfigValidator.check(appConfigSerialized);
};

export const getConfigValue = <T extends keyof AppConfig>(key: T): AppConfig[T] => appConfigSerialized[key];
