import { Telegraf } from 'telegraf';

import { Answer } from './answer';
import { getConfigValue, validateAppConfig } from './config';
import { OpenDoorKeyWordMatcher } from './services/OpenDoorKeyWordMatcher';
import { WilLockService } from './services/WiLockService';
import { logger } from './utils/logger';

async function startApp() {
  await validateAppConfig();

  const botToken = getConfigValue('botToken');
  const bot = new Telegraf(botToken);

  bot.on('message', async (ctx) => {
    const chatInfo = await ctx.getChat();

    const allowedGroupId = getConfigValue('allowedGroupId');
    if (allowedGroupId !== chatInfo.id) {
      await ctx.reply(Answer.RESTRICTION);
      return;
    }

    if (OpenDoorKeyWordMatcher.isOpenDoorMessage(ctx.message?.text || '')) {
      await ctx.reply(Answer.PENDING);
      const result = await WilLockService.openTheDoor();
      if (result === true) {
        await ctx.reply(Answer.FULFILLED);
        return;
      }
      await ctx.reply(Answer.REJECTION);
    }
  });

  await bot.launch();
  logger.info('bot telegram successfully launched');
}

startApp();
