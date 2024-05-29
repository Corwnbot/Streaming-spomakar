const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve the HTML file on the root route
app.get("/", (request, response) => {
  response.sendFile('web.html', { root: __dirname });
});

// Start the server on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

// Keep the app alive by pinging itself every 280 seconds
setInterval(() => {
  http.get(`http://Name-Project.glitch.me/`);
}, 280000);


const { Client, Disprocesscord, Discord, RichPresence } = require('discord.js-selfbot-v13');
const client = new Client({
  readyStatus: false,
  checkUpdate: false
});
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

let intervalId;
let interval;
let isEnabled = false;
let voiceConnection; 


client.once('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);
  const startDate = new Date();
  const formattedDate = startDate.toLocaleString();
  
const a1881 = new RichPresence()

.setApplicationId(`1179783460135649392`)

.setType(`PLAYING`)

.setName(`PojavLauncher`)

.setState(`Now Playing At ${formattedDate}`)

.setAssetsLargeImage('https://cdn.discordapp.com/avatars/1179783460135649392/341a716622e9b45f70f76ada1076ae9c.webp?size=2048')

client.user.setActivity(a1881)
  });
client.login(process.env.t);


const channelId = process.env.id;
const ownerId = process.env.owner;
const spam = process.env.spam;

let isBotActive = false; // Flag to control the bot's activity



client.on('messageCreate', async message => {

  if (message.author.id === ownerId) {

    if (message.content === '!start') {

      isBotActive = true;

      message.react('✅');

    } else if (message.content === '!stop') {

      isBotActive = false;

      message.react('✅');

    }
    
    if (message.content.startsWith('!on') && !isEnabled) {
    
    // Extract the channel ID from the message content
    const args = message.content.split(' ');
    const channelId = args[1];

    // Ensure a channel ID was provided
    if (!channelId) {
        return message.channel.send('Please provide a valid channel ID.');
    }

    let channel = client.channels.cache.get(channelId);

    if (!channel) {
        return message.react('🔴');
    }

    interval = setInterval(async () => {
        await channel.send("oh");
    }, 20000); // 1000 ms = 1 second

    isEnabled = true;

    message.react('✅');
} else if (message.content === "!off" && isEnabled) {

    clearInterval(interval);

    isEnabled = false;

    message.react('✅');

  }

  }

});

client.on('ready', () => {

  setInterval(async () => {

    if (isBotActive) {

      try {

        const channel = await client.channels.fetch(channelId);

        if (!voiceConnection || voiceConnection.state.status === 'destroyed') {

          voiceConnection = joinVoiceChannel({

            channelId: channel.id,

            guildId: channel.guild.id,

            adapterCreator: channel.guild.voiceAdapterCreator

          });

        }

      } catch (error) {

        // Handle the error if needed

        console.error(error);

      }

    } else if (voiceConnection && voiceConnection.state.status !== 'destroyed') {

      voiceConnection.destroy();

      voiceConnection = null;

    }

  }, 1000);

});
