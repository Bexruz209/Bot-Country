const axios = require("axios")

const { Telegraf } = require("telegraf")

const BOT_TOKEN = "7233241037:AAHA77GCKErUyY-HcOQyKom-4F5xx4_eMpY";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply("Salom bizning Telegram BOT ga xush kelibsiz.Bizga davlat nomini kiriting va biz sizga o'sha davlat bayrog'ini ko'rsatamiz!"));

bot.on("text", async (ctx) => {
    const countyName = ctx.message.text;
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countyName}`)
        const countryData = response.data[0]

        if (countryData.flags) {
            await ctx.replyWithPhoto({ url: countryData.flags.png, filename: `${countyName}.png` });
        } else {
            await ctx.reply("Bayroq qaytarilmadi!")
        }
    } catch (err) {
        await ctx.reply("Davlat nomi xato ")
    }
})
bot.launch()
console.log("Bot ish jarayonida....");