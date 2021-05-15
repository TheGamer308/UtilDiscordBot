const path = require('path')
const fs = require('fs')
const discord = require('discord.js')
const bot  = new discord.Client()
const config = require('./Config.json')

bot.on('ready', async () => {
    console.log(`Bot ready as ${bot.user.username}`)

    const handler = 'commandh.js'
    const commandh = require(`./Commands/${handler}`)

    function readcmds(dir){
        const files = fs.readdirSync(path.join(__dirname,dir))
        for(const file of files){
            const Statsync = fs.lstatSync(path.join(__dirname,dir,file))
            if(Statsync.isDirectory()){
                readcmds(path.join(__dirname,file))
            }
            else{
                const options = require(path.join(__dirname,dir,file))
                commandh(bot,options)
            }
        }
    }

    readcmds('Commands')
})

bot.login(config.token)