import Discord from 'discord.js';

import { Answer } from './answer';
import { getConfigValue, validateAppConfig } from './config';
import { OpenDoorKeyWordMatcher } from './services/OpenDoorKeyWordMatcher';
import { WilLockService } from './services/WiLockService';
import { logger } from './utils/logger';

async function startApp() {
  await validateAppConfig();

  const botToken = getConfigValue('discordBotToken');
  const bot = new Discord.Client();

  bot.on('message', async (message) => {
    const botId = getConfigValue('discordBotId');
    if (message.author.id === botId) {
      return;
    }

    const chatInfo = message.channel;
    const allowedGroupId = getConfigValue('discordAllowedGroupId');
    if (allowedGroupId !== chatInfo.id) {
      await message.channel.send(Answer.RESTRICTION);
      return;
    }

    if (OpenDoorKeyWordMatcher.isOpenDoorMessage(message.content || '')) {
      await message.channel.send(Answer.PENDING);
      const result = await WilLockService.openTheDoor();
      if (result === true) {
        await message.channel.send(Answer.FULFILLED);
        return;
      }
      await message.channel.send(Answer.REJECTION);
    }
  });

  bot.login(botToken);
  logger.info('bot discord successfully launched');
}

startApp();
