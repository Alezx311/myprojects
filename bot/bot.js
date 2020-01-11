const Telegraf = require('telegraf')

const keyboards = require('./botSays/keyboards')
const messages = require('./botSays/messages')
const RouteFunction = require('./routes/routeFunction')
const BOT_TOKEN = require('./config/config').bot_api

const bot = new Telegraf(BOT_TOKEN)

const user = require('./database/userModel')
const song = require('./database/songModel')
const track = require('./database/trackModel.js')

bot.start(ctx => ctx.editMessageText(messages.welcomeMessage, keyboards.welcomeKeyboard))

bot.help(ctx => ctx.editMessageText(messages.helpMessage, keyboards.helpKeyboard))

bot.on('voice', ctx => ctx.editMessageText(messages.OnVoiceMessage, keyboards.onVoiceKeyboard))

bot.command('start', ctx => ctx.reply(messages.welcomeMessage, keyboards.welcomeKeyboard))

bot.launch()



// получение через чат бота, проверить формат
// сделать функцию вывода инфо и статистики с обноляющимися динамически значениями

// + можно отправить песнюб бот вернёт анимацию клеточных автоматов по спирали в которых будут спрятаны данные о песне из интернета.
// пробить песню через IDv3 и парсерыб собрать тегиб и генерить не самуж сложную анимашку от з5

// Сделать выбор темпа и тональности и присылать свои аудиозаписи. Если в базе
// будет найдена запись с такими же параметрами, она будет показана и будет предложено их обьединить.
// таким образом можно будет находить схожих по духу музыкантов уже после того как вы сделаете запись.
// добавить базу фоновой музыки для более точного совпадения