const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const session = require('telegraf/session');
const Stage = require("telegraf/stage");
const Scene = require('telegraf/scenes/base');
const Composer = require('telegraf/composer');
const WizardScene = require('telegraf/scenes/wizard');
const Router = require('telegraf/router');
const bot = new Telegraf('953325877:AAGJFV9_kcCIZY67p1LhVvB3h4wo2trJKmc');
const { enter, leave } = Stage
const fs = require("fs");
const stage = new Stage()

var balance = 0
var threshold = 0
var currency = " UAH"
var nowFullDate = new Date()
var nowYear = nowFullDate.getFullYear()
var nowMonth = nowFullDate.getMonth()
var nowDay = nowFullDate.getDate()
var dayNumber = nowFullDate.getDay()
var dateNumeric = nowDay+nowMonth+nowYear
var incomeNames = ['Зарплата','Подработка','Сдача бутылок']
var outcomeNames = ['Жильё','Продукты','Транспорт']

const RouteFunction = new Router(({ callbackQuery }) => {
  if (!callbackQuery.data) {
    return
  }
  const parts = callbackQuery.data.split(':')
  return {
    route: parts[0],
    state: {
      amount: parseInt(parts[1], 10) || 0
    }
  }
})

const MainMessageScene = new Scene('MainMessageScene')
const FastCalcScene = new Scene('FastCalcScene')
const SettingsScene = new Scene('SettingsScene')
const FeedbackScene = new Scene('FeedbackScene')
const PlanningScene = new Scene('PlanningScene')
const DonateScene = new Scene('Donate')
const TestScene = new Scene('TestScene')
const HelpScene = new Scene('HelpScene')

/*stage.register(MainMessageScene)
stage.register(SettingsScene)
stage.register(FeedbackScene)
stage.register(PlanningScene)
stage.register(DonateScene)
stage.register(TestScene)
stage.register(HelpScene)*/

/*сообщения, которые будут отображатся в обновляемом сообщении*/

function showMessageText(id) {
  if (id == 'startMessage') {
    return `Привет! Я бот, который поможет легко следить за финансами, и поможет купить хотелки быстрее.\n\n
Практически всё моё управление будет на экране, поэтому у тебя не будет нужды запоминать команды и мучатся с пропадающими меню.\n\n
Нажми на кнопку и начнём!`

  }
  if (id == 'mainMessage') {
    return `Ваш баланс: ${balance+currency}\n
При расчётах не опускать баланс ниже чем: ${threshold}\n
Сегодня: ${nowDay}.${nowMonth}.${nowYear}\n
`
  }
  if (id == 'fastChangeBalanceMessage') {
    return `Ваш баланс: ${(balance)+(currency)}`
  }
  if (id == 'settingsMessage') {
    return `Вы в настройках. Тут можно поменять параметры бота.\n
Выбранная валюта: ${currency}\n
Нижний порог баланса (при расчётах, бот не будет опускать баланс ниже этого значения): ${threshold}\n
Категории расходов: ${outcomeNames}\n
Категории доходов: ${incomeNames}\n
`
  }
  if (id == 'feedbackMessage') {
    return `Напишите ваш отзыв! Критика, предложения, котики, я правда буду очень рад.\n\n
Пока что, вы можете отправить разработчику котиков, или пивко.\n
Выберите вариант:'
`
  }
  if (id == 'planningMessage') {
    return `Тут можно планировать расходы и доходы на будущее, и менять существующие категории.\n\n
Категории расходов: ${outcomeNames}\n
Категории доходов: ${incomeNames}\n
`
  }
  if (id == 'donateMessage') {
    return `Ты можешь поддержать создателя бота, чтобы он мог иногда кушать.\n\n
Не все кто делают ботов богатые :-(\n\n
Рука не поднимается прикручивать платёжную систему к полезной вещи.\n\n

Карта Monobank: 5375 4114 0010 8952
`
  }
  if (id == 'testMessage') {
    return `Тестовый раздел. Даже не представляю, что тут сейчас...\n\n
Баланс: ${balance}\n
Порог баланса при расчётах: ${threshold}\n
Категории расходов: ${outcomeNames}\n
Категории доходов: ${incomeNames}\n
Сегодняшняя дата: ${nowFullDate}

1-2-3-4\nИз князи в грязи, от котиков до печенек
`
  }
  if (id == 'helpMessage') {
    return `Краткая помощь

У этого бота нет огромного списка команд. Всё управление есть в самом сообщении. Если будет что то оссобенное, то здесь появится обновление.\n\nЯ хочу сделать его максимально удобным, поэтому мне важна ваша обратная связь.\n\nВы можете отправить её через соответствующий пункт меню, это поможет боту стать лучше,
выполнять те функции которые нужны пользователям, и постоянно совершенствоватся.\n
Но вот список команд, на всякий случай...

/start
/menu
/calc
/settings
/feedback
/donate
/test
/help
/startwizard
/runforest
/startagain
`
  }
  if (id == 'notDoneYetMessage') {
    return `Исторически так сложилось, что этот раздел ещё не готов.\n\n
Шаманы племени, третьи сутки танцуют у костра, и поют баллады о быстром завершении разработки.
`
  }
}

/*var startMessage = `Привет! Я бот, который поможет легко следить за финансами, и поможет купить хотелки быстрее.\n\n
Практически всё моё управление будет на экране, поэтому у тебя не будет нужды запоминать команды и мучатся с пропадающими меню.\n\n
Нажми на кнопку и начнём!`

var mainMessage = `Ваш баланс: ${balance+currency}\n
При расчётах не опускать баланс ниже чем: ${threshold}\n
Сегодня: ${nowDay}.${nowMonth}.${nowYear}\n
`

var fastChangeBalanceMessage = `Ваш баланс: ${(balance)+(currency)}`

var settingsMessage = `Вы в настройках. Тут можно поменять параметры бота.\n
Выбранная валюта: ${currency}\n
Нижний порог баланса (при расчётах, бот не будет опускать баланс ниже этого значения): ${threshold}\n
Категории расходов: ${outcomeNames}\n
Категории доходов: ${incomeNames}\n
`

var feedbackMessage = `Напишите ваш отзыв! Критика, предложения, котики, я правда буду очень рад.\n\n
Пока что, вы можете отправить разработчику котиков, или пивко.\n
Выберите вариант:'
`

var planningMessage = `Тут можно планировать расходы и доходы на будущее, и менять существующие категории.\n\n
Категории расходов: ${outcomeNames}\n
Категории доходов: ${incomeNames}\n
`

var donateMessage = `Ты можешь поддержать создателя бота, чтобы он мог иногда кушать.\n\n
Не все кто делают ботов богатые :-(\n\n
Рука не поднимается прикручивать платёжную систему к полезной вещи.\n\n

Карта Monobank: 5375 4114 0010 8952
`

var testMessage = `Тестовый раздел. Даже не представляю, что тут сейчас...\n\n
Баланс: ${balance}\n
Порог баланса при расчётах: ${threshold}\n
Категории расходов: ${outcomeNames}\n
Категории доходов: ${incomeNames}\n
Сегодняшняя дата: ${nowFullDate}

1-2-3-4\nИз князи в грязи, от котиков до печенек
`

const helpMessage = `Краткая помощь

У этого бота нет огромного списка команд. Всё управление есть в самом сообщении. Если будет что то оссобенное, то здесь появится обновление.\n\n
Я хочу сделать его максимально удобным, поэтому мне важна ваша обратная связь.\n\n
Вы можете отправить её через соответствующий пункт меню, это поможет боту стать лучше,
выполнять те функции которые нужны пользователям, и постоянно совершенствоватся.\n\n

Нажми на кнопку, чтобы скрыть это сообщение и вернутся в меню. Надеюсь, я таки смог это реализовать.....
`

const notDoneYetMessage = `Исторически так сложилось, что этот раздел ещё не готов.\n\n
Шаманы племени, третьи сутки танцуют у костра, и поют баллады о быстром завершении разработки.
`*/
/*клавиатуры*/

const startInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('Начать сразу', 'back'),
  m.callbackButton('Настроить бота', 'routeFirstStart')
], { columns: 1 }))

const mainMessageInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('Указать доходы и расходы', 'routeFastChangeBalance'),
  m.callbackButton('Настройки', 'routeSettings'),
  m.callbackButton('Обратная связь', 'routeFeedback'),
  m.callbackButton('Запланировать трату', 'routePlanning'),
  m.callbackButton('Поддержать разработчика', 'routeDonate'),
  m.callbackButton('Проверить работу', 'routeTest')
], { columns: 1 }))

const fastChangeBalanceInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('+1', 'add:1'),
  m.callbackButton('+10', 'add:10'),
  m.callbackButton('+50', 'add:50'),
  m.callbackButton('+100', 'add:100'),
  m.callbackButton('+500', 'add:500'),
  m.callbackButton('-1', 'sub:1'),
  m.callbackButton('-10', 'sub:10'),
  m.callbackButton('-50', 'sub:50'),
  m.callbackButton('-100', 'sub:100'),
  m.callbackButton('-500', 'sub:500'),
  m.callbackButton('0', 'clear'),
  m.callbackButton('Меню', 'back')
], { columns: 6 }))

const settingsInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('Изменить доходы и расходы', 'routeSettingsChangeIncomeOutcomeMenu'),
  m.callbackButton('Изменить валюту', 'routeSettingsChangeCurrency'),
  m.callbackButton('Указать размер нерасходуемых денег', 'routeChangeThreshold'),
  m.callbackButton('Меню', 'back')
], { columns: 2 }))

const planningInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('Изменить свои категории доходов', 'routeChangeIncomeNames'),
  m.callbackButton('Изменить свои категории расходов', 'routeChangeOutcomeNames'),
  m.callbackButton('Запланировать крупную покупку', 'routePlanBigOutcome'),
  m.callbackButton('Меню', 'back')
], { columns: 2 }))

const backOnlyInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('Меню', 'back')
], { columns: 1 }))


const currencyInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('USD', 'currencyButton:1'),
  m.callbackButton('EUR', 'currencyButton:2'),
  m.callbackButton('UAH', 'currencyButton:3'),
  m.callbackButton('RUB', 'currencyButton:4'),
  m.callbackButton('Назад', 'backToSettings')
], { columns: 2 }))

const thresholdInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('500', 'thresholdButton:500'),
  m.callbackButton('1000', 'thresholdButton:1000'),
  m.callbackButton('5000', 'thresholdButton:5000'),
  m.callbackButton('10000', 'thresholdButton:10000'),
  m.callbackButton('Назад', 'backToSettings')
], { columns: 2 }))

const testInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('Тестовая херь 1', 'cheatButton:1'),
  m.callbackButton('Тестовая херь 2', 'cheatButton:2'),
  m.callbackButton('Тестовая херь 3', 'cheatButton:3'),
  m.callbackButton('Тестовая херь 4', 'cheatButton:4'),
  m.callbackButton('Меню', 'back')
], { columns: 2 }))

const feedbackInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('Отправить котика', 'feedbackButton:1'),
  m.callbackButton('Отправить пивасик', 'feedbackButton:2'),
  m.callbackButton('Меню', 'back')
], { columns: 2 }))

const confirmStartInlineKeyboard = Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('Начать заново, удалить данные', 'routeStartAgain:1'),
  m.callbackButton('Начать заново, сохранить данные', 'routeStartAgain:2'),
  m.callbackButton('Меню', 'back')
], { columns: 1 }))

/*сценарии*/

function wizardStart(ctx) {
  ctx.editMessageText(`Я буду подсказывать тебе, стоит ли тратить деньги, или лучше сейчас сэкономить, чтобы потом купить себе то, что ты хочешь!\n
  Для начала, выберем удобную для тебя валюту, или напиши своё значение. Ты сможешь изменить это позже, в настройках.`, Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('USD', 'wizardFirstToSecond:1'),
  m.callbackButton('EUR', 'wizardFirstToSecond:2'),
  m.callbackButton('UAH', 'wizardFirstToSecond:3'),
  m.callbackButton('RUB', 'wizardFirstToSecond:4'),
  m.callbackButton('Сразу в меню', 'backToSettings')
], { columns: 2 })))
}

function wizardThreshold(ctx) {
  ctx.editMessageText(`Отлично, теперь выбери размер запаса на форс-мажорные ситуации? или пришли своё значение.\n
  Бот не даст твоим деньгам опустится ниже этого порога. Ты можешь позже изменить это значение в настройках.`, Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('500', 'wizardSecondToThird:500'),
  m.callbackButton('1000', 'wizardSecondToThird:1000'),
  m.callbackButton('5000', 'wizardSecondToThird:5000'),
  m.callbackButton('10000', 'wizardSecondToThird:10000'),
  m.callbackButton('Сразу в меню', 'backToSettings')
], { columns: 2 })))
}

function wizardFinal(ctx) {
  ctx.editMessageText(`Готово, теперь можешь вносить расходы и доходы!\n
  Для того чтобы увидеть меню, ты всегда можешь прислать команду /menu или написать /help для показа доступных команд. \n
  Но все доступные действия, всегда будут показаны кнопками в самом сообщении, для твоего удобства. \n
  Have a nice day!`, Extra.HTML().markup((m) => m.inlineKeyboard([
  m.callbackButton('Меню', 'back')
], { columns: 1 })))
}

RouteFunction.on('wizardFirstToSecond', (ctx) => {
  if (ctx.state.amount == '1' ) {
    currency = ' USD'
    wizardThreshold(ctx)
  }
  if (ctx.state.amount == '2' ) {
    currency = ' EUR'
    wizardThreshold(ctx)
  }
  if (ctx.state.amount == '3' ) {
    currency = ' UAH'
    wizardThreshold(ctx)
  }
  if (ctx.state.amount == '4' ) {
    currency = ' RUB'
    wizardThreshold(ctx)
  }
})

RouteFunction.on('wizardSecondToThird', (ctx) => {
  threshold = ctx.state.amount
  wizardFinal(ctx)
})


/*перенаправления с кнопок*/

RouteFunction.on('routeFirstStart', (ctx) => {
  wizardStart(ctx)
})

RouteFunction.on('routeStartAgain', (ctx) => {
  if (ctx.state.amount = '1') {
    balance = 666;
    threshold = 0;
    currency = " UAH";
    nowFullDate = new Date()
    nowYear = nowFullDate.getFullYear()
    nowMonth = nowFullDate.getMonth()
    nowDay = nowFullDate.getDate()
    dayNumber = nowFullDate.getDay()
    ctx.editMessageText(ctx, startMessage, startInlineKeyboard)
  }
  if (ctx.state.amount = '2') {
    ctx.editMessageText(ctx, startMessage, startInlineKeyboard)
  }
  return
})

RouteFunction.on('add', (ctx) => {
  balance = balance + ctx.state.amount
  ctx.editMessageText('Ваш баланс: '+(balance)+(currency), fastChangeBalanceInlineKeyboard)
})

RouteFunction.on('sub', (ctx) => {
  balance = balance - ctx.state.amount
  ctx.editMessageText('Ваш баланс: '+(balance)+(currency), fastChangeBalanceInlineKeyboard)
})

RouteFunction.on('clear', (ctx) => {
  balance = 0;
  ctx.editMessageText('Ваш баланс: '+(balance)+(currency), fastChangeBalanceInlineKeyboard)
})

RouteFunction.on('routeFastChangeBalance', (ctx) => {
  ctx.editMessageText(showMessageText('fastChangeBalanceMessage'), fastChangeBalanceInlineKeyboard)
})

RouteFunction.on('routeSettings', (ctx) => {
  ctx.editMessageText(showMessageText('settingsMessage'), settingsInlineKeyboard)
})

RouteFunction.on('routeFeedback', (ctx) => {
  ctx.editMessageText(showMessageText('feedbackMessage'), feedbackInlineKeyboard)
})

RouteFunction.on('routePlanning', (ctx) => {
  ctx.editMessageText(showMessageText('notDoneYetMessage'), backOnlyInlineKeyboard)
})

RouteFunction.on('routeChangeIncomeNames', (ctx) => {
  ctx.editMessageText(showMessageText('notDoneYetMessage'), backOnlyInlineKeyboard)
})

RouteFunction.on('routeChangeOutcomeNames', (ctx) => {
  ctx.editMessageText(showMessageText('notDoneYetMessage'), backOnlyInlineKeyboard)
})

RouteFunction.on('routePlanBigOutcome', (ctx) => {
  ctx.editMessageText(showMessageText('notDoneYetMessage'), backOnlyInlineKeyboard)
})

RouteFunction.on('routeSettingsChangeIncomeOutcomeMenu', (ctx) => {
  ctx.editMessageText(showMessageText('notDoneYetMessage'), settingsInlineKeyboard)
})

RouteFunction.on('routeSettingsChangeCurrency', (ctx) => {
  ctx.editMessageText('Выберите валюту', currencyInlineKeyboard)
})

RouteFunction.on('routeChangeThreshold', (ctx) => {
  ctx.editMessageText('Выбери размер депозита', thresholdInlineKeyboard)
})

RouteFunction.on('cheatButton', (ctx) => {
  if (ctx.state.amount == '1' ) {
    balance = 1000000
    ctx.editMessageText(showMessageText('testMessage') +'\nГотово, ты богач', testInlineKeyboard)
  }
  if (ctx.state.amount == '2' ) {
    balance = -100000
    ctx.editMessageText(showMessageText('testMessage')+'\nГотово, ты ссаная нищенка.', testInlineKeyboard)
  }
  if (ctx.state.amount == '3' ) {
    currency = ' котиков'
    ctx.editMessageText(showMessageText('testMessage')+'\nГотово, ты кошатник.', testInlineKeyboard)
  }
  if (ctx.state.amount == '4' ) {
    currency = ' печенек'
    ctx.editMessageText(showMessageText('testMessage')+'\nГотово, ты обжора.', testInlineKeyboard)
  }
})

RouteFunction.on('back', (ctx) => {
  ctx.editMessageText(showMessageText('mainMessage'), mainMessageInlineKeyboard)
})

RouteFunction.on('backToSettings', (ctx) => {
  ctx.editMessageText(showMessageText('settingsMessage'), settingsInlineKeyboard)
})

RouteFunction.on('currencyButton', (ctx) => {
  if (ctx.state.amount == '1' ) {
    currency = ' USD'
    ctx.editMessageText('Валюта успешно изменена на '+currency, settingsInlineKeyboard)
  }
  if (ctx.state.amount == '2' ) {
    currency = ' EUR'
    ctx.editMessageText('Валюта успешно изменена на '+currency, settingsInlineKeyboard)
  }
  if (ctx.state.amount == '3' ) {
    currency = ' UAH'
    ctx.editMessageText('Валюта успешно изменена на '+currency, settingsInlineKeyboard)
  }
  if (ctx.state.amount == '4' ) {
    currency = ' RUB'
    ctx.editMessageText('Валюта успешно изменена на '+currency, settingsInlineKeyboard)
  }
})

RouteFunction.on('thresholdButton', (ctx) => {
  threshold = ctx.state.amount
  ctx.editMessageText(showMessageText('settingsMessage'), settingsInlineKeyboard)
})

RouteFunction.on('feedbackButton', (ctx) => {
  if (ctx.state.amount == '1') {
    ctx.editMessageText('Котик отправлен', feedbackInlineKeyboard)
  }
  if (ctx.state.amount == '2') {
    ctx.editMessageText('Пивко отправлено', feedbackInlineKeyboard)
  }
})

RouteFunction.on('routeDonate', (ctx) => {
  ctx.editMessageText(showMessageText('donateMessage'), backOnlyInlineKeyboard)
})

RouteFunction.on('routeTest', (ctx) => {
  ctx.editMessageText(showMessageText('testMessage'), testInlineKeyboard)
})

/*действия при переходе в сцены*/

/*функции и тд*/

function RandomNumber(first, last) {
  return Math.random() * (first - last) + last;
}

function randomWord(lengthOfWord) {
  var alphabet = "qwertyuiopasdfghjklzxcvbnm"
  var randomWord = []
  for (var j = 0; j < lengthOfWord; j++) {
    randomWord.push(alphabet.charAt(RandomNumber(0, 26)))
  }
  return randomWord.join()
}

function randomDate(year) {
  var randomDate = RandomNumber(1,28)
  var randomMonth = RandomNumber(1, 12)
  var arr = []
  arr.push(randomDate)
  arr.push(randomMonth)
  arr.push(year)
  return arr.join('.')
}

function updateMessage(ctx, whatMessage, kb) {
  console.log('ctx', ctx)
  return ctx.editMessageText(whatMessage, kb)
}

function NewMessage(ctx, whatMessage, kb) {
    return ctx.reply(whatMessage, kb)
}

function writeOnFile(filepath, dataToWrite) {
  fs.appendFile(filepath, dataToWrite, function(error) {
      if(error) throw error; // если возникла ошибка
      writeCounter++
      console.log("Запись файла завершена. Содержимое файла:");
  });
}


/*общие команды, работают везде. По идее...*/

bot.on('sticker', (ctx) => ctx.reply('Нет, спасибо, стикеры мне ни к чему, я же бот'))

bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))

bot.command('start', (ctx) => {ctx.reply(showMessageText('startMessage'), startInlineKeyboard)})
bot.command('menu', (ctx) => {ctx.reply(showMessageText('mainMessage'), mainMessageInlineKeyboard)})
bot.command('calc', (ctx) => {ctx.reply(showMessageText('fastChangeBalanceMessage'), fastChangeBalanceInlineKeyboard)})
bot.command('settings', (ctx) => {ctx.reply(showMessageText('settingsMessage'), settingsInlineKeyboard)})
bot.command('feedback', (ctx) => {ctx.reply(showMessageText('feedbackMessage'), feedbackInlineKeyboard)})
bot.command('donate', (ctx) => {ctx.reply(showMessageText('donate'), backOnlyInlineKeyboard)})
bot.command('test', (ctx) => {ctx.reply(showMessageText('testMessage'), testInlineKeyboard)})
bot.command('help', (ctx) => {ctx.reply(showMessageText('helpMessage'), backOnlyInlineKeyboard)})
bot.command('startwizard', (ctx) => {wizardStart()})
bot.command('runforest', (ctx) => {NewMessage(ctx, showMessageText('startMessage'), returnMessageType(keyboard))})
bot.command('startagain', (ctx) => {
  if (balance > 0) {
    ctx.editMessageText(ctx, `Судя по всему, вы уже проходили знакомство с ботом.\n
      Для показа команд, введите /help\n\n
      Чтобы пройти знакомство и настроить бота заново, нажмите на кнопку.`, confirmStartInlineKeyboard)
  } else {
    ctx.editMessageText(ctx, showMessageText('startMessage'), startInlineKeyboard)
  }
})

bot.on('callback_query', RouteFunction)
/*bot.on('text', (ctx) => {
  msgInfo = ctx.message
  user_text = ctx.message.text
})*/
bot.use(stage.middleware())
bot.use(session())
/*bot.startPolling();*/
bot.launch()

/*ctx.telegram.editMessageText(
    msgInfo.chat.id,
    msgInfo.message_id,
    msgInfo.message_id,
    `PLEASE`,
  )*/