const Telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const data = require('./data')
const text = require('./text')
const functions = require('./functions')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const publish = require('./publishScene')
const stage = new Stage()
const bot = new Telegraf(data.token)
const { telegram } = bot

stage.register(publish)
bot.use(session())
bot.use(stage.middleware())

// mongo.connect(data.mongoLink, { useUnifiedTopology: true }, (err, client) => {
//   if (err) {
//     return functions.sendError(err)
//   }

//   bot.context.db = client.db('chatAdmin')
//   bot.startPolling()
// })

bot.on('text', (ctx) => {
  ctx.session.counter = ctx.session.counter || 0
  ctx.session.counter++
  return ctx.reply(`Message counter:${ctx.session.counter}`)
})

bot.on('audio', (ctx) => {
  ctx.session.counter = ctx.session.counter || 0
  ctx.session.counter++
  return ctx.reply(`Audio counter:${ctx.session.counter}`)
})

bot.on('document', (ctx) => {
  ctx.session.counter = ctx.session.counter || 0
  ctx.session.counter++
  return ctx.reply(`Document counter:${ctx.session.counter}`)
})

bot.hears('audio', async (ctx) => {
  console.log('audio', { ctx })
})

bot.hears('document', async (ctx) => {
  console.log('document', { ctx })
})

bot.hears('text', async (ctx) => {
  console.log('text', { ctx })
})

bot.launch()
