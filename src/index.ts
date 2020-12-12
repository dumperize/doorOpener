import { Telegraf } from 'telegraf';

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
      await ctx.reply('Хм, не могу тут с вами работать, сорян. Могу только в одной группе');
      return;
    }

    if (OpenDoorKeyWordMatcher.isOpenDoorMessage(ctx.message?.text || '')) {
      await ctx.reply('Ок, секунду, уже открываю 🚶🏾');
      const result = await WilLockService.openTheDoor();
      if (result === true) {
        await ctx.reply('Готово 👌 добро пожаловать в самый уютный офис 🤟 ');
        return;
      }
      await ctx.reply('Хм, что-то у меня не получилось ничего 😔 попросите меня еще раз или кого-то другого');
    }
  });

  await bot.launch();
  logger.info('bot successfully launched');
}

startApp();
